# Products Module

The Products module is responsible for managing the inventory of products. It allows creating, retrieving, searching, updating, and deleting products while associating each product with a category.

---

# Database Tables

```
categories
      │
      ▼
products
```

Each product belongs to one category through the `category_id` foreign key.

---

# API Endpoints

| Method | Endpoint                            | Description                 |
| ------ | ----------------------------------- | --------------------------- |
| GET    | `/products`                         | Get all products            |
| GET    | `/products?search=mouse`            | Search products             |
| GET    | `/products?category=1`              | Filter products by category |
| GET    | `/products?search=mouse&category=1` | Search within a category    |
| GET    | `/products/:id`                     | Get a specific product      |
| POST   | `/products`                         | Create a new product        |
| PATCH  | `/products/:id`                     | Update product              |
| DELETE | `/products/:id`                     | Delete product              |

---

# GET /products

Returns all available products.

### Example

```
GET /products
```

### Success Response

```json
{
    "status": "success",
    "count": 2,
    "data": [
        {
            "id": 1,
            "sku": "PRD001",
            "name": "Gaming Mouse",
            "description": "RGB Gaming Mouse",
            "barcode": "1234567890",
            "category": "Electronics",
            "purchase_price": 1200,
            "selling_price": 1800,
            "stock_quantity": 25,
            "unit": "pcs",
            "reorder_level": 5,
            "image_url": null,
            "is_active": true
        }
    ]
}
```

---

# GET /products?search=mouse

Searches products by:

- Product Name
- SKU
- Barcode

### Example

```
GET /products?search=mouse
```

---

# GET /products?category=1

Returns all products belonging to Category ID `1`.

### Example

```
GET /products?category=1
```

---

# GET /products?search=mouse&category=1

Searches products within a specific category.

### Example

```
GET /products?search=mouse&category=1
```

---

# GET /products/:id

Returns one product.

### Example

```
GET /products/1
```

### Success Response

```json
{
    "status": "success",
    "msg": "Product found successfully",
    "data": {
        "id": 1,
        "sku": "PRD001",
        "name": "Gaming Mouse",
        "description": "RGB Gaming Mouse",
        "barcode": "1234567890",
        "category": "Electronics",
        "purchase_price": 1200,
        "selling_price": 1800,
        "stock_quantity": 25,
        "unit": "pcs",
        "reorder_level": 5,
        "image_url": null,
        "is_active": true
    }
}
```

---

# POST /products

Creates a new product.

### Request Body

```json
{
    "sku": "PRD005",
    "name": "Mechanical Keyboard",
    "description": "Wireless RGB Keyboard",
    "barcode": "987654321",
    "category_id": 1,
    "purchase_price": 3200,
    "selling_price": 4500,
    "stock_quantity": 20,
    "unit": "pcs",
    "reorder_level": 5,
    "image_url": null
}
```

### Success Response

```json
{
    "status": "success",
    "msg": "Product added successfully",
    "data": {
        "id": 5,
        "name": "Mechanical Keyboard"
    }
}
```

---

# PATCH /products/:id

Updates a product.

### Example

```
PATCH /products/5
```

### Request Body

```json
{
    "selling_price": 4700,
    "stock_quantity": 30,
    "reorder_level": 8
}
```

### Success Response

```json
{
    "status": "success",
    "msg": "Product updated successfully"
}
```

You may update one or multiple fields.

---

# DELETE /products/:id

Deletes a product.

### Example

```
DELETE /products/5
```

### Success Response

```json
{
    "status": "success",
    "msg": "Product deleted successfully"
}
```

---

# Search & Filter Support

The Products module supports four types of retrieval:

### Get all products

```
GET /products
```

### Search products

```
GET /products?search=laptop
```

### Filter by category

```
GET /products?category=2
```

### Search inside category

```
GET /products?search=mouse&category=1
```

---

# Validation Rules

- SKU is required.
- Product name is required.
- Category ID must exist.
- Purchase price cannot be negative.
- Selling price cannot be negative.
- Stock quantity cannot be negative.
- Reorder level cannot be negative.
- SKU must be unique.
- Barcode must be unique (if provided).

---

# Business Logic

## Create Product

```
Validate Request
        │
        ▼
Verify Category Exists
        │
        ▼
Insert Product
        │
        ▼
Return Created Product
```

---

## Search Product

```
Receive Query Parameters
        │
        ▼
Apply Search Filter
        │
        ▼
Apply Category Filter
        │
        ▼
Return Matching Products
```

---

## Update Product

```
Validate Product ID
        │
        ▼
Build Dynamic SQL Query
        │
        ▼
Update Product
        │
        ▼
Return Updated Product
```

---

## Delete Product

```
Validate Product ID
        │
        ▼
Delete Product
        │
        ▼
Return Success Message
```

---

# Error Responses

## 400 Bad Request

```json
{
    "status": "error",
    "msg": "Required fields are missing"
}
```

---

## 404 Not Found

```json
{
    "status": "error",
    "msg": "Product not found"
}
```

or

```json
{
    "status": "error",
    "msg": "Category not found"
}
```

---

## 409 Conflict

```json
{
    "status": "error",
    "msg": "SKU or Barcode already exists"
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

- [ ] Get all products
- [ ] Get product by ID
- [ ] Search products
- [ ] Filter by category
- [ ] Search + category filter
- [ ] Add product
- [ ] Update product
- [ ] Delete product
- [ ] Invalid category
- [ ] Duplicate SKU
- [ ] Duplicate barcode
- [ ] Missing required fields

---

# Module Summary

- Complete CRUD operations
- Product search
- Category filtering
- Combined search & filtering
- Category validation
- Dynamic PATCH updates
- SKU & barcode uniqueness
- Inventory management support
- RESTful API design