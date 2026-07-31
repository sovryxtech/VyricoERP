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
