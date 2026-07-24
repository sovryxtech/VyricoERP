```
Authentication
├── users

Inventory
├── categories
├── products
├── warehouses
├── inventory_stocks
└── stock_movements

Accounting
├── chart_of_accounts
├── journal_entries
└── journal_items

CRM
├── customers
├── leads
└── deals

Dashboard
└── SQL Views
```



```
-- Inventory

products(
    id PK,
    sku,
    name,
    description,
    barcode,
    category_id,
    purchase_price,
    selling_price,
    reorder_level,
    is_active,
    created_at,
    updated_at
);

categories(
    id, 
    name
);


warehouses(
    id,
    name,
    address,
    phone,
    manager
);



inventory_stocks(
    id,
    product_id,
    warehouse_id FK,
    quantity
);


stock_movements(
    id,
    product_id FK,
    warehouse_id FK,

    type ENUM('in' , 'out'),

    quantity,

    reference_type,

    reference_id,

    created_at
);


-- Accounting

chart_of_accounts(
    id, 
    code, 
    name, 
    account_type ENUM('asset','liability','equity','revenue','expense')
);


journal_entries(
    id, 
    entry_date, 
    description, 
    created_by
);

journal_items(
    id, 
    journal_entry_id FK, 
    account_id FK, 
    debit, 
    credit
);




-- CRM (from your doc, not in the diagram, but core to the vision)

customers(
    id, 
    name, 
    phone, 
    email, 
    status
);

leads(
    id, 
    customer_id FK, 
    source, 
    status ENUM('new','contacted','interested','negotiation','won','lost')
);

deals(
    id, 
    lead_id FK, 
    amount, 
    status
);

-- Dashboard (derive, don't hand-maintain)
-- Build these as SQL views or materialized views over the above, not manually-written tables
```




----
----
----
----




# Database Schema Reference

Quick reference for every table: what it's for, and its key columns.

## Authentication

**`users`** — Stores login accounts and roles for anyone using the system.
Key columns: `id`, `email`, `password_hash`, `role`.

## Inventory

**`categories`** — Groups products for organization and filtering (e.g. "Laptops", "Accessories").
Key columns: `id`, `name`.

**`products`** — The master list of every item the business sells or stocks.
Key columns: `id`, `sku`, `name`, `category_id` (FK), `purchase_price`, `selling_price`, `reorder_level`.

**`warehouses`** — Physical locations where stock is stored.
Key columns: `id`, `name`, `address`, `manager`.

**`inventory_stocks`** — Current quantity on hand for each product, per warehouse.
Key columns: `product_id` (FK), `warehouse_id` (FK), `quantity`.

**`stock_movements`** — Log of every stock change (received, sold, adjusted), used to compute and audit stock levels.
Key columns: `product_id` (FK), `warehouse_id` (FK), `type` (`in`/`out`), `quantity`, `reference_type`, `reference_id`.

## Accounting

**`chart_of_accounts`** — The list of financial accounts the business tracks money in (assets, revenue, expenses, etc.).
Key columns: `id`, `code`, `name`, `account_type`.

**`journal_entries`** — A single financial transaction record (e.g. "Sold 2 laptops on July 14").
Key columns: `id`, `entry_date`, `description`, `created_by` (FK → users).

**`journal_items`** — The individual debit/credit lines that make up a journal entry; must balance (total debits = total credits).
Key columns: `journal_entry_id` (FK), `account_id` (FK), `debit`, `credit`.

## CRM

**`customers`** — Contact and status info for anyone who has bought from or shown interest in the business.
Key columns: `id`, `name`, `phone`, `email`, `status`.

**`leads`** — A customer who has shown interest but hasn't purchased yet; tracks where they are in the sales pipeline.
Key columns: `id`, `customer_id` (FK), `source`, `status` (`new` → `won`/`lost`).

**`deals`** — A lead that has agreed to buy something; tracks the value and outcome of the opportunity.
Key columns: `id`, `lead_id` (FK), `amount`, `status`.

## Dashboard

**No physical tables.** All dashboard data (sales totals, low-stock alerts, top products) is computed with SQL views or materialized views over the tables above — this keeps the dashboard always in sync with real data instead of relying on manually-updated cache tables.