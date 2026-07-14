# Database

This directory contains the PostgreSQL database scripts required to set up the Business ERP backend.

## Folder Structure

```text
database/
├── README.md
├── schema.sql
└── seed.sql
```

## Files

### `schema.sql`

Creates the complete database schema, including:

- Tables
- Primary Keys
- Foreign Keys *(future)*
- Constraints
- Indexes *(future)*

Run this file **once** after creating the database.

---

### `seed.sql`

Inserts sample data for development and testing.

Example data may include:

- Admin user
- Employee users
- Sample products
- Categories
- Suppliers

> **Note:** This file is optional and should **never** contain production data.

---

## Database Setup

### 1. Create the Database

```sql
CREATE DATABASE business_erp;
```

---

### 2. Run the Schema

Using the default PostgreSQL user:

```bash
psql -U postgres -d business_erp -f database/schema.sql
```

Or replace `postgres` with your PostgreSQL username:

```bash
psql -U <username> -d business_erp -f database/schema.sql
```

---

### 3. Seed the Database (Optional)

Using the default PostgreSQL user:

```bash
psql -U postgres -d business_erp -f database/seed.sql
```

Or:

```bash
psql -U <username> -d business_erp -f database/seed.sql
```

---

## Notes

- Keep `schema.sql` updated whenever the database structure changes.
- Keep `seed.sql` updated with development/testing data only.
- Never commit production or sensitive data.
- After cloning the repository, always run `schema.sql` before starting the backend.

---

## Future Improvements

As the project grows, this folder may include:

```text
database/
├── README.md
├── schema.sql
├── seed.sql
├── migrations/
└── backups/
```

- **migrations/** – Database version history.
- **backups/** – Local database backup files (not committed to Git).