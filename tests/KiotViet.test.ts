import { KiotViet } from '../nodes/KiotViet/KiotViet.node';
import { KiotVietTrigger } from '../nodes/KiotViet/KiotVietTrigger.node';
import { KiotVietApi } from '../credentials/KiotVietApi.credentials';

describe('KiotViet Node Suite', () => {
  describe('KiotViet Action Node', () => {
    let node: KiotViet;

    beforeEach(() => {
      node = new KiotViet();
    });

    it('should instantiate correctly with valid metadata', () => {
      expect(node).toBeDefined();
      expect(node.description.name).toBe('kiotViet');
      expect(node.description.displayName).toBe('KiotViet');
      expect(node.description.icon).toBe('file:kiotviet.svg');
    });

    it('should have standard inputs and outputs', () => {
      expect(node.description.inputs).toEqual(['main']);
      expect(node.description.outputs).toEqual(['main']);
    });

    it('should require kiotVietApi credential', () => {
      expect(node.description.credentials).toEqual([
        {
          name: 'kiotVietApi',
          required: true,
        },
      ]);
    });

    it('should include all 7 required core resources', () => {
      const resourceProp = node.description.properties.find((p) => p.name === 'resource');
      expect(resourceProp).toBeDefined();
      const resourceValues = (resourceProp?.options || []).map((o: any) => o.value);
      expect(resourceValues).toContain('product');
      expect(resourceValues).toContain('customer');
      expect(resourceValues).toContain('order');
      expect(resourceValues).toContain('invoice');
      expect(resourceValues).toContain('category');
      expect(resourceValues).toContain('branch');
      expect(resourceValues).toContain('webhook');
    });
  });

  describe('KiotViet Trigger Node', () => {
    let triggerNode: KiotVietTrigger;

    beforeEach(() => {
      triggerNode = new KiotVietTrigger();
    });

    it('should instantiate correctly with trigger properties', () => {
      expect(triggerNode).toBeDefined();
      expect(triggerNode.description.name).toBe('kiotVietTrigger');
      expect(triggerNode.description.displayName).toBe('KiotViet Trigger');
      expect(triggerNode.description.group).toEqual(['trigger']);
      expect(triggerNode.description.inputs).toEqual([]);
      expect(triggerNode.description.outputs).toEqual(['main']);
    });

    it('should contain webhook lifecycle methods', () => {
      expect(triggerNode.webhookMethods).toBeDefined();
      expect(triggerNode.webhookMethods.default).toBeDefined();
      expect(typeof triggerNode.webhookMethods.default.checkExists).toBe('function');
      expect(typeof triggerNode.webhookMethods.default.create).toBe('function');
      expect(typeof triggerNode.webhookMethods.default.delete).toBe('function');
    });
  });

  describe('KiotViet API Credentials', () => {
    let credentials: KiotVietApi;

    beforeEach(() => {
      credentials = new KiotVietApi();
    });

    it('should have correct name and properties', () => {
      expect(credentials.name).toBe('kiotVietApi');
      const propNames = credentials.properties.map((p) => p.name);
      expect(propNames).toContain('retailer');
      expect(propNames).toContain('clientId');
      expect(propNames).toContain('clientSecret');
    });

    it('should protect clientSecret as password field', () => {
      const secretProp = credentials.properties.find((p) => p.name === 'clientSecret');
      expect(secretProp?.typeOptions?.password).toBe(true);
    });

    it('should have Test Connection configured for instant verification', () => {
      expect(credentials.test).toBeDefined();
      expect(credentials.test?.request.baseURL).toBe('https://id.kiotviet.vn');
      expect(credentials.test?.request.url).toBe('/connect/token');
      expect(String(credentials.test?.request.body).startsWith('=')).toBe(true);
      expect(credentials.test?.request.body).toContain('scopes=PublicApi.Access');
      expect(credentials.test?.request.body).toContain('grant_type=client_credentials');
    });
  });
});
