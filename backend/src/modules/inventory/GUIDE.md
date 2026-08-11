# Inventory Module

The Inventory module provides a read-only view of the current product inventory.

It does **not** maintain a separate inventory table. Instead, it uses the existing `products` and `categories` tables as the source of truth.

Inventory is automatically affected by the existing Purchase and Sales modules:

```text
Purchase
    │
    ▼
Increase products.stock_quantity
    │
    ▼
Inventory
    │
    ▼
Decrease products.stock_quantity
    ▲
    │
Sale
```

This design prevents duplicate stock information and keeps inventory synchronized with actual purchases and sales.

---

# Module Responsibilities

The Inventory module is responsible for:

* Retrieving all inventory items
* Searching inventory
* Filtering low-stock products
* Filtering out-of-stock products
* Retrieving inventory for a specific product
* Calculating stock value
* Determining inventory status
* Returning product and category information

The module is intentionally **read-only**.

It does not create, update, or delete inventory records.

---

# Database Design

The Inventory module does not create a separate database table.

The existing `products` table already contains the required inventory information.

Relevant fields:

```text
products
│
├── id
├── sku
├── name
├── description
├── barcode
├── category_id
├── purchase_price
├── selling_price
├── stock_quantity
├── reorder_level
├── unit
├── image_url
├── is_active
├── created_at
└── updated_at
```

The category name is retrieved from:

```text
categories
```

using:

```text
products.category_id
        │
        ▼
categories.id
```

---

# Why There Is No Inventory Table

A separate `inventory` table would duplicate the stock information already stored in `products.stock_quantity`.

That could create synchronization problems:

```text
products.stock_quantity = 20

inventory.stock_quantity = 15
```

Which value would be correct?

Instead, the system keeps a single source of truth:

```text
products.stock_quantity
```

Purchases and Sales modify this value, while Inventory only reads it.

---

# Inventory Flow

## Purchase

When a purchase is created:

```text
Purchase
    │
    ▼
purchase_items
    │
    ▼
Increase products.stock_quantity
```

Example:

```text
Current stock = 10

Purchase quantity = 5

New stock = 15
```

---

## Sale

When a sale is created:

```text
Sale
    │
    ▼
sale_items
    │
    ▼
Decrease products.stock_quantity
```

Example:

```text
Current stock = 15

Sale quantity = 3

New stock = 12
```

---

# API Endpoints

| Method | Endpoint         | Description                          |
| ------ | ---------------- | ------------------------------------ |
| GET    | `/inventory`     | Get all inventory                    |
| GET    | `/inventory/:id` | Get inventory for a specific product |

The `/inventory` endpoint also supports search and status filtering through query parameters.

---

# GET /inventory

Returns all inventory items.

### Request

```text
GET /inventory
```

### Example Response

```json
{
    "status": "success",
    "count": 2,
    "data": [
        {
            "id": 1,
            "sku": "LAP-1001",
            "name": "Dell Laptop",
            "description": "Business laptop",
            "barcode": "8901234567890",
            "category": "Laptops",
            "purchase_price": "40000.00",
            "selling_price": "45000.00",
            "stock_quantity": 8,
            "reorder_level": 10,
            "stock_value": "320000.00",
            "status": "Low Stock",
            "unit": "pcs",
            "image_url": null,
            "is_active": true,
            "created_at": "...",
            "updated_at": "..."
        }
    ]
}
```

---

# Inventory Response Fields

| Field            | Description                     |
| ---------------- | ------------------------------- |
| `id`             | Product ID                      |
| `sku`            | Product SKU                     |
| `name`           | Product name                    |
| `description`    | Product description             |
| `barcode`        | Product barcode                 |
| `category`       | Category name                   |
| `purchase_price` | Product purchase price          |
| `selling_price`  | Product selling price           |
| `stock_quantity` | Current available stock         |
| `reorder_level`  | Minimum recommended stock level |
| `stock_value`    | Current stock × purchase price  |
| `status`         | Current inventory status        |
| `unit`           | Product unit                    |
| `image_url`      | Product image                   |
| `is_active`      | Whether the product is active   |
| `created_at`     | Creation timestamp              |
| `updated_at`     | Last update timestamp           |

