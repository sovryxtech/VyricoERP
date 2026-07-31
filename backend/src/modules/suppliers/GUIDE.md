# Suppliers Module

The Suppliers module is responsible for managing supplier information. It allows you to create, retrieve, update, delete, and search suppliers that provide products to the business.

---

# Database Table

```
suppliers
```

---

# API Endpoints

| Method | Endpoint                 | Description             |
| ------ | ------------------------ | ----------------------- |
| GET    | `/suppliers`             | Get all suppliers       |
| GET    | `/suppliers?search=dell` | Search suppliers        |
| GET    | `/suppliers/:id`         | Get a specific supplier |
| POST   | `/suppliers`             | Create a new supplier   |
| PATCH  | `/suppliers/:id`         | Update supplier details |
| DELETE | `/suppliers/:id`         | Delete a supplier       |

---

# GET /suppliers

Returns all suppliers.

### Example

```
GET /suppliers
```

### Success Response

```json
{
    "status": "success",
    "count": 2,
    "data": [
        {
            "id": 1,
            "company_name": "Dell Technologies",
            "contact_person": "Rahul Sharma",
            "email": "rahul@dell.com",
            "phone": "9876543210",
            "address": "Bangalore",
            "created_at": "...",
            "updated_at": "..."
        }
    ]
}
```

---

# GET /suppliers?search=dell

Search suppliers by:

- Company Name
- Contact Person
- Email
- Phone

### Example

```
GET /suppliers?search=dell
```

---

# GET /suppliers/:id

Returns a single supplier.

### Example

```
GET /suppliers/1
```

### Success Response

```json
{
    "status": "success",
    "msg": "Supplier found successfully",
    "data": {
        "id": 1,
        "company_name": "Dell Technologies",
        "contact_person": "Rahul Sharma",
        "email": "rahul@dell.com",
        "phone": "9876543210",
        "address": "Bangalore",
        "created_at": "...",
        "updated_at": "..."
    }
}
```

---

# POST /suppliers

Creates a new supplier.

### Request Body

```json
{
    "company_name": "HP India",
    "contact_person": "Ramesh Kumar",
    "email": "ramesh@hp.com",
    "phone": "9876543211",
    "address": "Mumbai"
}
```

### Success Response

```json
{
    "status": "success",
    "msg": "Supplier added successfully",
    "data": {
        "id": 3,
        "company_name": "HP India",
        "contact_person": "Ramesh Kumar",
        "email": "ramesh@hp.com",
        "phone": "9876543211",
        "address": "Mumbai"
    }
}
```

---

# PATCH /suppliers/:id

Updates supplier information.

### Example

```
PATCH /suppliers/1
```

### Request Body

```json
{
    "company_name": "Dell Technologies Pvt Ltd",
    "contact_person": "Rahul Sharma",
    "phone": "9999999999"
}
```

### Success Response

```json
{
    "status": "success",
    "msg": "Supplier updated successfully",
    "data": {
        "id": 1,
        "company_name": "Dell Technologies Pvt Ltd",
        "contact_person": "Rahul Sharma",
        "phone": "9999999999"
    }
}
```

---

# DELETE /suppliers/:id

Deletes a supplier.

### Example

```
DELETE /suppliers/1
```

### Success Response

```json
{
    "status": "success",
    "msg": "Supplier deleted successfully"
}
```

---

# Search Functionality

Supported search fields:

- Company Name
- Contact Person
- Email
- Phone

Example:

```
GET /suppliers?search=rahul
```

or

```
GET /suppliers?search=dell
```

---

# Validation Rules

- Company name is required.
- Email must be unique.
- Phone number must be unique.
- Supplier ID must exist before updating or deleting.
- At least one field must be provided while updating.

---

# Business Logic

## Create Supplier

```
Validate Request
        │
        ▼
Insert Supplier
        │
        ▼
Return Created Supplier
```

---

## Update Supplier

```
Validate Supplier ID
        │
        ▼
Check Fields to Update
        │
        ▼
Build Dynamic SQL Query
        │
        ▼
Update Supplier
        │
        ▼
Return Updated Supplier
```

---

## Delete Supplier

```
Validate Supplier ID
        │
        ▼
Delete Supplier
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
    "msg": "Company name is required"
}
```

or

```json
{
    "status": "error",
    "msg": "Supplier ID is required"
}
```

or

```json
{
    "status": "error",
    "msg": "Provide atleast one field to update"
}
```

---

## 404 Not Found

```json
{
    "status": "error",
    "msg": "Supplier not found"
}
```

---

## 409 Conflict

```json
{
    "status": "error",
    "msg": "Email or Phone already exists"
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

- [ ] Get all suppliers
- [ ] Search supplier
- [ ] Get supplier by ID
- [ ] Add supplier
- [ ] Update supplier
- [ ] Delete supplier
- [ ] Duplicate email
- [ ] Duplicate phone
- [ ] Invalid supplier ID
- [ ] Empty update request

---

# Module Summary

- Complete CRUD operations
- Search functionality
- Dynamic update query
- Unique email validation
- Unique phone validation
- Error handling
- Supplier management
- RESTful API design
```