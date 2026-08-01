# Dashboard Module

The Dashboard module provides summarized business information for the ERP dashboard.

Base URL

```
/dashboard
```

---

# Endpoints

| Method | Endpoint          | Description             |
| ------ | ----------------- | ----------------------- |
| GET    | /stats            | Dashboard statistics    |
| GET    | /recent-sales     | Last 5 sales            |
| GET    | /recent-purchases | Last 5 purchases        |
| GET    | /low-stock        | Products with low stock |

---

# 1. Dashboard Statistics

### GET

```
/dashboard/stats
```

### Description

Returns the total counts required for dashboard cards.

### Response

```json
{
    "status": "success",
    "data": {
        "products": 18,
        "categories": 5,
        "suppliers": 7,
        "customers": 12,
        "purchases": 31,
        "sales": 29,
        "low_stock": 4
    }
}
```

---

# 2. Recent Sales

### GET

```
/dashboard/recent-sales
```

### Description

Returns the latest five sales.

### Response

```json
{
    "status": "success",
    "count": 5,
    "data": [
        {
            "id": 7,
            "customer": "John Doe",
            "invoice_number": "SAL-1007",
            "sale_date": "2026-08-05",
            "total_amount": "5600.00"
        }
    ]
}
```

---

# 3. Recent Purchases

### GET

```
/dashboard/recent-purchases
```

### Description

Returns the latest five purchase transactions.

### Response

```json
{
    "status": "success",
    "count": 5,
    "data": [
        {
            "id": 4,
            "supplier": "Dell India",
            "invoice_number": "PUR-1004",
            "purchase_date": "2026-08-05",
            "total_amount": "12400.00"
        }
    ]
}
```

---

# 4. Low Stock Products

### GET

```
/dashboard/low-stock
```

### Description

Returns products whose stock is less than or equal to their reorder level.

### Response

```json
{
    "status": "success",
    "count": 2,
    "data": [
        {
            "id": 2,
            "name": "Logitech Mouse",
            "category": "Accessories",
            "stock_quantity": 3,
            "reorder_level": 5
        }
    ]
}
```

---

# Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 500  | Internal Server Error |

---

# Module Status

- ✅ Dashboard Statistics
- ✅ Recent Sales
- ✅ Recent Purchases
- ✅ Low Stock Products