-- users
INSERT INTO
    users (
        name,
        username,
        email,
        password
    )
VALUES (
        'Abhishek Mehta',
        'abhishek',
        'abhishek@gmail.com',
        'hashed_password_here'
    );

INSERT INTO
    users (
        name,
        username,
        email,
        password,
        role
    )
VALUES (
        'Admin',
        'admin',
        'admin@gmail.com',
        '123',
        'admin'
    );

-- |categories| Table Insertions

INSERT INTO
    categories (name, description)
VALUES (
        'Electronics',
        'Electronic gadgets and devices'
    ),
    (
        'Groceries',
        'Daily grocery and household essentials'
    ),
    (
        'Beverages',
        'Soft drinks, juices, tea, coffee, and water'
    ),
    (
        'Stationery',
        'Office and school stationery items'
    ),
    (
        'Furniture',
        'Home and office furniture'
    ),
    (
        'Clothing',
        'Men, women, and kids clothing'
    ),
    (
        'Health & Beauty',
        'Healthcare and personal care products'
    ),
    (
        'Sports',
        'Sports equipment and accessories'
    );


-- |products| Table Insertions
INSERT INTO
    products (
        sku,
        name,
        description,
        barcode,
        category_id,
        purchase_price,
        selling_price,
        stock_quantity,
        unit,
        reorder_level,
        image_url
    )
VALUES (
        'ELEC-001',
        'Wireless Mouse',
        '2.4GHz USB Wireless Mouse',
        '890123450001',
        1,
        700,
        999,
        40,
        'pcs',
        10,
        'https://example.com/images/mouse.jpg'
    ),
    (
        'ELEC-002',
        'Mechanical Keyboard',
        'RGB Mechanical Gaming Keyboard',
        '890123450002',
        1,
        3200,
        4500,
        20,
        'pcs',
        5,
        'https://example.com/images/keyboard.jpg'
    ),
    (
        'GROC-001',
        'Basmati Rice 5kg',
        'Premium Long Grain Rice',
        '890123450003',
        2,
        650,
        850,
        60,
        'bag',
        15,
        'https://example.com/images/rice.jpg'
    ),
    (
        'BEV-001',
        'Coca Cola 1L',
        'Carbonated Soft Drink',
        '890123450004',
        3,
        70,
        95,
        120,
        'bottle',
        30,
        'https://example.com/images/coke.jpg'
    ),
    (
        'STAT-001',
        'Notebook A4',
        '200 Pages Spiral Notebook',
        '890123450005',
        4,
        80,
        120,
        100,
        'pcs',
        20,
        'https://example.com/images/notebook.jpg'
    ),
    (
        'FURN-001',
        'Office Chair',
        'Ergonomic Mesh Office Chair',
        '890123450006',
        5,
        4200,
        6200,
        12,
        'pcs',
        3,
        'https://example.com/images/chair.jpg'
    ),
    (
        'CLTH-001',
        'Cotton T-Shirt',
        '100% Cotton Round Neck T-Shirt',
        '890123450007',
        6,
        250,
        499,
        80,
        'pcs',
        20,
        'https://example.com/images/tshirt.jpg'
    ),
    (
        'HLTH-001',
        'Hand Sanitizer',
        '500ml Alcohol-Based Sanitizer',
        '890123450008',
        7,
        120,
        180,
        50,
        'bottle',
        10,
        'https://example.com/images/sanitizer.jpg'
    ),
    (
        'SPRT-001',
        'Football',
        'Professional Size 5 Football',
        '890123450009',
        8,
        700,
        1200,
        18,
        'pcs',
        5,
        'https://example.com/images/football.jpg'
    );

