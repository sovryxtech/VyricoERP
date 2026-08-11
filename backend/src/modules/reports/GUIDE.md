# Reports Module Guide

The Reports module provides aggregated business information from the existing ERP database.

Unlike transactional modules such as Products, Customers, Purchases, and Sales, the Reports module does **not** store its own data.

Instead, it reads and aggregates information from the existing database tables.

---

# 1. Purpose

The Reports module is responsible for providing summarized and analytical information about the business.

It can be used by the frontend dashboard to display information such as:

* Total products
* Low-stock products
* Out-of-stock products
* Total customers
* Total suppliers
* Number of sales
* Total sales amount
* Number of purchases
* Total purchase amount
* Current inventory value

The Reports module is therefore a **read-only analytical layer** over the existing ERP data.

---

# 2. Database Architecture

The Reports module does not require a separate database table.

It uses the existing tables:

```text
users
categories
products
suppliers
customers
purchases
purchase_items
sales
sale_items
```

The relationship can be visualized as:

```text
                    ┌─────────────┐
                    │   Products  │
                    └──────┬──────┘
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
        Purchases        Sales        Inventory
             │             │             │
             └─────────────┼─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Reports   │
                    └─────────────┘
```

Reports reads data from these modules and calculates useful business metrics.

---

# 3. Why Reports Does Not Need a Table

Reports are calculated from existing transactional data.

For example, total sales can be calculated using:

```sql
SELECT SUM(total_amount)
FROM sales;
```

There is no need to store:

```text
reports.total_sales
```

because that value can become outdated.

Instead:

```text
Sales Data
    │
    ▼
SQL Aggregation
    │
    ▼
Current Report
```

This ensures that reports always reflect the current database state.

---

# 4. Module Structure

The Reports module follows the project's existing module-based architecture.

```text
src/
└── modules/
    └── reports/
        ├── reports.controller.js
        └── reports.routes.js
```

---

# 5. Controller

The controller is located at:

```text
src/modules/reports/reports.controller.js
```

The controller currently contains:

```javascript
getReportSummary()
```

This function retrieves the business summary from PostgreSQL.

---

# 6. Routes

The routes are located at:

```text
src/modules/reports/reports.routes.js
```

The current route is:

```http
GET /summary
```

When mounted using:

```javascript
app.use("/reports", reportsRoutes);
```

the complete endpoint becomes:

```http
GET /reports/summary
```

---

# 7. Reports API

## GET /reports/summary

Returns a summary of the current business state.

### Request

```http
GET /reports/summary
```

### Example URL

```text
http://localhost:3000/reports/summary
```

---

# 8. Response

A successful response looks like:

```json
{
    "status": "success",
    "data": {
        "products": {
            "total": 15,
            "low_stock": 3,
            "out_of_stock": 1
        },
        "customers": {
            "total": 8
        },
        "suppliers": {
            "total": 5
        },
        "sales": {
            "count": 12,
            "amount": "125000.00"
        },
        "purchases": {
            "count": 9,
            "amount": "85000.00"
        },
        "inventory": {
            "value": "175000.00"
        }
    }
}
```

---

# 9. Products Report

The summary provides three product-related values.

```json
{
    "products": {
        "total": 15,
        "low_stock": 3,
        "out_of_stock": 1
    }
}
```

## Total Products

The total number of active products is calculated using:

```sql
SELECT COUNT(*)
FROM products
WHERE is_active = TRUE;
```

Inactive products are not included.

---

# 10. Low Stock Products

Low-stock products are calculated using the existing product fields:

```text
stock_quantity
reorder_level
```

The condition is:

```text
stock_quantity > 0
AND
stock_quantity <= reorder_level
```

SQL:

```sql
SELECT COUNT(*)
FROM products
WHERE is_active = TRUE
AND stock_quantity > 0
AND stock_quantity <= reorder_level;
```

For example:

```text
Stock Quantity = 7
Reorder Level = 10
```

The product is:

```text
Low Stock
```

---

# 11. Out-of-Stock Products

Out-of-stock products are products whose stock quantity is zero.

```sql
SELECT COUNT(*)
FROM products
WHERE is_active = TRUE
AND stock_quantity = 0;
```

Example:

```text
stock_quantity = 0
```

Result:

```text
Out of Stock
```

---

# 12. Customer Summary

The Reports module calculates the total number of customers.

```sql
SELECT COUNT(*)
FROM customers;
```