---

# Search Inventory

Inventory can be searched using the `search` query parameter.

### Endpoint

```text
GET /inventory?search=dell
```

Search is performed against:

* SKU
* Product name
* Category name

The SQL implementation uses PostgreSQL `ILIKE`, making the search case-insensitive.

For example:

```text
GET /inventory?search=dell
```

can match:

```text
Dell Laptop
Dell Keyboard
DELL-001
```

---

# Search by SKU

```text
GET /inventory?search=LAP-1001
```

---

# Search by Product Name

```text
GET /inventory?search=laptop
```

---

# Search by Category

```text
GET /inventory?search=electronics
```

---

# Low Stock Filter

Low-stock products can be retrieved using:

```text
GET /inventory?status=low-stock
```

A product is considered low stock when:

```text
stock_quantity > 0
AND
stock_quantity <= reorder_level
```

Example:

```text
Stock Quantity = 7
Reorder Level = 10
```

Result:

```text
Low Stock
```

Products with zero stock are excluded from this filter because they have their own `Out of Stock` status.

---

# Out of Stock Filter

Use:

```text
GET /inventory?status=out-of-stock
```

A product is considered out of stock when:

```text
stock_quantity = 0
```

Example:

```text
Stock Quantity = 0
```

Result:

```text
Out of Stock
```

---

# Inventory Status Logic

Inventory status is calculated dynamically using a SQL `CASE` expression.

```text
stock_quantity = 0
        │
        ▼
Out of Stock
```

If the product has stock:

```text
stock_quantity <= reorder_level
        │
        ▼
Low Stock
```

Otherwise:

```text
stock_quantity > reorder_level
        │
        ▼
In Stock
```

The status is **not stored as a database column**.

It is calculated whenever inventory is requested.

---

# Stock Value

The inventory module calculates the value of the currently available stock.

Formula:

```text
Stock Value
    =
Stock Quantity × Purchase Price
```

Example:

```text
Stock Quantity = 8

Purchase Price = ₹40,000

Stock Value
= 8 × 40,000
= ₹3,20,000
```

The calculation is performed directly by PostgreSQL:

```sql
(
    p.stock_quantity * p.purchase_price
) AS stock_value
```

---

# GET /inventory/:id

Returns inventory information for a specific product.

### Request

```text
GET /inventory/1
```

### Success Response

```json
{
    "status": "success",
    "msg": "Inventory found successfully",
    "data": {
        "id": 1,
        "sku": "LAP-1001",
        "name": "Dell Laptop",
        "description": "Business laptop",
        "barcode": "8901234567890",
        "category": "Laptops",
        "purchase_price": "40000.00",
        "selling_price": "45000.00",
        "stock_quantity": 8,
        "reorder_level": 10,
        "stock_value": "320000.00",
        "status": "Low Stock",
        "unit": "pcs",
        "image_url": null,
        "is_active": true,
        "created_at": "...",
        "updated_at": "..."
    }
}
```

---

# Inventory Not Found

If the product does not exist:

```text
GET /inventory/9999
```

Response:

```json
{
    "status": "error",
    "msg": "Inventory item not found"
}
```

HTTP status:

```text
404 Not Found
```

---

# Combined Filters

Search and status filters can be used together.

### Example

```text
GET /inventory?search=dell&status=low-stock
```

This returns only products that:

```text
contain "dell"
        AND
are low stock
```

Another example:

```text
GET /inventory?search=laptop&status=out-of-stock
```

---

# SQL Architecture

The Inventory module joins `products` with `categories`.

```sql
FROM products p

JOIN categories c
    ON p.category_id = c.id
```

The category name is returned as:

```sql
c.name AS category
```

The inventory value is calculated using:

```sql
(
    p.stock_quantity * p.purchase_price
) AS stock_value
```

And inventory status is calculated using:

```sql
CASE

    WHEN p.stock_quantity = 0
        THEN 'Out of Stock'

    WHEN p.stock_quantity <= p.reorder_level
        THEN 'Low Stock'

    ELSE
        'In Stock'

END AS status
```

---

# Dynamic Query Filtering

