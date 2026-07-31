
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

