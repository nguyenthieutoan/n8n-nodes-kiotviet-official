import type {
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class KiotVietApi implements ICredentialType {
  name = 'kiotVietApi';
  displayName = 'KiotViet API';
  documentationUrl = 'https://www.kiotviet.vn';
  properties: INodeProperties[] = [
    {
      displayName: 'Retailer (Store Name)',
      name: 'retailer',
      type: 'string',
      default: '',
      required: true,
      placeholder: 'taphoaxyz',
      description: 'The KiotViet retailer store identifier (e.g. taphoaxyz)',
    },
    {
      displayName: 'Client ID',
      name: 'clientId',
      type: 'string',
      default: '',
      required: true,
      description: 'The Client ID obtained from KiotViet Store Settings > API Connection',
    },
    {
      displayName: 'Client Secret',
      name: 'clientSecret',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
      required: true,
      description: 'The Client Secret obtained from KiotViet Store Settings > API Connection',
    },
  ];

  test: ICredentialTestRequest = {
    request: {
      baseURL: 'https://id.kiotviet.vn',
      url: '/connect/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: '={{"scopes=PublicApi.Access&grant_type=client_credentials&client_id=" + encodeURIComponent($credentials.clientId) + "&client_secret=" + encodeURIComponent($credentials.clientSecret)}}',
    },
  };
}
