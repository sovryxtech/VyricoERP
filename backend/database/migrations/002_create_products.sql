
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
