import type {
  IExecuteFunctions,
  IDataObject,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

import { productOperations, productFields } from './ProductDescription';
import { customerOperations, customerFields } from './CustomerDescription';
import { orderOperations, orderFields } from './OrderDescription';
import { invoiceOperations, invoiceFields } from './InvoiceDescription';
import { categoryOperations, categoryFields } from './CategoryDescription';
import { branchOperations, branchFields } from './BranchDescription';
import { webhookOperations, webhookFields } from './WebhookDescription';
import { kiotVietApiRequest, kiotVietApiRequestAllItems, simplifyResponse } from './GenericFunctions';

export class KiotViet implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'KiotViet',
    name: 'kiotViet',
    icon: 'file:kiotviet.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Manage KiotViet products, orders, invoices, customers, categories, branches, and webhooks',
    defaults: {
      name: 'KiotViet',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'kiotVietApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          { name: 'Product (Hàng hóa)', value: 'product' },
          { name: 'Customer (Khách hàng)', value: 'customer' },
          { name: 'Order (Đặt hàng)', value: 'order' },
          { name: 'Invoice (Hóa đơn)', value: 'invoice' },
          { name: 'Category (Nhóm hàng)', value: 'category' },
          { name: 'Branch (Chi nhánh)', value: 'branch' },
          { name: 'Webhook', value: 'webhook' },
        ],
        default: 'product',
      },

      ...productOperations,
      ...productFields,

      ...customerOperations,
      ...customerFields,

      ...orderOperations,
      ...orderFields,

      ...invoiceOperations,
      ...invoiceFields,

      ...categoryOperations,
      ...categoryFields,

      ...branchOperations,
      ...branchFields,

      ...webhookOperations,
      ...webhookFields,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;

    for (let i = 0; i < items.length; i++) {
      try {
        let responseData: any;

        /* -------------------------------------------------------------------------- */
        /*                                  PRODUCT                                   */
        /* -------------------------------------------------------------------------- */
        if (resource === 'product') {
          if (operation === 'get') {
            const getBy = this.getNodeParameter('productGetBy', i) as string;
            if (getBy === 'id') {
              const id = this.getNodeParameter('productId', i) as string;
              responseData = await kiotVietApiRequest.call(this, 'GET', `/products/${id}`);
            } else {
              const code = this.getNodeParameter('productCode', i) as string;
              responseData = await kiotVietApiRequest.call(this, 'GET', `/products/code/${encodeURIComponent(code)}`);
            }
          } else if (operation === 'delete') {
            const id = this.getNodeParameter('productId', i) as string;
            await kiotVietApiRequest.call(this, 'DELETE', `/products/${id}`);
            responseData = { deleted: true };
          } else if (operation === 'getAll') {
            const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
            const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
            const qs: IDataObject = { ...filters };

            if (returnAll) {
              responseData = await kiotVietApiRequestAllItems.call(this, 'data', 'GET', '/products', {}, qs);
            } else {
              const limit = this.getNodeParameter('limit', i, 50) as number;
              responseData = await kiotVietApiRequestAllItems.call(this, 'data', 'GET', '/products', {}, qs, limit);
            }

            const simplify = this.getNodeParameter('simplify', i, true) as boolean;
            if (simplify) {
              responseData = simplifyResponse('product', responseData);
            }
          } else if (operation === 'getInventory') {
            const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
            const qs: IDataObject = {};
            if (returnAll) {
              responseData = await kiotVietApiRequestAllItems.call(this, 'data', 'GET', '/products/inventories', {}, qs);
            } else {
              const limit = this.getNodeParameter('limit', i, 50) as number;
              responseData = await kiotVietApiRequestAllItems.call(this, 'data', 'GET', '/products/inventories', {}, qs, limit);
            }

            const simplify = this.getNodeParameter('simplify', i, true) as boolean;
            if (simplify) {
              responseData = simplifyResponse('product', responseData);
            }
          } else if (operation === 'create') {
            const name = this.getNodeParameter('name', i) as string;
            const categoryId = this.getNodeParameter('categoryId', i) as number;
            const basePrice = this.getNodeParameter('basePrice', i) as number;
            const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

            const body: IDataObject = {
              name,
              categoryId,
              basePrice,
              ...additionalFields,
            };

            responseData = await kiotVietApiRequest.call(this, 'POST', '/products', body);
          } else if (operation === 'update') {
            const id = this.getNodeParameter('productId', i) as string;
            const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

            responseData = await kiotVietApiRequest.call(this, 'PUT', `/products/${id}`, updateFields);
          }
        }

        /* -------------------------------------------------------------------------- */
        /*                                  CUSTOMER                                  */
        /* -------------------------------------------------------------------------- */
        else if (resource === 'customer') {
          if (operation === 'get') {
            const getBy = this.getNodeParameter('customerGetBy', i) as string;
            if (getBy === 'id') {
              const id = this.getNodeParameter('customerId', i) as string;
              responseData = await kiotVietApiRequest.call(this, 'GET', `/customers/${id}`);
            } else {
              const code = this.getNodeParameter('customerCode', i) as string;
              responseData = await kiotVietApiRequest.call(this, 'GET', `/customers/code/${encodeURIComponent(code)}`);
            }
          } else if (operation === 'delete') {
            const id = this.getNodeParameter('customerId', i) as string;
            await kiotVietApiRequest.call(this, 'DELETE', `/customers/${id}`);
            responseData = { deleted: true };
          } else if (operation === 'getAll') {
            const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
            const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
            const qs: IDataObject = { ...filters };

            if (returnAll) {
              responseData = await kiotVietApiRequestAllItems.call(this, 'data', 'GET', '/customers', {}, qs);
            } else {
              const limit = this.getNodeParameter('limit', i, 50) as number;
              responseData = await kiotVietApiRequestAllItems.call(this, 'data', 'GET', '/customers', {}, qs, limit);
            }

            const simplify = this.getNodeParameter('simplify', i, true) as boolean;
            if (simplify) {
              responseData = simplifyResponse('customer', responseData);
            }
          } else if (operation === 'create') {
            const name = this.getNodeParameter('name', i) as string;
            const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

            const body: IDataObject = {
              name,
              ...additionalFields,
            };

            responseData = await kiotVietApiRequest.call(this, 'POST', '/customers', body);
          } else if (operation === 'update') {
            const id = this.getNodeParameter('customerId', i) as string;
            const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

            responseData = await kiotVietApiRequest.call(this, 'PUT', `/customers/${id}`, updateFields);
          }
        }

        /* -------------------------------------------------------------------------- */
        /*                                    ORDER                                   */
        /* -------------------------------------------------------------------------- */
        else if (resource === 'order') {
          if (operation === 'get') {
            const getBy = this.getNodeParameter('orderGetBy', i) as string;
            if (getBy === 'id') {
              const id = this.getNodeParameter('orderId', i) as string;
              responseData = await kiotVietApiRequest.call(this, 'GET', `/orders/${id}`);
            } else {
              const code = this.getNodeParameter('orderCode', i) as string;
              responseData = await kiotVietApiRequest.call(this, 'GET', `/orders/code/${encodeURIComponent(code)}`);
            }
          } else if (operation === 'delete') {
            const id = this.getNodeParameter('orderId', i) as string;
            await kiotVietApiRequest.call(this, 'DELETE', `/orders/${id}`);
            responseData = { deleted: true };
          } else if (operation === 'getAll') {
            const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
            const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
            const qs: IDataObject = { ...filters };

            if (returnAll) {
              responseData = await kiotVietApiRequestAllItems.call(this, 'data', 'GET', '/orders', {}, qs);
            } else {
              const limit = this.getNodeParameter('limit', i, 50) as number;
              responseData = await kiotVietApiRequestAllItems.call(this, 'data', 'GET', '/orders', {}, qs, limit);
            }

            const simplify = this.getNodeParameter('simplify', i, true) as boolean;
            if (simplify) {
              responseData = simplifyResponse('order', responseData);
            }
          } else if (operation === 'create') {
            const branchId = this.getNodeParameter('branchId', i) as number;
            const orderItemsUi = this.getNodeParameter('orderItemsUi', i, {}) as { items: IDataObject[] };
            const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

            const orderDetails = (orderItemsUi.items || []).map((item) => ({
              productCode: item.productCode,
              quantity: item.quantity,
              price: item.price,
              discount: item.discount || 0,
            }));

            const body: IDataObject = {
              branchId,
              orderDetails,
              ...additionalFields,
            };

            responseData = await kiotVietApiRequest.call(this, 'POST', '/orders', body);
          } else if (operation === 'update') {
            const id = this.getNodeParameter('orderId', i) as string;
            const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

            responseData = await kiotVietApiRequest.call(this, 'PUT', `/orders/${id}`, updateFields);
          }
        }

        /* -------------------------------------------------------------------------- */
        /*                                   INVOICE                                  */
        /* -------------------------------------------------------------------------- */
        else if (resource === 'invoice') {
          if (operation === 'get') {
            const getBy = this.getNodeParameter('invoiceGetBy', i) as string;
            if (getBy === 'id') {
              const id = this.getNodeParameter('invoiceId', i) as string;
              responseData = await kiotVietApiRequest.call(this, 'GET', `/invoices/${id}`);
            } else {
              const code = this.getNodeParameter('invoiceCode', i) as string;
              responseData = await kiotVietApiRequest.call(this, 'GET', `/invoices/code/${encodeURIComponent(code)}`);
            }
          } else if (operation === 'getAll') {
            const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
            const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
            const qs: IDataObject = { ...filters };

            if (returnAll) {
              responseData = await kiotVietApiRequestAllItems.call(this, 'data', 'GET', '/invoices', {}, qs);
            } else {
              const limit = this.getNodeParameter('limit', i, 50) as number;
              responseData = await kiotVietApiRequestAllItems.call(this, 'data', 'GET', '/invoices', {}, qs, limit);
            }

            const simplify = this.getNodeParameter('simplify', i, true) as boolean;
            if (simplify) {
              responseData = simplifyResponse('invoice', responseData);
            }
          } else if (operation === 'create') {
            const branchId = this.getNodeParameter('branchId', i) as number;
            const invoiceItemsUi = this.getNodeParameter('invoiceItemsUi', i, {}) as { items: IDataObject[] };
            const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

            const invoiceDetails = (invoiceItemsUi.items || []).map((item) => ({
              productCode: item.productCode,
              quantity: item.quantity,
              price: item.price,
              discount: item.discount || 0,
            }));

            const payments: IDataObject[] = [];
            if (additionalFields.paidAmount && Number(additionalFields.paidAmount) > 0) {
              payments.push({
                Amount: additionalFields.paidAmount,
                Method: additionalFields.paymentMethod || 'Cash',
              });
            }

            const body: IDataObject = {
              branchId,
              invoiceDetails,
              payments,
              ...additionalFields,
            };

            responseData = await kiotVietApiRequest.call(this, 'POST', '/invoices', body);
          }
        }

        /* -------------------------------------------------------------------------- */
        /*                                  CATEGORY                                  */
        /* -------------------------------------------------------------------------- */
        else if (resource === 'category') {
          if (operation === 'get') {
            const id = this.getNodeParameter('categoryId', i) as string;
            responseData = await kiotVietApiRequest.call(this, 'GET', `/categories/${id}`);
          } else if (operation === 'delete') {
            const id = this.getNodeParameter('categoryId', i) as string;
            await kiotVietApiRequest.call(this, 'DELETE', `/categories/${id}`);
            responseData = { deleted: true };
          } else if (operation === 'getAll') {
            const hierarchicalData = this.getNodeParameter('hierarchicalData', i, true) as boolean;
            const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
            const qs: IDataObject = { hierarchicalData };

            if (returnAll) {
              responseData = await kiotVietApiRequestAllItems.call(this, 'data', 'GET', '/categories', {}, qs);
            } else {
              const limit = this.getNodeParameter('limit', i, 50) as number;
              responseData = await kiotVietApiRequestAllItems.call(this, 'data', 'GET', '/categories', {}, qs, limit);
            }
          } else if (operation === 'create') {
            const categoryName = this.getNodeParameter('categoryName', i) as string;
            const parentId = this.getNodeParameter('parentId', i, 0) as number;
            const body: IDataObject = { categoryName };
            if (parentId > 0) body.parentId = parentId;

            responseData = await kiotVietApiRequest.call(this, 'POST', '/categories', body);
          } else if (operation === 'update') {
            const id = this.getNodeParameter('categoryId', i) as string;
            const categoryName = this.getNodeParameter('categoryName', i) as string;
            const parentId = this.getNodeParameter('parentId', i, 0) as number;
            const body: IDataObject = { categoryName };
            if (parentId > 0) body.parentId = parentId;

            responseData = await kiotVietApiRequest.call(this, 'PUT', `/categories/${id}`, body);
          }
        }

        /* -------------------------------------------------------------------------- */
        /*                                   BRANCH                                   */
        /* -------------------------------------------------------------------------- */
        else if (resource === 'branch') {
          if (operation === 'getAll') {
            const returnAll = this.getNodeParameter('returnAll', i, true) as boolean;
            const qs: IDataObject = {};
            if (returnAll) {
              responseData = await kiotVietApiRequestAllItems.call(this, 'data', 'GET', '/branches', {}, qs);
            } else {
              const limit = this.getNodeParameter('limit', i, 50) as number;
              responseData = await kiotVietApiRequestAllItems.call(this, 'data', 'GET', '/branches', {}, qs, limit);
            }
          }
        }

        /* -------------------------------------------------------------------------- */
        /*                                   WEBHOOK                                  */
        /* -------------------------------------------------------------------------- */
        else if (resource === 'webhook') {
          if (operation === 'getAll') {
            responseData = await kiotVietApiRequest.call(this, 'GET', '/webhooks');
          } else if (operation === 'create') {
            const type = this.getNodeParameter('type', i) as string;
            const url = this.getNodeParameter('url', i) as string;
            const isActive = this.getNodeParameter('isActive', i, true) as boolean;

            const body = {
              Webhook: {
                Type: type,
                Url: url,
                IsActive: isActive,
              },
            };

            responseData = await kiotVietApiRequest.call(this, 'POST', '/webhooks', body);
          } else if (operation === 'delete') {
            const id = this.getNodeParameter('webhookId', i) as string;
            await kiotVietApiRequest.call(this, 'DELETE', `/webhooks/${id}`);
            responseData = { deleted: true };
          }
        }

        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } },
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}
