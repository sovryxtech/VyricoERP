# Customers Module

The Customers module is responsible for managing customer information. It allows creating, retrieving, updating, deleting, and searching customers who purchase products from the business.

---

# Database Table

```
customers
```

---

# API Endpoints

| Method | Endpoint                 | Description             |
| ------ | ------------------------ | ----------------------- |
| GET    | `/customers`             | Get all customers       |
| GET    | `/customers?search=john` | Search customers        |
| GET    | `/customers/:id`         | Get a specific customer |
| POST   | `/customers`             | Create a new customer   |
| PATCH  | `/customers/:id`         | Update customer details |
| DELETE | `/customers/:id`         | Delete a customer       |

---

# GET /customers

Returns all customers.

### Example

```
GET /customers
```

### Success Response

```json
{
    "status": "success",
    "count": 2,
    "data": [
        {
            "id": 1,
            "full_name": "Abhishek Mehata",
            "email": "abhishek@gmail.com",
            "phone": "9876543210",
            "address": "Kathmandu, Nepal",
            "created_at": "...",
            "updated_at": "..."
        }
    ]
}
```

---

# GET /customers?search=abhishek

Search customers by:

- Full Name
- Email
- Phone

### Example

```
GET /customers?search=abhishek
```

---

# GET /customers/:id

Returns a specific customer.

### Example

```
GET /customers/1
```

### Success Response

```json
{
    "status": "success",
    "msg": "Customer found successfully",
    "data": {
        "id": 1,
        "full_name": "Abhishek Mehata",
        "email": "abhishek@gmail.com",
        "phone": "9876543210",
        "address": "Kathmandu, Nepal",
        "created_at": "...",
        "updated_at": "..."
    }
}
```

---

# POST /customers

Creates a new customer.

### Request Body

```json
{
    "full_name": "John Doe",
    "email": "john@gmail.com",
    "phone": "9876543211",
    "address": "Bangalore, India"
}
```

### Success Response

```json
{
    "status": "success",
    "msg": "Customer added successfully",
    "data": {
        "id": 3,
        "full_name": "John Doe",
        "email": "john@gmail.com",
        "phone": "9876543211",
        "address": "Bangalore, India"
    }
}
```

---

# PATCH /customers/:id

Updates customer information.

### Example

```
PATCH /customers/1
```

### Request Body

```json
{
    "full_name": "Abhishek Kumar Mehata",
    "phone": "9999999999"
}
```

### Success Response

```json
{
    "status": "success",
    "msg": "Customer updated successfully",
    "data": {
        "id": 1,
        "full_name": "Abhishek Kumar Mehata",
        "phone": "9999999999"
    }
}
```

You can also update only one field.

```json
{
    "address": "Biratnagar, Nepal"
}
```

---

# DELETE /customers/:id

Deletes a customer.

### Example

```
DELETE /customers/1
```

### Success Response

```json
{
    "status": "success",
    "msg": "Customer deleted successfully"
}
```

---

# Search Functionality

Supported search fields:

- Full Name
- Email
- Phone

Example:

```
GET /customers?search=john
```

or

```
GET /customers?search=9876543210
```

---

# Validation Rules

- Customer name is required.
- Email must be unique.
- Phone number must be unique.
- Customer ID must exist before updating or deleting.
- At least one field must be provided while updating.

---

# Business Logic

## Create Customer

```
Validate Request
        │
        ▼
Insert Customer
        │
        ▼
Return Created Customer
```

---

## Get Customer

```
Validate Customer ID
        │
        ▼
Find Customer
        │
        ▼
Return Customer
```

---

## Update Customer

```
Validate Customer ID
        │
        ▼
Check Fields To Update
        │
        ▼
Build Dynamic SQL Query
        │
        ▼
Update Customer
        │
        ▼
Return Updated Customer
```

---

## Delete Customer

```
Validate Customer ID
        │
        ▼
Delete Customer
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
    "msg": "Customer name is required"
}
```

or

```json
{
    "status": "error",
    "msg": "Customer ID is required"
}
```

or

```json
{
    "status": "error",
    "msg": "Provide at least one field to update"
}
```

---

## 404 Not Found

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
    "msg": "No customers found"
}
```

---

## 409 Conflict

```json
{
    "status": "error",
    "msg": "Email or phone already exists"
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

- [ ] Get all customers
- [ ] Search customers
- [ ] Get customer by ID
- [ ] Add customer
- [ ] Update customer
- [ ] Update only one field
- [ ] Delete customer
- [ ] Duplicate email
- [ ] Duplicate phone
- [ ] Invalid customer ID
- [ ] Empty update request

---

# Module Summary

- Complete CRUD operations
- Search functionality
- Dynamic PATCH updates
- Unique email validation
- Unique phone validation
- Error handling
- Customer management
- RESTful API design
```