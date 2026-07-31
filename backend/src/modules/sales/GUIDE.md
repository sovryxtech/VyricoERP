# Sales Module

The Sales module is responsible for managing product sales to customers. It records sales transactions, stores sold items, automatically decreases product stock, and maintains sales history.

---

# Database Tables

```
customers
    │
    ▼
sales
    │
    ▼
sale_items
    │
    ▼
products
```

---

# API Endpoints

| Method | Endpoint     | Description             |
| ------ | ------------ | ----------------------- |
| GET    | `/sales`     | Get all sales           |
| GET    | `/sales/:id` | Get a specific sale     |
| POST   | `/sales`     | Create a new sale       |
| PATCH  | `/sales/:id` | Update an existing sale |
| DELETE | `/sales/:id` | Delete a sale           |

---

# GET /sales

Returns all sales.

### Success Response

```json
{
    "status": "success",
    "count": 2,
    "data": [
        {
            "id": 1,
            "customer": "Aarav Sharma",
            "invoice_number": "SAL-1001",
            "sale_date": "2026-08-01",
            "total_amount": 9600
        }
    ]
}
```

---

# GET /sales/:id

Returns one sale along with all sold items.

### Example

```
GET /sales/1
```

### Success Response

```json
{
    "status": "success",
    "data": {
        "sale": {
            "id": 1,
            "customer": "Aarav Sharma",
            "invoice_number": "SAL-1001",
            "sale_date": "2026-08-01",
            "total_amount": 9600
        },
        "items": [
            {
                "product": "Gaming Mouse",
                "quantity": 2,
                "selling_price": 1800,
                "subtotal": 3600
            },
            {
                "product": "Mechanical Keyboard",
                "quantity": 2,
                "selling_price": 3000,
                "subtotal": 6000
            }
        ]
    }
}
```

---

# POST /sales

Creates a new sale.

### Request Body

```json
{
    "customer_id": 1,
    "invoice_number": "SAL-1003",
    "sale_date": "2026-08-02",
    "items": [
        {
            "product_id": 1,
            "quantity": 2,
            "selling_price": 1800
        },
        {
            "product_id": 2,
            "quantity": 1,
            "selling_price": 4500
        }
    ]
}
```

### Success Response

```json
{
    "status": "success",
    "msg": "Sale created successfully",
    "data": {
        "sale_id": 3,
        "total_amount": 8100,
        "items_count": 2
    }
}
```

---

# PATCH /sales/:id

Updates an existing sale.

### Example

```
PATCH /sales/3
```

### Request Body

```json
{
    "customer_id": 2,
    "invoice_number": "SAL-1003",
    "sale_date": "2026-08-05",
    "items": [
        {
            "product_id": 1,
            "quantity": 3,
            "selling_price": 1800
        },
        {
            "product_id": 3,
            "quantity": 4,
            "selling_price": 1300
        }
    ]
}
```

### Success Response

```json
{
    "status": "success",
    "msg": "Sale updated successfully",
    "data": {
        "sale_id": 3,
        "total_amount": 10600,
        "items_count": 2
    }
}
```

---

# DELETE /sales/:id

Deletes a sale and restores product stock.

### Example

```
DELETE /sales/3
```

### Success Response

```json
{
    "status": "success",
    "msg": "Sale deleted successfully"
}
```

---

# Validation Rules

- Customer must exist.
- Product must exist.
- Invoice number is required.
- Sale date is required.
- Items array cannot be empty.
- Quantity must be greater than 0.
- Selling price cannot be negative.
- Product stock must be sufficient before creating or updating a sale.

---

# Business Logic

### Creating a Sale

```
Validate Request
        │
        ▼
BEGIN TRANSACTION
        │
        ▼
Check Customer
        │
        ▼
Create Sale
        │
        ▼
For each Item
    │
    ├── Check Product
    ├── Verify Stock
    ├── Insert sale_item
    ├── Decrease Product Stock
    └── Calculate Total
        │
        ▼
Update Sale Total
        │
        ▼
COMMIT
```

---

### Updating a Sale

```
BEGIN
    │
    ▼
Get Old Sale Items
    │
    ▼
Restore Old Stock
    │
    ▼
Delete Old Sale Items
    │
    ▼
Update Sale Header
    │
    ▼
Insert New Sale Items
    │
    ▼
Decrease Product Stock
    │
    ▼
Update Sale Total
    │
    ▼
COMMIT
```

---

### Deleting a Sale

```
BEGIN
    │
    ▼
Get Sale Items
    │
    ▼
Restore Product Stock
    │
    ▼
Delete Sale Items
    │
    ▼
Delete Sale
    │
    ▼
COMMIT
```

---

# Inventory Flow

```
Purchase
    │
    ▼
Stock Increased
    │
    ▼
Product Inventory
    │
    ▼
Sale
    │
    ▼
Stock Decreased
```

Deleting a sale restores inventory.

Updating a sale restores previous inventory first, then deducts the updated quantities.

---

# Transaction Safety

Every write operation uses PostgreSQL transactions.

```
BEGIN

↓

Perform All Database Operations

↓

COMMIT
```

If any operation fails,

```
ROLLBACK
```

is executed automatically to keep the database consistent.

---

# Error Responses

## 400 Bad Request

```json
{
    "status": "error",
    "msg": "Customer, invoice number, sale date and items are required"
}
```

---

## 404 Not Found

```json
{
    "status": "error",
    "msg": "Sale not found"
}
```

or

```json
{
    "status": "error",
    "msg": "Customer not found"
}
```

or

```json
{
    "status": "error",
    "msg": "Product not found"
}
```

---

## 409 Conflict

```json
{
    "status": "error",
    "msg": "Invoice number already exists"
}
```

---

## 400 Bad Request

```json
{
    "status": "error",
    "msg": "Insufficient stock for product 1"
}
```

---

## 500 Internal Server Error

```json
{
    "status": "error",
    "msg": "Internal Server Error"
}
```

---

# Testing Checklist

- [ ] Get all sales
- [ ] Get sale by ID
- [ ] Create sale
- [ ] Update sale
- [ ] Delete sale
- [ ] Invalid customer
- [ ] Invalid product
- [ ] Duplicate invoice number
- [ ] Empty items array
- [ ] Insufficient stock
- [ ] Verify stock decreases after sale
- [ ] Verify stock restores after sale deletion
- [ ] Verify stock is correctly adjusted after sale update

---

# Module Summary

- Complete CRUD operations
- Customer validation
- Product validation
- Stock availability validation
- Automatic inventory deduction
- Automatic inventory restoration
- Sale total calculation
- Transaction-safe operations
- Sales history management
- Inventory synchronization