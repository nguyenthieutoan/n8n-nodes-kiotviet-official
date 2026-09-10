import type { INodeProperties } from 'n8n-workflow';

export const productOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['product'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new product',
        action: 'Create a product',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a product',
        action: 'Delete a product',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get product details by ID or code',
        action: 'Get a product',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Get a list of products',
        action: 'Get many products',
      },
      {
        name: 'Get Inventory',
        value: 'getInventory',
        description: 'Get inventory of products across branches',
        action: 'Get product inventory',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update an existing product',
        action: 'Update a product',
      },
    ],
    default: 'getAll',
  },
];

export const productFields: INodeProperties[] = [
  /* -------------------------------------------------------------------------- */
  /*                                product:get                                 */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'By',
    name: 'productGetBy',
    type: 'options',
    options: [
      {
        name: 'ID',
        value: 'id',
        description: 'Get product by internal ID',
      },
      {
        name: 'Code',
        value: 'code',
        description: 'Get product by SKU / product code',
      },
    ],
    default: 'id',
    displayOptions: {
      show: {
        resource: ['product'],
        operation: ['get'],
      },
    },
  },
  {
    displayName: 'Product ID',
    name: 'productId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['product'],
        operation: ['get'],
        productGetBy: ['id'],
      },
    },
    description: 'The internal ID of the product to retrieve',
  },
  {
    displayName: 'Product Code',
    name: 'productCode',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['product'],
        operation: ['get'],
        productGetBy: ['code'],
      },
    },
    description: 'The SKU code of the product to retrieve',
  },

  /* -------------------------------------------------------------------------- */
  /*                               product:delete                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Product ID',
    name: 'productId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['product'],
        operation: ['delete'],
      },
    },
    description: 'The internal ID of the product to delete',
  },

  /* -------------------------------------------------------------------------- */
  /*                               product:getAll                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['product'],
        operation: ['getAll', 'getInventory'],
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
        resource: ['product'],
        operation: ['getAll', 'getInventory'],
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
        resource: ['product'],
        operation: ['getAll', 'getInventory'],
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
        resource: ['product'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Category ID',
        name: 'categoryId',
        type: 'number',
        default: 0,
        description: 'Filter products by specific category ID',
      },
      {
        displayName: 'Include Inventory',
        name: 'includeInventory',
        type: 'boolean',
        default: true,
        description: 'Whether to include inventory quantities across branches',
      },
      {
        displayName: 'Include Pricebook',
        name: 'includePricebook',
        type: 'boolean',
        default: false,
        description: 'Whether to include pricebook details in the response',
      },
      {
        displayName: 'Last Modified From',
        name: 'lastModifiedFrom',
        type: 'dateTime',
        default: '',
        description: 'Filter products modified after this timestamp',
      },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /*                               product:create                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Product Name',
    name: 'name',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['product'],
        operation: ['create'],
      },
    },
    description: 'Name of the product',
  },
  {
    displayName: 'Category ID',
    name: 'categoryId',
    type: 'number',
    default: 0,
    required: true,
    displayOptions: {
      show: {
        resource: ['product'],
        operation: ['create'],
      },
    },
    description: 'Category ID the product belongs to',
  },
  {
    displayName: 'Base Price',
    name: 'basePrice',
    type: 'number',
    default: 0,
    required: true,
    displayOptions: {
      show: {
        resource: ['product'],
        operation: ['create'],
      },
    },
    description: 'Base selling price of the product',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['product'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Bar Code',
        name: 'barCode',
        type: 'string',
        default: '',
        description: 'Barcode of the product',
      },
      {
        displayName: 'Code (SKU)',
        name: 'code',
        type: 'string',
        default: '',
        description: 'Product SKU code. If omitted, KiotViet generates automatically.',
      },
      {
        displayName: 'Cost Price',
        name: 'cost',
        type: 'number',
        default: 0,
        description: 'Cost price (giá vốn) of the product',
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'Detailed description of the product',
      },
      {
        displayName: 'Unit',
        name: 'unit',
        type: 'string',
        default: '',
        description: 'Unit of measurement (e.g. cái, hộp, kg)',
      },
      {
        displayName: 'Weight',
        name: 'weight',
        type: 'number',
        default: 0,
        description: 'Product weight in grams',
      },
      {
        displayName: 'Allows Sale',
        name: 'allowsSale',
        type: 'boolean',
        default: true,
        description: 'Whether the product is enabled for selling',
      },
    ],
  },

  /* -------------------------------------------------------------------------- */
  /*                               product:update                               */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Product ID',
    name: 'productId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['product'],
        operation: ['update'],
      },
    },
    description: 'ID of the product to update',
  },
  {
    displayName: 'Update Fields',
    name: 'updateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['product'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Allows Sale',
        name: 'allowsSale',
        type: 'boolean',
        default: true,
        description: 'Whether the product is enabled for selling',
      },
      {
        displayName: 'Bar Code',
        name: 'barCode',
        type: 'string',
        default: '',
        description: 'Barcode of the product',
      },
      {
        displayName: 'Base Price',
        name: 'basePrice',
        type: 'number',
        default: 0,
        description: 'Base selling price of the product',
      },
      {
        displayName: 'Category ID',
        name: 'categoryId',
        type: 'number',
        default: 0,
        description: 'Category ID the product belongs to',
      },
      {
        displayName: 'Cost Price',
        name: 'cost',
        type: 'number',
        default: 0,
        description: 'Cost price (giá vốn) of the product',
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'Detailed description of the product',
      },
      {
        displayName: 'Product Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'Name of the product',
      },
      {
        displayName: 'Unit',
        name: 'unit',
        type: 'string',
        default: '',
        description: 'Unit of measurement (e.g. cái, hộp, kg)',
      },
      {
        displayName: 'Weight',
        name: 'weight',
        type: 'number',
        default: 0,
        description: 'Product weight in grams',
      },
    ],
  },
];
