# Purchases Module

The Purchases module is responsible for managing inventory purchases from suppliers. It records purchase transactions, stores purchased items, and automatically updates product stock levels.

---

# Database Tables

```
suppliers
    │
    ▼
purchases
    │
    ▼
purchase_items
    │
    ▼
products
```

---

# API Endpoints

| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| GET    | `/purchases`     | Get all purchases           |
| GET    | `/purchases/:id` | Get a specific purchase     |
| POST   | `/purchases`     | Create a new purchase       |
| PATCH  | `/purchases/:id` | Update an existing purchase |
| DELETE | `/purchases/:id` | Delete a purchase           |

---

# GET /purchases

Returns all purchase records.

### Success Response

```json
{
    "status": "success",
    "count": 2,
    "data": [
        {
            "id": 1,
            "supplier_id": 1,
            "invoice_number": "PUR-1001",
            "purchase_date": "2026-08-01",
            "total_amount": 29500
        }
    ]
}
```

---

# GET /purchases/:id

Returns a single purchase along with its items.

### Example

```
GET /purchases/1
```

### Success Response

```json
{
    "status": "success",
    "data": {
        "purchase": {
            "id": 1,
            "supplier_id": 1,
            "invoice_number": "PUR-1001",
            "purchase_date": "2026-08-01",
            "total_amount": 29500
        },
        "items": [
            {
                "product_id": 1,
                "quantity": 10,
                "purchase_price": 1200,
                "subtotal": 12000
            },
            {
                "product_id": 2,
                "quantity": 5,
                "purchase_price": 3500,
                "subtotal": 17500
            }
        ]
    }
}
```

---

# POST /purchases

Creates a new purchase.

### Request Body

```json
{
    "supplier_id": 1,
    "invoice_number": "PUR-1001",
    "purchase_date": "2026-08-01",
    "items": [
        {
            "product_id": 1,
            "quantity": 10,
            "purchase_price": 1200
        },
        {
            "product_id": 2,
            "quantity": 5,
            "purchase_price": 3500
        }
    ]
}
```

### Success Response

```json
{
    "status": "success",
    "msg": "Purchase created successfully",
    "data": {
        "purchase_id": 1,
        "total_amount": 29500,
        "items_count": 2
    }
}
```

---

# PATCH /purchases/:id

Updates an existing purchase.

### Example

```
PATCH /purchases/1
```

### Request Body

```json
{
    "supplier_id": 2,
    "invoice_number": "PUR-1001",
    "purchase_date": "2026-08-05",
    "items": [
        {
            "product_id": 1,
            "quantity": 20,
            "purchase_price": 1200
        },
        {
            "product_id": 3,
            "quantity": 8,
            "purchase_price": 900
        }
    ]
}
```

### Success Response

```json
{
    "status": "success",
    "msg": "Purchase updated successfully",
    "data": {
        "purchase_id": 1,
        "total_amount": 31200,
        "items_count": 2
    }
}
```

---

# DELETE /purchases/:id

Deletes a purchase.

### Example

```
DELETE /purchases/1
```

### Success Response

```json
{
    "status": "success",
    "msg": "Purchase deleted successfully"
}
```

---

# Search

Currently, the Purchases module supports:

```
GET /purchases
GET /purchases/:id
```

Future enhancements may include:

```
GET /purchases?supplier=1
GET /purchases?invoice=PUR-1001
GET /purchases?date=2026-08-01
```

---

# Validation Rules

- Supplier must exist.
- Invoice number is required.
- Purchase date is required.
- Items array cannot be empty.
- Product must exist.
- Quantity must be greater than 0.
- Purchase price cannot be negative.

---

# Business Logic

### Creating a Purchase

```
Validate Request
        │
        ▼
BEGIN TRANSACTION
        │
        ▼
Check Supplier
        │
        ▼
Create Purchase
        │
        ▼
For each Item
    │
    ├── Check Product
    ├── Insert purchase_item
    ├── Increase Product Stock
    └── Calculate Total
        │
        ▼
Update Purchase Total
        │
        ▼
COMMIT
```

---

### Updating a Purchase

```
BEGIN
    │
    ▼
Get Old Purchase Items
    │
    ▼
Reverse Stock
    │
    ▼
Delete Old Purchase Items
    │
    ▼
Update Purchase
    │
    ▼
Insert New Purchase Items
    │
    ▼
Increase Stock
    │
    ▼
Update Total
    │
    ▼
COMMIT
```

---

### Deleting a Purchase

```
BEGIN
    │
    ▼
Fetch Purchase Items
    │
    ▼
Decrease Product Stock
    │
    ▼
Delete Purchase Items
    │
    ▼
Delete Purchase
    │
    ▼
COMMIT
```

---

# Transaction Safety

All write operations (`POST`, `PATCH`, and `DELETE`) use PostgreSQL transactions.

```
BEGIN

↓

Perform All Database Operations

↓

COMMIT
```

If any step fails:

```
ROLLBACK
```

This guarantees database consistency and prevents partial updates.

---

# Error Responses

## 400 Bad Request

```json
{
    "status": "error",
    "msg": "Supplier, invoice number, purchase date and items are required"
}
```

---

## 404 Not Found

```json
{
    "status": "error",
    "msg": "Purchase not found"
}
```

or

```json
{
    "status": "error",
    "msg": "Supplier not found"
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

## 500 Internal Server Error

```json
{
    "status": "error",
    "msg": "Internal Server Error"
}
```

---

# Testing Checklist

- [ ] Get all purchases
- [ ] Get purchase by ID
- [ ] Create purchase
- [ ] Update purchase
- [ ] Delete purchase
- [ ] Invalid supplier
- [ ] Invalid product
- [ ] Empty items array
- [ ] Duplicate invoice number
- [ ] Verify stock increases after purchase
- [ ] Verify stock updates after purchase edit
- [ ] Verify stock decreases after purchase deletion

---

# Module Summary

- CRUD operations for purchases
- Purchase item management
- Automatic stock updates
- Transaction-safe operations
- Supplier validation
- Product validation
- Purchase total calculation
- Inventory synchronization