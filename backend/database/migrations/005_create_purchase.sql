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