Response:

```json
{
    "customers": {
        "total": 8
    }
}
```

---

# 13. Supplier Summary

The total number of suppliers is calculated using:

```sql
SELECT COUNT(*)
FROM suppliers;
```

Response:

```json
{
    "suppliers": {
        "total": 5
    }
}
```

---

# 14. Sales Summary

The Reports module currently returns:

* Total number of sales
* Total sales amount

Example:

```json
{
    "sales": {
        "count": 12,
        "amount": "125000.00"
    }
}
```

## Number of Sales

```sql
SELECT COUNT(*)
FROM sales;
```

## Total Sales Amount

```sql
SELECT COALESCE(SUM(total_amount), 0)
FROM sales;
```

`COALESCE` ensures that the result is `0` instead of `NULL` when there are no sales.

---

# 15. Purchase Summary

The Reports module also returns:

* Total number of purchases
* Total purchase amount

Example:

```json
{
    "purchases": {
        "count": 9,
        "amount": "85000.00"
    }
}
```

## Number of Purchases

```sql
SELECT COUNT(*)
FROM purchases;
```

## Total Purchase Amount

```sql
SELECT COALESCE(SUM(total_amount), 0)
FROM purchases;
```

---

# 16. Inventory Summary

The inventory value is calculated using the current product stock.

Formula:

```text
Inventory Value
=
Stock Quantity × Purchase Price
```

SQL:

```sql
SELECT COALESCE(
    SUM(stock_quantity * purchase_price),
    0
)
FROM products
WHERE is_active = TRUE;
```

Example:

```text
Product A

Stock = 10
Purchase Price = ₹1,000

Value = ₹10,000
```

Another product:

```text
Product B

Stock = 5
Purchase Price = ₹2,000

Value = ₹10,000
```

Total inventory value:

```text
₹10,000 + ₹10,000
=
₹20,000
```

---

# 17. Why Purchase Price Is Used

Inventory value uses:

```text
purchase_price
```

rather than:

```text
selling_price
```

because inventory value represents the cost of the stock currently owned by the business.

Therefore:

```text
Inventory Value
=
Current Stock × Purchase Cost
```

Sales revenue is calculated separately from the Sales module.

---

# 18. SQL Query Structure

The summary endpoint uses multiple independent subqueries.

Conceptually:

```sql
SELECT

    (
        SELECT COUNT(*)
        FROM products
    ) AS total_products,

    (
        SELECT COUNT(*)
        FROM customers
    ) AS total_customers,

    (
        SELECT COUNT(*)
        FROM suppliers
    ) AS total_suppliers,

    (
        SELECT COUNT(*)
        FROM sales
    ) AS total_sales,

    (
        SELECT SUM(total_amount)
        FROM sales
    ) AS total_sales_amount,

    (
        SELECT COUNT(*)
        FROM purchases
    ) AS total_purchases,

    (
        SELECT SUM(total_amount)
        FROM purchases
    ) AS total_purchase_amount;
```

This allows the endpoint to return all summary statistics in a single database request.

---

# 19. Response Formatting

PostgreSQL returns `COUNT()` values as strings when using the Node.js PostgreSQL driver.

Therefore, the controller converts count values into JavaScript numbers.

Example:

```javascript
total: Number(data.total_products)
```

So instead of returning:

```json
{
    "total": "15"
}
```

the API returns:

```json
{
    "total": 15
}
```

Money values remain as strings because PostgreSQL `NUMERIC` values are returned as strings by `pg`.

Example:

```json
{
    "amount": "125000.00"
}
```

This avoids losing decimal precision.

---

# 20. Error Handling

If an unexpected database or server error occurs, the controller returns:

```json
{
    "status": "error",
    "msg": "Internal Server Error"
}
```

HTTP status:

```text
500 Internal Server Error
```

The actual error is logged on the backend:

```javascript
console.error(
    "Get report summary error:",
    error
);
```

This prevents internal database details from being exposed to the client.

---

# 21. Frontend Usage

The frontend dashboard can request:

```javascript
const response = await axios.get(
    "/reports/summary"
);
```

The response can then be used to populate dashboard cards.

For example:

```javascript
const {
    products,
    customers,
    suppliers,
    sales,
    purchases,
    inventory
} = response.data.data;
```

Then:

```javascript
products.total
products.low_stock
products.out_of_stock

customers.total

suppliers.total

sales.count
sales.amount

purchases.count
purchases.amount

inventory.value
```

