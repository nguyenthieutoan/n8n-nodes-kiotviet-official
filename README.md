# n8n-nodes-kiotviet-official

The **Ultimate KiotViet Integration for n8n**. Seamlessly manage Products, Orders, Invoices, Customers, Categories, Branches, and Real-time Webhooks in Vietnam's most popular retail management platform.

Developed and maintained by **[Jay Nguyen (Nguyễn Thiệu Toàn)](https://nguyenthieutoan.com)**.

🛡️ **[Verified n8n Creator](https://n8n.io/creators/nguyenthieutoan)** | 💼 CEO/Founder of **[GenStaff](https://genstaff.net)**

**Connect with me:**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nguyenthieutoan) [![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=flat&logo=facebook&logoColor=white)](https://www.facebook.com/nguyenthieutoan) [![Website](https://img.shields.io/badge/Website-nguyenthieutoan.com-brightgreen?style=flat)](https://nguyenthieutoan.com) [![Email](https://img.shields.io/badge/Email-me%40nguyenthieutoan.com-blue?style=flat)](mailto:me@nguyenthieutoan.com)

---

## 🌟 Why is this package a game-changer for n8n & Vietnamese Retailers?

**KiotViet** is the #1 cloud-based POS and retail management platform in Vietnam with over 300,000 active businesses. While connecting to KiotViet's Public API natively in n8n previously required dealing with raw HTTP requests, OAuth 2.0 token exchanges, and manual webhook registrations, **this package automates everything out of the box.**

### Key Highlights:
- **Automated OAuth 2.0 Authentication:** No need to write scripts or HTTP steps to fetch access tokens. The node handles token requests (`client_credentials`) and caches them securely in memory during workflow execution.
- **Bi-directional Webhook Automation:** The `KiotViet Trigger` node registers the webhook directly with KiotViet on workflow activation and deletes it upon deactivation, saving you from manual dashboard configuration.
- **Enterprise-Ready CRUD Operations:** Complete support for Products, Customers, Orders, Invoices, Categories, and Multi-Branch inventories.
- **100% n8n 2026 Verification Compliant:** Zero external runtime dependencies, full TypeScript strict typing, password masking for credentials, and standard English copywriting.

---

## 🚀 Installation

Go to **Settings > Community Nodes** in your n8n instance and install:

```bash
n8n-nodes-kiotviet-official
```

---

## ⚙️ Credentials Configuration

1. In your KiotViet Dashboard, navigate to **Thiết lập cửa hàng (Store Settings)** ➔ **Thiết lập kết nối API (API Connection)**.
2. Generate your **Client ID** and **Client Secret (Mã bảo mật)**. Note down your **Retailer (Mã gian hàng)** name (e.g. `taphoaxyz`).
3. In n8n, create a new **KiotViet API** credential:
   - **Retailer (Store Name)**: Enter your store name (e.g. `taphoaxyz`).
   - **Client ID**: Paste your Client ID.
   - **Client Secret**: Paste your Client Secret (automatically masked).
4. *(Bonus: Click the built-in **Test Connection** button in n8n to instantly verify your credentials with KiotViet's OAuth server!)*

---

## 📚 Included Nodes

| Node | Type | Description |
|------|------|-------------|
| **KiotViet** | Standard Action Node | Perform CRUD operations on Products, Customers, Orders, Invoices, Categories, Branches, and Webhooks. |
| **KiotViet Trigger** | Webhook Trigger Node | Listen to real-time events: Orders (`order.update`), Invoices (`invoice.update`), Stock levels (`stock.update`), Products (`product.update`), and Customers (`customer.update`). |

---

## 🛠️ Supported Operations

### 1. Product (Hàng hóa)
- **Get Many:** List products with filters (Category ID, Search, Include Inventory, Include Pricebook, Modified After).
- **Get:** Retrieve single product by internal ID or SKU Code.
- **Create:** Add new product with code, barcode, price, cost, category, and unit.
- **Update:** Modify existing product attributes.
- **Delete:** Remove product.
- **Get Inventory:** Check stock quantity across all branches.

### 2. Customer (Khách hàng)
- **Get Many:** List customers filtered by branch, gender, group, or phone number.
- **Get:** Retrieve customer by ID or Customer Code.
- **Create:** Add customer with name, phone, address, and notes.
- **Update:** Modify customer profile.
- **Delete:** Remove customer.

### 3. Order (Đặt hàng)
- **Get Many:** Filter orders by branch, customer, status, and date range.
- **Get:** Retrieve order details by ID or Order Code.
- **Create:** Place orders with item lines, quantities, prices, discounts, and optional auto-invoice.
- **Update:** Update order notes or status.
- **Delete / Void:** Cancel orders.

### 4. Invoice (Hóa đơn)
- **Get Many:** Filter sales invoices by branch, customer, and date.
- **Get:** Retrieve invoice details by ID or Invoice Code.
- **Create:** Issue retail invoices with line items and multiple payment methods (Cash, Card, Transfer).

### 5. Category (Nhóm hàng)
- **Get Many:** Retrieve hierarchical category tree or flat list.
- **Get:** Get category details by ID.
- **Create / Update / Delete:** Manage category hierarchy.

### 6. Branch (Chi nhánh)
- **Get Many:** List all active store branches.

### 7. Webhook
- **Get Many:** View currently active webhook subscriptions.
- **Create / Delete:** Register or remove custom webhook endpoints.

---

## 📄 License

[MIT](LICENSE) © [Jay Nguyen (Nguyễn Thiệu Toàn)](https://nguyenthieutoan.com)
