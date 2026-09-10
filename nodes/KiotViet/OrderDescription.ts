import type { INodeProperties } from 'n8n-workflow';

export const orderOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['order'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new order',
        action: 'Create an order',
      },
      {
        name: 'Delete / Void',
        value: 'delete',
        description: 'Delete or void an order',
        action: 'Delete an order',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get order details by ID or code',
        action: 'Get an order',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Get a list of orders',
        action: 'Get many orders',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update an existing order',
        action: 'Update an order',
      },
    ],
    default: 'getAll',
  },
];

export const orderFields: INodeProperties[] = [
  /* -------------------------------------------------------------------------- */
  /*                                  order:get                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'By',
    name: 'orderGetBy',
    type: 'options',
    options: [
      {
        name: 'ID',
        value: 'id',
        description: 'Get order by internal ID',
      },
      {
        name: 'Code',
        value: 'code',
        description: 'Get order by order code',
      },
    ],
    default: 'id',
    displayOptions: {
      show: {
        resource: ['order'],
        operation: ['get'],
      },
    },
  },
  {
    displayName: 'Order ID',
    name: 'orderId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['order'],
        operation: ['get'],
        orderGetBy: ['id'],
      },
    },
    description: 'The internal ID of the order',
  },
  {
    displayName: 'Order Code',
    name: 'orderCode',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['order'],
        operation: ['get'],
        orderGetBy: ['code'],
      },
    },
    description: 'The code of the order',
  },

  /* -------------------------------------------------------------------------- */
  /*                                order:delete                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Order ID',
    name: 'orderId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['order'],
        operation: ['delete'],
      },
    },
    description: 'The internal ID of the order to delete/void',
  },

  /* -------------------------------------------------------------------------- */
  /*                                order:getAll                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['order'],
        operation: ['getAll'],
      },
    },
    default: false,
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: {
      show: {
        resource: ['order'],
        operation: ['getAll'],
        returnAll: [false],
      },
    },
    typeOptions: {
      minValue: 1,
      maxValue: 500,
    },
    default: 50,
    description: 'Max number of results to return',
  },
  {
    displayName: 'Simplify',
    name: 'simplify',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['order'],
        operation: ['getAll'],
      },
    },
    default: true,
    description: 'Whether to return a simplified version of the response instead of the raw data',
  },
  {
    displayName: 'Filters',
    name: 'filters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['order'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Branch ID',
        name: 'branchId',
        type: 'number',
        default: 0,
        description: 'Filter orders by specific branch ID',
      },
      {
        displayName: 'Customer ID',
        name: 'customerId',
        type: 'number',
        default: 0,
        description: 'Filter orders by customer ID',
      },
      {
        displayName: 'From Date',
        name: 'fromDate',
        type: 'dateTime',
        default: '',
        description: 'Filter orders created after this date',
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
          { name: 'Pending / In Progress (1)', value: 1 },
          { name: 'Completed (2)', value: 2 },
          { name: 'Cancelled / Void (3)', value: 3 },
        ],
        default: 1,
        description: 'Filter by order status',
      },
      {
        displayName: 'To Date',
        name: 'toDate',
        type: 'dateTime',
        default: '',
        description: 'Filter orders created before this date',
      },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /*                                order:create                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Branch ID',
    name: 'branchId',
    type: 'number',
    default: 0,
    required: true,
    displayOptions: {
      show: {
        resource: ['order'],
        operation: ['create'],
      },
    },
    description: 'The branch ID where the order is placed',
  },
  {
    displayName: 'Order Items',
    name: 'orderItemsUi',
    placeholder: 'Add Order Item',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    displayOptions: {
      show: {
        resource: ['order'],
        operation: ['create'],
      },
    },
    options: [
      {
        name: 'items',
        displayName: 'Items',
        values: [
          {
            displayName: 'Product Code',
            name: 'productCode',
            type: 'string',
            default: '',
            required: true,
            description: 'SKU code of the product',
          },
          {
            displayName: 'Quantity',
            name: 'quantity',
            type: 'number',
            default: 1,
            required: true,
            description: 'Quantity ordered',
          },
          {
            displayName: 'Price',
            name: 'price',
            type: 'number',
            default: 0,
            required: true,
            description: 'Selling unit price',
          },
          {
            displayName: 'Discount',
            name: 'discount',
            type: 'number',
            default: 0,
            description: 'Discount amount for this line item',
          },
        ],
      },
    ],
    description: 'List of products included in the order',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['order'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Customer ID',
        name: 'customerId',
        type: 'number',
        default: 0,
        description: 'ID of the customer making the order',
      },
      {
        displayName: 'Description (Notes)',
        name: 'description',
        type: 'string',
        default: '',
        description: 'Notes or delivery instructions for the order',
      },
      {
        displayName: 'Discount',
        name: 'discount',
        type: 'number',
        default: 0,
        description: 'Overall discount amount on the total order',
      },
      {
        displayName: 'Order Code',
        name: 'code',
        type: 'string',
        default: '',
        description: 'Custom order code. If omitted, KiotViet generates automatically.',
      },
      {
        displayName: 'Make Invoice',
        name: 'makeInvoice',
        type: 'boolean',
        default: false,
        description: 'Whether to automatically create an invoice for this order',
      },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /*                                order:update                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Order ID',
    name: 'orderId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['order'],
        operation: ['update'],
      },
    },
    description: 'ID of the order to update',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['order'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Description (Notes)',
        name: 'description',
        type: 'string',
        default: '',
        description: 'Notes or delivery instructions for the order',
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
          { name: 'Pending / In Progress (1)', value: 1 },
          { name: 'Completed (2)', value: 2 },
          { name: 'Cancelled / Void (3)', value: 3 },
        ],
        default: 1,
        description: 'New status for the order',
      },
    ],
  },
];