can be displayed in the dashboard.

---

# 22. Example Dashboard

The summary endpoint can power cards such as:

```text
┌──────────────────┐
│ Total Products   │
│       15         │
└──────────────────┘

┌──────────────────┐
│ Total Customers  │
│        8         │
└──────────────────┘

┌──────────────────┐
│ Total Suppliers  │
│        5         │
└──────────────────┘

┌──────────────────┐
│ Sales Revenue    │
│   ₹125,000       │
└──────────────────┘

┌──────────────────┐
│ Purchases        │
│    ₹85,000       │
└──────────────────┘

┌──────────────────┐
│ Inventory Value  │
│   ₹175,000       │
└──────────────────┘
```

---

# 23. Current Endpoint

At the current stage, the Reports module provides:

```text
GET /reports/summary
```

It returns:

```text
Products
├── Total
├── Low Stock
└── Out of Stock

Customers
└── Total

Suppliers
└── Total

Sales
├── Count
└── Amount

Purchases
├── Count
└── Amount

Inventory
└── Value
```

---

# 24. Planned Reports

The Reports module can later be expanded with detailed reports.

## Sales Report

```http
GET /reports/sales
```

Potential information:

* Total sales
* Total revenue
* Average sale value
* Sales by date
* Top-selling products
* Sales by customer

---

## Purchase Report

```http
GET /reports/purchases
```

Potential information:

* Total purchases
* Total expenditure
* Average purchase value
* Purchases by date
* Top purchased products
* Purchases by supplier

---

## Product Report

```http
GET /reports/products
```

Potential information:

* Best-selling products
* Most purchased products
* Current stock
* Inventory value
* Low-stock products
* Out-of-stock products

---

## Customer Report

```http
GET /reports/customers
```

Potential information:

* Total customers
* Customer spending
* Number of sales
* Top customers

---

## Supplier Report

```http
GET /reports/suppliers
```

Potential information:

* Total suppliers
* Purchase count
* Purchase expenditure
* Top suppliers

---

# 25. Date Filtering

Future report endpoints can support date filtering.

Example:

```http
GET /reports/sales?from=2026-08-01&to=2026-08-31
```

The same concept can be applied to purchases:

```http
GET /reports/purchases?from=2026-08-01&to=2026-08-31
```

This allows the frontend to generate reports for specific periods.

---

# 26. Transaction Data vs Reports

The ERP architecture separates transactional operations from analytical operations.

```text
Transactional Modules
│
├── Products
├── Customers
├── Suppliers
├── Purchases
└── Sales
        │
        ▼
   Database Data
        │
        ▼
     Reports
        │
        ▼
 Dashboard / Analytics
```

The Reports module does not modify transactions.

It only reads and analyzes them.

---

# 27. Testing Checklist

## Summary

* [ ] Get report summary
* [ ] Verify total products
* [ ] Verify low-stock count
* [ ] Verify out-of-stock count
* [ ] Verify customer count
* [ ] Verify supplier count
* [ ] Verify sales count
* [ ] Verify sales amount
* [ ] Verify purchase count
* [ ] Verify purchase amount
* [ ] Verify inventory value

## Empty Database

* [ ] Sales amount returns `0`
* [ ] Purchase amount returns `0`
* [ ] Inventory value returns `0`
* [ ] Counts return `0`

## Integration

* [ ] Adding a product updates product count
* [ ] Adding a customer updates customer count
* [ ] Adding a supplier updates supplier count
* [ ] Creating a sale updates sales count
* [ ] Creating a sale updates sales amount
* [ ] Creating a purchase updates purchase count
* [ ] Creating a purchase updates purchase amount
* [ ] Purchase stock affects inventory value
* [ ] Sale stock affects inventory value

---

# 28. Module Summary

The Reports module acts as the analytical layer of the Business ERP application.

It does not maintain its own database table.

Instead, it uses SQL aggregation over the existing business data.

Current functionality:

```text
GET /reports/summary
```

provides:

```text
✓ Total Products
✓ Low Stock Products
✓ Out-of-Stock Products
✓ Total Customers
✓ Total Suppliers
✓ Total Sales
✓ Sales Amount
✓ Total Purchases
✓ Purchase Amount
✓ Inventory Value
```

The architecture is designed to be extended later with detailed sales, purchase, product, customer, supplier, and date-range reports.
