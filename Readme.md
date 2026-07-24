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