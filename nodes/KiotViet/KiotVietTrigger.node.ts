import type {
  IHookFunctions,
  INodeType,
  INodeTypeDescription,
  IWebhookFunctions,
  IWebhookResponseData,
  IDataObject,
} from 'n8n-workflow';
import { kiotVietApiRequest } from './GenericFunctions';

export class KiotVietTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'KiotViet Trigger',
    name: 'kiotVietTrigger',
    icon: 'file:kiotviet.svg',
    group: ['trigger'],
    version: 1,
    subtitle: '={{$parameter["event"]}}',
    description: 'Starts the workflow when KiotViet events occur (Orders, Invoices, Products, Stock, Customers)',
    defaults: {
      name: 'KiotViet Trigger',
    },
    inputs: [],
    outputs: ['main'],
    credentials: [
      {
        name: 'kiotVietApi',
        required: true,
      },
    ],
    webhooks: [
      {
        name: 'default',
        httpMethod: 'POST',
        responseMode: 'onReceived',
        path: 'webhook',
      },
    ],
    properties: [
      {
        displayName: 'Event',
        name: 'event',
        type: 'options',
        required: true,
        default: 'order.update',
        options: [
          {
            name: 'Customer Updated / Created (customer.update)',
            value: 'customer.update',
            description: 'Triggered when a customer is created or updated',
          },
          {
            name: 'Invoice Created / Updated (invoice.update)',
            value: 'invoice.update',
            description: 'Triggered when a sales invoice is created or updated',
          },
          {
            name: 'Order Created / Updated (order.update)',
            value: 'order.update',
            description: 'Triggered when a sales order is created or status changes',
          },
          {
            name: 'Pricebook Updated (pricebook.update)',
            value: 'pricebook.update',
            description: 'Triggered when a pricebook is updated',
          },
          {
            name: 'Product Created / Updated (product.update)',
            value: 'product.update',
            description: 'Triggered when a product info or price changes',
          },
          {
            name: 'Stock / Inventory Changed (stock.update)',
            value: 'stock.update',
            description: 'Triggered when stock quantity changes across any branch',
          },
          {
            name: 'Category Updated (category.update)',
            value: 'category.update',
            description: 'Triggered when product categories change',
          },
          {
            name: 'Branch Updated (branch.update)',
            value: 'branch.update',
            description: 'Triggered when branch info changes',
          },
        ],
      },
    ],
  };

  webhookMethods = {
    default: {
      async checkExists(this: IHookFunctions): Promise<boolean> {
        const webhookData = this.getWorkflowStaticData('node');
        const webhookUrl = this.getNodeWebhookUrl('default') as string;
        const event = this.getNodeParameter('event') as string;

        try {
          const response = await kiotVietApiRequest.call(this, 'GET', '/webhooks');
          const webhooks = (response.data || response || []) as IDataObject[];

          for (const hook of webhooks) {
            if (hook.Url === webhookUrl && hook.Type === event) {
              webhookData.webhookId = hook.Id;
              return true;
            }
          }
        } catch {
          // If check fails, assume it does not exist
        }

        return false;
      },

      async create(this: IHookFunctions): Promise<boolean> {
        const webhookData = this.getWorkflowStaticData('node');
        const webhookUrl = this.getNodeWebhookUrl('default') as string;
        const event = this.getNodeParameter('event') as string;

        const body = {
          Webhook: {
            Type: event,
            Url: webhookUrl,
            IsActive: true,
          },
        };

        const response = await kiotVietApiRequest.call(this, 'POST', '/webhooks', body);
        if (response && (response.Id || response.id)) {
          webhookData.webhookId = response.Id || response.id;
          return true;
        }

        return false;
      },

      async delete(this: IHookFunctions): Promise<boolean> {
        const webhookData = this.getWorkflowStaticData('node');
        const webhookId = webhookData.webhookId;

        if (webhookId) {
          try {
            await kiotVietApiRequest.call(this, 'DELETE', `/webhooks/${webhookId}`);
          } catch {
            // Suppress error during delete
          }
          delete webhookData.webhookId;
        }

        return true;
      },
    },
  };

  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const body = this.getBodyData() as IDataObject;

    // KiotViet sends: { Id, Attempt, Notifications: [{ Action, Data: [...] }] }
    return {
      workflowData: [this.helpers.returnJsonArray(body)],
    };
  }
}
