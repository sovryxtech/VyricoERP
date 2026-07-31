
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
