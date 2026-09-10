import type { INodeProperties } from 'n8n-workflow';

export const webhookOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['webhook'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Register a new webhook',
        action: 'Create a webhook',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a registered webhook',
        action: 'Delete a webhook',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Get a list of all registered webhooks',
        action: 'Get many webhooks',
      },
    ],
    default: 'getAll',
  },
];

export const webhookFields: INodeProperties[] = [
  /* -------------------------------------------------------------------------- */
  /*                               webhook:create                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Event Type',
    name: 'type',
    type: 'options',
    required: true,
    displayOptions: {
      show: {
        resource: ['webhook'],
        operation: ['create'],
      },
    },
    options: [
      { name: 'Branch Updated (branch.update)', value: 'branch.update' },
      { name: 'Category Updated (category.update)', value: 'category.update' },
      { name: 'Customer Updated (customer.update)', value: 'customer.update' },
      { name: 'Invoice Updated (invoice.update)', value: 'invoice.update' },
      { name: 'Order Updated (order.update)', value: 'order.update' },
      { name: 'Pricebook Updated (pricebook.update)', value: 'pricebook.update' },
      { name: 'Product Updated (product.update)', value: 'product.update' },
      { name: 'Stock / Inventory Updated (stock.update)', value: 'stock.update' },
    ],
    default: 'order.update',
    description: 'The event type that triggers the webhook',
  },
  {
    displayName: 'Webhook URL',
    name: 'url',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['webhook'],
        operation: ['create'],
      },
    },
    placeholder: 'https://your-n8n-instance.com/webhook/...',
    description: 'The URL that KiotViet will send POST notifications to',
  },
  {
    displayName: 'Active',
    name: 'isActive',
    type: 'boolean',
    default: true,
    displayOptions: {
      show: {
        resource: ['webhook'],
        operation: ['create'],
      },
    },
    description: 'Whether the webhook should be activated immediately',
  },

  /* -------------------------------------------------------------------------- */
  /*                               webhook:delete                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Webhook ID',
    name: 'webhookId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['webhook'],
        operation: ['delete'],
      },
    },
    description: 'The ID of the webhook to delete',
  },
];
