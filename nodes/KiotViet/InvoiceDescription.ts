import type { INodeProperties } from 'n8n-workflow';

export const invoiceOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['invoice'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new invoice',
        action: 'Create an invoice',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get invoice details by ID or code',
        action: 'Get an invoice',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Get a list of invoices',
        action: 'Get many invoices',
      },
    ],
    default: 'getAll',
  },
];

export const invoiceFields: INodeProperties[] = [
  /* -------------------------------------------------------------------------- */
  /*                                 invoice:get                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'By',
    name: 'invoiceGetBy',
    type: 'options',
    options: [
      {
        name: 'ID',
        value: 'id',
        description: 'Get invoice by internal ID',
      },
      {
        name: 'Code',
        value: 'code',
        description: 'Get invoice by invoice code',
      },
    ],
    default: 'id',
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['get'],
      },
    },
  },
  {
    displayName: 'Invoice ID',
    name: 'invoiceId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['get'],
        invoiceGetBy: ['id'],
      },
    },
    description: 'The internal ID of the invoice',
  },
  {
    displayName: 'Invoice Code',
    name: 'invoiceCode',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['get'],
        invoiceGetBy: ['code'],
      },
    },
    description: 'The code of the invoice',
  },

  /* -------------------------------------------------------------------------- */
  /*                               invoice:getAll                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['invoice'],
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
        resource: ['invoice'],
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
        resource: ['invoice'],
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
        resource: ['invoice'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Branch ID',
        name: 'branchId',
        type: 'number',
        default: 0,
        description: 'Filter invoices by branch ID',
      },
      {
        displayName: 'Customer ID',
        name: 'customerId',
        type: 'number',
        default: 0,
        description: 'Filter invoices by customer ID',
      },
      {
        displayName: 'From Date',
        name: 'fromDate',
        type: 'dateTime',
        default: '',
        description: 'Filter invoices created after this date',
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
          { name: 'Completed (1)', value: 1 },
          { name: 'Cancelled / Void (2)', value: 2 },
          { name: 'Processing (3)', value: 3 },
        ],
        default: 1,
        description: 'Filter by invoice status',
      },
      {
        displayName: 'To Date',
        name: 'toDate',
        type: 'dateTime',
        default: '',
        description: 'Filter invoices created before this date',
      },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /*                               invoice:create                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Branch ID',
    name: 'branchId',
    type: 'number',
    default: 0,
    required: true,
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['create'],
      },
    },
    description: 'The branch ID where the invoice is created',
  },
  {
    displayName: 'Invoice Items',
    name: 'invoiceItemsUi',
    placeholder: 'Add Item',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    displayOptions: {
      show: {
        resource: ['invoice'],
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
            description: 'Quantity purchased',
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
    description: 'List of products purchased in the invoice',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Customer ID',
        name: 'customerId',
        type: 'number',
        default: 0,
        description: 'Customer ID who made the purchase',
      },
      {
        displayName: 'Description (Notes)',
        name: 'description',
        type: 'string',
        default: '',
        description: 'Notes on the invoice',
      },
      {
        displayName: 'Discount',
        name: 'discount',
        type: 'number',
        default: 0,
        description: 'Overall discount amount on the total invoice',
      },
      {
        displayName: 'Invoice Code',
        name: 'code',
        type: 'string',
        default: '',
        description: 'Custom invoice code. If omitted, KiotViet auto-generates.',
      },
      {
        displayName: 'Method of Payment',
        name: 'paymentMethod',
        type: 'options',
        options: [
          { name: 'Cash (Tiền mặt)', value: 'Cash' },
          { name: 'Card (Thẻ)', value: 'Card' },
          { name: 'Transfer (Chuyển khoản)', value: 'Transfer' },
        ],
        default: 'Cash',
        description: 'Payment method used by the customer',
      },
      {
        displayName: 'Paid Amount',
        name: 'paidAmount',
        type: 'number',
        default: 0,
        description: 'Total amount paid by the customer. If 0, it becomes customer debt.',
      },
    ],
  },
];
