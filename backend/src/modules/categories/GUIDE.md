# Categories Module

The Categories module is responsible for managing product categories. Categories help organize products into logical groups such as Electronics, Grocery, Clothing, Furniture, etc.

---

# Database Table

```
categories
```

---

# API Endpoints

| Method | Endpoint          | Description             |
| ------ | ----------------- | ----------------------- |
| GET    | `/categories`     | Get all categories      |
| GET    | `/categories/:id` | Get a specific category |
| POST   | `/categories`     | Create a new category   |
| PATCH  | `/categories/:id` | Update a category       |
| DELETE | `/categories/:id` | Delete a category       |

---

# GET /categories

Returns all available categories.

### Example

```
GET /categories
```

### Success Response

```json
{
    "status": "success",
    "count": 3,
    "data": [
        {
            "id": 1,
            "name": "Electronics",
            "description": "Electronic gadgets and accessories"
        },
        {
            "id": 2,
            "name": "Furniture",
            "description": "Home and office furniture"
        }
    ]
}
```

---

# GET /categories/:id

Returns a specific category.

### Example

```
GET /categories/1
```

### Success Response

```json
{
    "status": "success",
    "msg": "Category found successfully",
    "data": {
        "id": 1,
        "name": "Electronics",
        "description": "Electronic gadgets and accessories"
    }
}
```

---

# POST /categories

Creates a new category.

### Request Body

```json
{
    "name": "Sports",
    "description": "Sports equipment and accessories"
}
```

### Success Response

```json
{
    "status": "success",
    "msg": "Category added successfully",
    "data": {
        "id": 4,
        "name": "Sports",
        "description": "Sports equipment and accessories"
    }
}
```

---

# PATCH /categories/:id

Updates an existing category.

### Example

```
PATCH /categories/4
```

### Request Body

```json
{
    "name": "Sports & Fitness",
    "description": "Sports equipment, fitness gear and accessories"
}
```

### Success Response

```json
{
    "status": "success",
    "msg": "Category updated successfully",
    "data": {
        "id": 4,
        "name": "Sports & Fitness",
        "description": "Sports equipment, fitness gear and accessories"
    }
}
```

You can also update a single field.

```json
{
    "description": "Updated description"
}
```

---

# DELETE /categories/:id

Deletes a category.

### Example

```
DELETE /categories/4
```

### Success Response

```json
{
    "status": "success",
    "msg": "Category deleted successfully"
}
```

---

# Validation Rules

- Category name is required while creating a category.
- Category description is required while creating a category.
- Category ID must exist before updating or deleting.
- At least one field must be provided while updating.

---

# Business Logic

## Create Category

```
Validate Request
        │
        ▼
Insert Category
        │
        ▼
Return Created Category
```

---

## Get Category

```
Validate Category ID
        │
        ▼
Find Category
        │
        ▼
Return Category
```

---

## Update Category

```
Validate Category ID
        │
        ▼
Check Fields To Update
        │
        ▼
Build Dynamic SQL Query
        │
        ▼
Update Category
        │
        ▼
Return Updated Category
```

---

## Delete Category

```
Validate Category ID
        │
        ▼
Delete Category
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
    "msg": "Name and Description are required"
}
```

or

```json
{
    "status": "error",
    "msg": "Category ID is required"
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
    "msg": "Category not found"
}
```

or

```json
{
    "status": "error",
    "msg": "Valid category is needed"
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

- [ ] Get all categories
- [ ] Get category by ID
- [ ] Create category
- [ ] Update category
- [ ] Update only name
- [ ] Update only description
- [ ] Delete category
- [ ] Invalid category ID
- [ ] Empty update request
- [ ] Missing required fields

---

# Module Summary

- Complete CRUD operations
- Dynamic PATCH updates
- Category validation
- Error handling
- RESTful API design
- Product categorization support
```