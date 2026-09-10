import type {
  IDataObject,
  IExecuteFunctions,
  IHookFunctions,
  ILoadOptionsFunctions,
  IWebhookFunctions,
  IHttpRequestMethods,
  IRequestOptions,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

interface IKiotVietTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface IKiotVietCredentials {
  retailer: string;
  clientId: string;
  clientSecret: string;
}

// In-memory token cache keyed by retailer + clientId
const tokenCache: Record<string, { token: string; expiresAt: number }> = {};

/**
 * Obtain or reuse a valid OAuth2 Access Token for KiotViet
 */
export async function getAccessToken(
  this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions | IWebhookFunctions,
): Promise<{ token: string; retailer: string }> {
  const credentials = (await this.getCredentials('kiotVietApi')) as unknown as IKiotVietCredentials;

  const cacheKey = `${credentials.retailer}_${credentials.clientId}`;
  const now = Math.floor(Date.now() / 1000);

  if (tokenCache[cacheKey] && tokenCache[cacheKey].expiresAt > now + 60) {
    return {
      token: tokenCache[cacheKey].token,
      retailer: credentials.retailer,
    };
  }

  const options: IRequestOptions = {
    method: 'POST',
    url: 'https://id.kiotviet.vn/connect/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `scopes=PublicApi.Access&grant_type=client_credentials&client_id=${encodeURIComponent(
      credentials.clientId,
    )}&client_secret=${encodeURIComponent(credentials.clientSecret)}`,
    json: true,
  };

  try {
    const response = (await this.helpers.request(options)) as IKiotVietTokenResponse;
    tokenCache[cacheKey] = {
      token: response.access_token,
      expiresAt: now + (response.expires_in || 86400),
    };
    return {
      token: response.access_token,
      retailer: credentials.retailer,
    };
  } catch (error) {
    throw new NodeApiError(this.getNode(), error as any, {
      message: 'Failed to authenticate with KiotViet. Please verify Client ID and Client Secret.',
    });
  }
}

/**
 * Execute an authenticated API request to KiotViet Public API
 */
export async function kiotVietApiRequest(
  this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions | IWebhookFunctions,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject | IDataObject[] = {},
  qs: IDataObject = {},
): Promise<any> {
  const { token, retailer } = await getAccessToken.call(this);

  // Clean empty query params
  const cleanQs: IDataObject = {};
  for (const key of Object.keys(qs)) {
    if (qs[key] !== undefined && qs[key] !== null && qs[key] !== '') {
      cleanQs[key] = qs[key];
    }
  }

  const options: IRequestOptions = {
    method,
    baseURL: 'https://public.kiotapi.com',
    url: endpoint.startsWith('/') ? endpoint : `/${endpoint}`,
    headers: {
      Authorization: `Bearer ${token}`,
      Retailer: retailer,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    qs: cleanQs,
    json: true,
  };

  if (['POST', 'PUT', 'PATCH'].includes(method) && Object.keys(body).length > 0) {
    options.body = body;
  }

  try {
    return await this.helpers.request(options);
  } catch (error) {
    throw new NodeApiError(this.getNode(), error as any);
  }
}

/**
 * Fetch all items across multiple pages from KiotViet
 */
export async function kiotVietApiRequestAllItems(
  this: IExecuteFunctions,
  propertyName: string,
  method: IHttpRequestMethods,
  endpoint: string,
  body: IDataObject = {},
  qs: IDataObject = {},
  limit = 0,
): Promise<any[]> {
  const returnData: any[] = [];
  const pageSize = 100;
  let currentItem = 0;

  qs.pageSize = pageSize;

  do {
    qs.currentItem = currentItem;
    const responseData = await kiotVietApiRequest.call(this, method, endpoint, body, qs);

    const items = responseData[propertyName] || responseData.data || responseData;
    if (!Array.isArray(items) || items.length === 0) {
      break;
    }

    returnData.push(...items);
    currentItem += items.length;

    if (limit > 0 && returnData.length >= limit) {
      return returnData.slice(0, limit);
    }

    const total = responseData.total || 0;
    if (total > 0 && returnData.length >= total) {
      break;
    }
  } while (true);

  return returnData;
}
