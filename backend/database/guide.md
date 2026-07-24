# Database Guide

This document explains the purpose of the files inside the `database/` directory and how they are used throughout the lifecycle of the project.

```text
database/
├── README.md
├── schema.sql
├── seed.sql
├── migrations/
└── backups/
```

---

# Understanding the Database Folder

The `database/` directory contains everything required to create, maintain, and restore the application's database.

Instead of sharing the actual PostgreSQL database, developers share SQL scripts that allow anyone to recreate the same database on their own machine.

---

# 1. schema.sql

## What is a Schema?

A **schema** defines the structure of a database.

It contains instructions for creating:

* Tables
* Columns
* Data Types
* Primary Keys
* Foreign Keys
* Constraints
* Default Values
* Indexes

Think of it as the **blueprint** of your database.

Just as a building blueprint defines where walls, doors, and windows should be, a database schema defines how your database should be organized.

---

## Example

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(150) UNIQUE,
    password TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'employee'
);
```

Running this file creates the table, but **does not insert any data**.

---

## When is schema.sql used?

* Setting up a project for the first time
* Creating a new database
* Sharing the project with other developers
* Recreating a local development database

---

# 2. seed.sql

## What is a Seed?

A **seed** file inserts initial or sample data into the database.

Unlike `schema.sql`, it does not create tables.

Instead, it populates existing tables with useful data.

---

## Example

```sql
INSERT INTO users
(name, username, email, password, role)
VALUES
(
    'Admin',
    'admin',
    'admin@gmail.com',
    'admin123',
    'admin'
);
```

After running this file, the `users` table contains an administrator account that can be used during development.

---

## Typical Seed Data

* Admin User
* Employee Accounts
* Categories
* Products
* Suppliers
* Customers
* Sample Inventory

---

## When is seed.sql used?

* Development
* Testing
* Demo environments
* Local setup

It should **never** contain production data.

---

# Why Keep schema.sql and seed.sql Separate?

Because they solve different problems.

| schema.sql                 | seed.sql                              |
| -------------------------- | ------------------------------------- |
| Creates database structure | Inserts sample data                   |
| Uses `CREATE TABLE`        | Uses `INSERT INTO`                    |
| Usually run once           | Can be run multiple times (carefully) |
| Required                   | Optional                              |

---

# Typical Project Setup

### Step 1

Create the database.

```sql
CREATE DATABASE business_erp;
```

---

### Step 2

Run the schema.

```bash
psql -U postgres -d business_erp -f database/schema.sql
```

Now all tables exist.

---

### Step 3

Run the seed file.

```bash
psql -U postgres -d business_erp -f database/seed.sql
```

Now the database contains sample data.

---

# 3. migrations/

## What are Migrations?

A migration is a **database version update**.

As your application grows, the database structure changes.

Instead of recreating the entire database every time, migrations record each change individually.

---

## Example

### Initial Migration

```
001_create_users.sql
```

```sql
CREATE TABLE users (...);
```

---

### Second Migration

```
002_add_avatar_url.sql
```

```sql
ALTER TABLE users
ADD COLUMN avatar_url TEXT;
```

---

### Third Migration

```
003_add_role_column.sql
```

```sql
ALTER TABLE users
ADD COLUMN role VARCHAR(20);
```

---

Each migration represents one change to the database.

---

## Why use migrations?

Without migrations:

```
Change Database

↓

Delete Database

↓

Create Database Again

↓

Lose Data
```

With migrations:

```
Database

↓

Migration 001

↓

Migration 002

↓

Migration 003

↓

Database Updated
```

Existing data remains intact.

---

## Benefits

* Database version history
* Team collaboration
* Easy rollback
* Safe production updates
* No data loss

---

# 4. backups/

## What are Backups?

A backup is a copy of your database.

If the database is accidentally deleted, corrupted, or modified incorrectly, a backup allows it to be restored.

---

## Example

Imagine executing:

```sql
DELETE FROM users;
```

or

```sql
DROP TABLE products;
```

Without a backup, recovering the data may be impossible.

With a backup:

```
backup_2026_07_14.sql
```

the database can be restored.

---

## Typical Backup Schedule

Production systems often create backups:

* Hourly
* Daily
* Weekly

depending on the application's importance.

---

# How Everything Works Together

```
Developer Clones Repository

        │
        ▼

Create Database

        │
        ▼

Run schema.sql

        │
        ▼

Database Structure Created

        │
        ▼

Run seed.sql (Optional)

        │
        ▼

Sample Data Inserted

        │
        ▼

Develop Features

        │
        ▼

Need Database Changes?

        │
        ▼

Create Migration

        │
        ▼

Database Updated Safely

        │
        ▼

Regular Backups Protect Production Data
```

---

# Folder Structure in a Production Project

```text
database/
│
├── README.md
│
├── schema.sql
│
├── seed.sql
│
├── migrations/
│   ├── 001_create_users.sql
│   ├── 002_create_products.sql
│   ├── 003_create_categories.sql
│   ├── 004_create_inventory.sql
│   ├── 005_create_sales.sql
│   └── 006_add_indexes.sql
│
└── backups/
    ├── backup_2026_07_14.sql
    └── backup_2026_07_21.sql
```

---

# Summary

| File/Folder   | Purpose                                            |
| ------------- | -------------------------------------------------- |
| `schema.sql`  | Creates the complete database structure.           |
| `seed.sql`    | Inserts sample or initial development data.        |
| `migrations/` | Stores incremental database changes over time.     |
| `backups/`    | Stores database backups for recovery.              |
| `README.md`   | Documents how to set up and maintain the database. |

---

## Best Practices

* Keep `schema.sql` updated whenever the database structure changes.
* Use `seed.sql` only for development and testing.
* Never commit production data.
* Create a new migration for every database change.
* Regularly back up production databases.
* Document all database setup steps in `README.md`.


| Purpose          | Command                                                                          |
| ---------------- | -------------------------------------------------------------------------------- |
| Create database  | `CREATE DATABASE business_erp;`                                                  |
| Create schema    | `psql -U <username> -d business_erp -f database/schema.sql`                      |
| Seed sample data | `psql -U <username> -d business_erp -f database/seed.sql`                        |
| Run a migration  | `psql -U <username> -d business_erp -f database/migrations/001_create_users.sql` |
| Create a backup  | `pg_dump -U <username> business_erp > database/backups/backup.sql`               |
| Restore a backup | `psql -U <username> -d business_erp -f database/backups/backup.sql`              |
