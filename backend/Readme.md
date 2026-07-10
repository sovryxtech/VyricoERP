# Authentication Module

## Overview

The authentication module has been completed with the following features:

* User Registration (Signup)
* User Login
* JWT (JSON Web Token) Generation
* Authentication Middleware
* Protected Route Support
* Error Handling for Invalid Credentials

> **Current Database:** MongoDB (Mongoose)

> **Note:** The database layer is temporary. We are planning to migrate from **MongoDB** to **PostgreSQL** within the next **1–2 days**. The authentication flow and API endpoints will remain almost the same, but the database implementation will be changed to PostgreSQL (likely using Prisma).

---

# Project Structure

```
controllers/
    user.js

middlewares/
    user.js

models/
    user.js

routes/
    user.js

services/
    auth.js

connection/
```

---

# Authentication Flow

## Signup

```
Client
    │
POST /user/signup
    │
Validate Request
    │
Check Username Exists
    │
Check Email Exists
    │
Create User
    │
Return Success Response
```

---

## Login

```
Client
    │
POST /user/login
    │
Validate Request
    │
Find User
    │
Generate JWT
    │
Return Token
```

---

## Protected Routes

```
Client
    │
Authorization: Bearer <JWT_TOKEN>
    │
Authentication Middleware
    │
Verify JWT
    │
Attach User to req.user
    │
Access Protected Route
```

---

# API Endpoints

## 1. Signup

**POST**

```
/user/signup
```

### Request Body

```json
{
    "name": "Raja",
    "userName": "rajababu22",
    "email": "raja@gmail.com",
    "password": "123456"
}
```

### Success Response

```json
{
    "status": "success",
    "msg": "User Registered Successfully",
    "user": {
        "_id": "...",
        "email": "raja@gmail.com",
        "userName": "rajababu22"
    }
}
```

---

## 2. Login

**POST**

```
/user/login
```

### Login using Username

```json
{
    "userName": "rajababu22",
    "password": "123456"
}
```

### Login using Email

```json
{
    "email": "raja@gmail.com",
    "password": "123456"
}
```

### Success Response

```json
{
    "token": "<JWT_TOKEN>",
    "status": "success",
    "msg": "Login Successful",
    "user": {
        "_id": "...",
        "email": "raja@gmail.com",
        "userName": "rajababu22"
    }
}
```

---

# Testing with Postman

## Step 1 — Register a User

* Method: `POST`
* URL:

```
http://localhost:<PORT>/user/signup
```

* Select **Body → raw → JSON**
* Paste the signup JSON.
* Send the request.

Expected Result:

* User should be created successfully.
* Verify the user is stored in MongoDB.

---

## Step 2 — Login

* Method: `POST`
* URL:

```
http://localhost:<PORT>/user/login
```

* Select **Body → raw → JSON**
* Paste either the username login request or email login request.
* Send the request.

Expected Result:

* A JWT token should be returned.

Copy the token for testing protected routes.

---

## Step 3 — Test Protected Routes

For any protected endpoint:

Go to:

**Headers**

Add:

| Key           | Value                |
| ------------- | -------------------- |
| Authorization | Bearer `<JWT_TOKEN>` |

Example:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

If the token is valid:

* Request will proceed.
* Authenticated user information will be available in `req.user`.

If the token is invalid or missing:

* API will return **401 Unauthorized**.

---

# Current Features

* User Signup
* User Login
* JWT Token Generation
* JWT Verification
* Global Authentication Middleware
* Restricted Route Middleware
* Protected API Support

---

# Upcoming Improvements

The following improvements are planned after the PostgreSQL migration:

* Migrate database from MongoDB to PostgreSQL.
* Integrate Prisma ORM.
* Hash passwords using bcrypt.
* Add Role-Based Authorization (Admin, Employee, Manager, etc.).
* Request validation using a validation library.
* Centralized error handling.
* Refresh Token support.
* Logging and monitoring.
* Improved project configuration and environment management.

---

# Development Note

This authentication module is considered the first stable version (V1).

The current implementation focuses on building a working authentication flow before introducing production-level enhancements. Security improvements and database migration will be completed in the upcoming development phase.
