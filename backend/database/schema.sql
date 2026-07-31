-- run schema
-- psql -U postgres -d business_erp -f database/schema.sql

-- seed data
-- psql -U postgres -d business_erp -f database/seed.sql


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'employee' CHECK (role IN ('admin', 'employee')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,

    sku VARCHAR(50) NOT NULL UNIQUE,

    name VARCHAR(150) NOT NULL,

    description TEXT,

    barcode VARCHAR(100) UNIQUE,

    category_id INTEGER NOT NULL
        REFERENCES categories(id)
        ON DELETE RESTRICT,

    purchase_price NUMERIC(12,2)
        NOT NULL DEFAULT 0
        CHECK (purchase_price >= 0),

    selling_price NUMERIC(12,2)
        NOT NULL DEFAULT 0
        CHECK (selling_price >= 0),

    stock_quantity INTEGER
        NOT NULL DEFAULT 0
        CHECK (stock_quantity >= 0),

    unit VARCHAR(20)
        NOT NULL DEFAULT 'pcs',

    reorder_level INTEGER
        NOT NULL DEFAULT 10
        CHECK (reorder_level >= 0),

    image_url TEXT,

    is_active BOOLEAN
        NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP
        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP
        NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,

    company_name VARCHAR(150) NOT NULL,

    contact_person VARCHAR(100),

    email VARCHAR(100) UNIQUE,

    phone VARCHAR(20) UNIQUE,

    address TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE customers(
    id SERIAL PRIMARY KEY,

    full_name VARCHAR(150) NOT NULL,

    email VARCHAR(100) UNIQUE,

    phone VARCHAR(20) UNIQUE,

    address TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,

    supplier_id INTEGER NOT NULL
        REFERENCES suppliers(id)
        ON DELETE RESTRICT,

    invoice_number VARCHAR(50) UNIQUE NOT NULL,

    purchase_date DATE NOT NULL DEFAULT CURRENT_DATE,

    total_amount NUMERIC(12,2)
        NOT NULL DEFAULT 0
        CHECK (total_amount >= 0),

    created_at TIMESTAMP
        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP
        NOT NULL DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE purchase_items (
    id SERIAL PRIMARY KEY,

    purchase_id INTEGER NOT NULL
        REFERENCES purchases(id)
        ON DELETE CASCADE,

    product_id INTEGER NOT NULL
        REFERENCES products(id)
        ON DELETE RESTRICT,

    quantity INTEGER
        NOT NULL
        CHECK (quantity > 0),

    purchase_price NUMERIC(12,2)
        NOT NULL
        CHECK (purchase_price >= 0),

    subtotal NUMERIC(12,2)
        NOT NULL
        CHECK (subtotal >= 0)
);

CREATE TABLE sales (
    id SERIAL PRIMARY KEY,

    customer_id INTEGER NOT NULL
        REFERENCES customers(id)
        ON DELETE RESTRICT,

    invoice_number VARCHAR(100)
        NOT NULL UNIQUE,

    sale_date DATE
        NOT NULL,

    total_amount NUMERIC(12,2)
        NOT NULL DEFAULT 0
        CHECK (total_amount >= 0),

    created_at TIMESTAMP
        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP
        NOT NULL DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE sale_items (
    id SERIAL PRIMARY KEY,

    sale_id INTEGER NOT NULL
        REFERENCES sales(id)
        ON DELETE CASCADE,

    product_id INTEGER NOT NULL
        REFERENCES products(id)
        ON DELETE RESTRICT,

    quantity INTEGER
        NOT NULL
        CHECK (quantity > 0),

    selling_price NUMERIC(12,2)
        NOT NULL
        CHECK (selling_price >= 0),

    subtotal NUMERIC(12,2)
        NOT NULL
        CHECK (subtotal >= 0)
);



