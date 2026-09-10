import type { INodeProperties } from 'n8n-workflow';

export const customerOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['customer'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new customer',
        action: 'Create a customer',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a customer',
        action: 'Delete a customer',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get customer details by ID or code',
        action: 'Get a customer',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Get a list of customers',
        action: 'Get many customers',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update an existing customer',
        action: 'Update a customer',
      },
    ],
    default: 'getAll',
  },
];

export const customerFields: INodeProperties[] = [
  /* -------------------------------------------------------------------------- */
  /*                                customer:get                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'By',
    name: 'customerGetBy',
    type: 'options',
    options: [
      {
        name: 'ID',
        value: 'id',
        description: 'Get customer by internal ID',
      },
      {
        name: 'Code',
        value: 'code',
        description: 'Get customer by customer code',
      },
    ],
    default: 'id',
    displayOptions: {
      show: {
        resource: ['customer'],
        operation: ['get'],
      },
    },
  },
  {
    displayName: 'Customer ID',
    name: 'customerId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['customer'],
        operation: ['get'],
        customerGetBy: ['id'],
      },
    },
    description: 'The internal ID of the customer',
  },
  {
    displayName: 'Customer Code',
    name: 'customerCode',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['customer'],
        operation: ['get'],
        customerGetBy: ['code'],
      },
    },
    description: 'The code of the customer',
  },

  /* -------------------------------------------------------------------------- */
  /*                               customer:delete                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Customer ID',
    name: 'customerId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['customer'],
        operation: ['delete'],
      },
    },
    description: 'The internal ID of the customer to delete',
  },

  /* -------------------------------------------------------------------------- */
  /*                               customer:getAll                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['customer'],
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
        resource: ['customer'],
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
        resource: ['customer'],
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
        resource: ['customer'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Branch ID',
        name: 'branchId',
        type: 'number',
        default: 0,
        description: 'Filter customers registered at a specific branch',
      },
      {
        displayName: 'Contact Number',
        name: 'contactNumber',
        type: 'string',
        default: '',
        description: 'Search customer by phone number',
      },
      {
        displayName: 'Gender',
        name: 'gender',
        type: 'options',
        options: [
          { name: 'Female', value: false },
          { name: 'Male', value: true },
        ],
        default: true,
        description: 'Filter customers by gender',
      },
      {
        displayName: 'Group ID',
        name: 'groupId',
        type: 'number',
        default: 0,
        description: 'Filter by customer group ID',
      },
      {
        displayName: 'Last Modified From',
        name: 'lastModifiedFrom',
        type: 'dateTime',
        default: '',
        description: 'Filter customers modified after this timestamp',
      },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /*                               customer:create                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Customer Name',
    name: 'name',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['customer'],
        operation: ['create'],
      },
    },
    description: 'Full name of the customer',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['customer'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Address',
        name: 'address',
        type: 'string',
        default: '',
        description: 'Customer street address',
      },
      {
        displayName: 'Branch ID',
        name: 'branchId',
        type: 'number',
        default: 0,
        description: 'Branch ID the customer is assigned to',
      },
      {
        displayName: 'Code',
        name: 'code',
        type: 'string',
        default: '',
        description: 'Customer code. If omitted, KiotViet auto-generates.',
      },
      {
        displayName: 'Comments',
        name: 'comments',
        type: 'string',
        default: '',
        description: 'Internal notes/comments about the customer',
      },
      {
        displayName: 'Contact Number',
        name: 'contactNumber',
        type: 'string',
        default: '',
        description: 'Customer phone number',
      },
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        placeholder: 'name@email.com',
        default: '',
        description: 'Customer email address',
      },
      {
        displayName: 'Gender',
        name: 'gender',
        type: 'boolean',
        default: true,
        description: 'Whether the customer gender is male (true) or female (false)',
      },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /*                               customer:update                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Customer ID',
    name: 'customerId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['customer'],
        operation: ['update'],
      },
    },
    description: 'ID of the customer to update',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['customer'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Address',
        name: 'address',
        type: 'string',
        default: '',
        description: 'Customer street address',
      },
      {
        displayName: 'Branch ID',
        name: 'branchId',
        type: 'number',
        default: 0,
        description: 'Branch ID the customer is assigned to',
      },
      {
        displayName: 'Comments',
        name: 'comments',
        type: 'string',
        default: '',
        description: 'Internal notes/comments about the customer',
      },
      {
        displayName: 'Contact Number',
        name: 'contactNumber',
        type: 'string',
        default: '',
        description: 'Customer phone number',
      },
      {
        displayName: 'Customer Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Full name of the customer',
      },
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        placeholder: 'name@email.com',
        default: '',
        description: 'Customer email address',
      },
      {
        displayName: 'Gender',
        name: 'gender',
        type: 'boolean',
        default: true,
        description: 'Whether the customer gender is male (true) or female (false)',
      },
    ],
  },
];
