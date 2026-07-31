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

INSERT INTO
    suppliers (
        company_name,
        contact_person,
        email,
        phone,
        address
    )
VALUES (
        'Dell India',
        'Rahul Sharma',
        'sales@dell.in',
        '9876543210',
        'Bengaluru, Karnataka'
    ),
    (
        'HP India',
        'Priya Singh',
        'contact@hp.in',
        '9876543211',
        'Chennai, Tamil Nadu'
    ),
    (
        'Logitech India',
        'Amit Kumar',
        'support@logitech.in',
        '9876543212',
        'Mumbai, Maharashtra'
    ),
    (
        'Samsung India',
        'Neha Verma',
        'business@samsung.in',
        '9876543213',
        'Noida, Uttar Pradesh'
    ),
    (
        'Lenovo India',
        'Vikram Patel',
        'sales@lenovo.in',
        '9876543214',
        'Bengaluru, Karnataka'
    ),
    (
        'Asus India',
        'Rohit Gupta',
        'sales@asus.in',
        '9876543215',
        'New Delhi'
    ),
    (
        'Acer India',
        'Anjali Mehta',
        'support@acer.in',
        '9876543216',
        'Hyderabad, Telangana'
    ),
    (
        'Canon India',
        'Suresh Reddy',
        'business@canon.in',
        '9876543217',
        'Gurugram, Haryana'
    );

INSERT INTO
    customers (
        full_name,
        email,
        phone,
        address
    )
VALUES (
        'Aarav Sharma',
        'aarav.sharma@example.com',
        '9876500001',
        'Bengaluru, Karnataka'
    ),
    (
        'Priya Verma',
        'priya.verma@example.com',
        '9876500002',
        'Chennai, Tamil Nadu'
    ),
    (
        'Rohan Gupta',
        'rohan.gupta@example.com',
        '9876500003',
        'Hyderabad, Telangana'
    ),
    (
        'Sneha Patel',
        'sneha.patel@example.com',
        '9876500004',
        'Mumbai, Maharashtra'
    ),
    (
        'Aditya Singh',
        'aditya.singh@example.com',
        '9876500005',
        'New Delhi'
    ),
    (
        'Neha Kapoor',
        'neha.kapoor@example.com',
        '9876500006',
        'Pune, Maharashtra'
    ),
    (
        'Vikram Mehta',
        'vikram.mehta@example.com',
        '9876500007',
        'Ahmedabad, Gujarat'
    ),
    (
        'Ananya Rao',
        'ananya.rao@example.com',
        '9876500008',
        'Kochi, Kerala'
    );

INSERT INTO
    purchases (
        supplier_id,
        invoice_number,
        purchase_date,
        total_amount
    )
VALUES (
        4,
        'PUR-1001',
        CURRENT_DATE,
        65000.00
    ),
    (
        2,
        'PUR-1002',
        CURRENT_DATE,
        32000.00
    ),
    (
        6,
        'PUR-1003',
        CURRENT_DATE,
        18500.00
    );

INSERT INTO
    purchase_items (
        purchase_id,
        product_id,
        quantity,
        purchase_price,
        subtotal
    )
VALUES
    -- purchase 1
    (7, 3, 10, 1200.00, 12000.00),
    (7, 2, 5, 3500.00, 17500.00),
    (7, 4, 20, 1775.00, 35500.00);

INSERT INTO
    sales (
        customer_id,
        invoice_number,
        sale_date,
        total_amount
    )
VALUES (
        1,
        'SAL-1001',
        '2026-08-01',
        9600.00
    ),
    (
        2,
        'SAL-1002',
        '2026-08-02',
        6500.00
    );

INSERT INTO
    sale_items (
        sale_id,
        product_id,
        quantity,
        selling_price,
        subtotal
    )
VALUES (1, 3, 4, 1500.00, 6000.00),
    (1, 2, 2, 1800.00, 3600.00),
    (2, 3, 5, 1300.00, 6500.00);