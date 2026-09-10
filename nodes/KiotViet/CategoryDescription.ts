import type { INodeProperties } from 'n8n-workflow';

export const categoryOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['category'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new category',
        action: 'Create a category',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Delete a category',
        action: 'Delete a category',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get category details by ID',
        action: 'Get a category',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Get a list of categories',
        action: 'Get many categories',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Update an existing category',
        action: 'Update a category',
      },
    ],
    default: 'getAll',
  },
];

export const categoryFields: INodeProperties[] = [
  /* -------------------------------------------------------------------------- */
  /*                                category:get                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Category ID',
    name: 'categoryId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['category'],
        operation: ['get'],
      },
    },
    description: 'The internal ID of the category',
  },

  /* -------------------------------------------------------------------------- */
  /*                               category:delete                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Category ID',
    name: 'categoryId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['category'],
        operation: ['delete'],
      },
    },
    description: 'The internal ID of the category to delete',
  },

  /* -------------------------------------------------------------------------- */
  /*                               category:getAll                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['category'],
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
        resource: ['category'],
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
    displayName: 'Hierarchical Data',
    name: 'hierarchicalData',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['category'],
        operation: ['getAll'],
      },
    },
    default: true,
    description: 'Whether to return categories in a nested tree structure (parent/children)',
  },

  /* -------------------------------------------------------------------------- */
  /*                               category:create                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Category Name',
    name: 'categoryName',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['category'],
        operation: ['create'],
      },
    },
    description: 'Name of the category',
  },
  {
    displayName: 'Parent ID',
    name: 'parentId',
    type: 'number',
    default: 0,
    displayOptions: {
      show: {
        resource: ['category'],
        operation: ['create'],
      },
    },
    description: 'Optional parent category ID if this is a subcategory',
  },

  /* -------------------------------------------------------------------------- */
  /*                               category:update                              */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Category ID',
    name: 'categoryId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['category'],
        operation: ['update'],
      },
    },
    description: 'ID of the category to update',
  },
  {
    displayName: 'Category Name',
    name: 'categoryName',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['category'],
        operation: ['update'],
      },
    },
    description: 'New name for the category',
  },
  {
    displayName: 'Parent ID',
    name: 'parentId',
    type: 'number',
    default: 0,
    displayOptions: {
      show: {
        resource: ['category'],
        operation: ['update'],
      },
    },
    description: 'Optional parent category ID',
  },
];