The controller builds the query dynamically depending on the supplied query parameters.

For example:

```text
GET /inventory
```

does not require a `WHERE` clause.

While:

```text
GET /inventory?status=low-stock
```

adds:

```sql
WHERE
    p.stock_quantity > 0
    AND p.stock_quantity <= p.reorder_level
```

Multiple conditions are combined using:

```text
AND
```

---

# Search Query Parameters

| Parameter | Example                | Purpose                          |
| --------- | ---------------------- | -------------------------------- |
| `search`  | `?search=dell`         | Search SKU, product, or category |
| `status`  | `?status=low-stock`    | Filter low-stock products        |
| `status`  | `?status=out-of-stock` | Filter out-of-stock products     |

---

# Controller

The Inventory controller is located at:

```text
src/modules/inventory/inventory.controller.js
```

Main controller functions:

```javascript
getInventory()
getInventoryByID()
```

---

# Routes

The Inventory routes are located at:

```text
src/modules/inventory/inventory.routes.js
```

The routes expose:

```text
GET /
GET /:id
```

When mounted under `/inventory`, they become:

```text
GET /inventory
GET /inventory/:id
```

---

# Folder Structure

The module follows the project's module-based backend structure:

```text
src/
└── modules/
    └── inventory/
        ├── inventory.controller.js
        └── inventory.routes.js
```

---

# Error Handling

The Inventory module handles unexpected database and server errors.

### 500 Internal Server Error

```json
{
    "status": "error",
    "msg": "Internal Server Error"
}
```

The actual error is logged on the backend while a generic message is returned to the client.

---

# Read-Only Design

The Inventory module intentionally does not expose:

```text
POST /inventory
PATCH /inventory/:id
DELETE /inventory/:id
```

Inventory should not be manually modified through this module.

Stock changes must happen through the appropriate business operations.

```text
Purchase
    ↓
Increase Stock

Sale
    ↓
Decrease Stock
```

Inventory simply reflects the current state.

---

# Testing Checklist

## Basic Inventory

* [ ] Get all inventory
* [ ] Get inventory by product ID
* [ ] Invalid product ID
* [ ] Non-existent product ID

## Search

* [ ] Search by product name
* [ ] Search by SKU
* [ ] Search by category
* [ ] Case-insensitive search
* [ ] Search with no results

## Stock Status

* [ ] In-stock products
* [ ] Low-stock products
* [ ] Out-of-stock products

## Combined Filters

* [ ] Search + low-stock
* [ ] Search + out-of-stock

## Calculations

* [ ] Verify stock value
* [ ] Verify low-stock status
* [ ] Verify out-of-stock status
* [ ] Verify in-stock status

## Integration

* [ ] Purchase increases inventory
* [ ] Sale decreases inventory
* [ ] Deleted sale restores inventory
* [ ] Updated sale correctly adjusts inventory

---

# Example Inventory Lifecycle

Suppose a product starts with:

```text
Stock = 10
Reorder Level = 5
Purchase Price = ₹1,000
```

Initial state:

```text
Stock = 10
Status = In Stock
Stock Value = ₹10,000
```

A sale of 6 units occurs:

```text
10 - 6 = 4
```

New state:

```text
Stock = 4
Reorder Level = 5
Status = Low Stock
Stock Value = ₹4,000
```

Another sale of 4 units occurs:

```text
4 - 4 = 0
```

New state:

```text
Stock = 0
Status = Out of Stock
Stock Value = ₹0
```

A purchase of 20 units occurs:

```text
0 + 20 = 20
```

New state:

```text
Stock = 20
Status = In Stock
Stock Value = ₹20,000
```

This demonstrates how Inventory stays synchronized automatically with Purchases and Sales.

---

# Module Summary

The Inventory module provides a centralized read-only view of product inventory.

It uses the existing `products.stock_quantity` field as the single source of truth and dynamically calculates:

```text
Stock Value
Inventory Status
```

It supports:

* Inventory listing
* Product-specific inventory lookup
* Search
* Low-stock filtering
* Out-of-stock filtering
* Category information
* Stock valuation
* Dynamic inventory status
* Integration with Purchases
* Integration with Sales

No separate Inventory database table is required.
