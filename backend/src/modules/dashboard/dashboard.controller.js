const pool = require("../../config/db");

// GET /dashboard/stats
async function getDashboardStats(req, res) {
    try {
        const [
            products,
            categories,
            suppliers,
            customers,
            purchases,
            sales,
            lowStock,
        ] = await Promise.all([
            pool.query(`SELECT COUNT(*) AS count FROM products;`),

            pool.query(`SELECT COUNT(*) AS count FROM categories;`),

            pool.query(`SELECT COUNT(*) AS count FROM suppliers;`),

            pool.query(`SELECT COUNT(*) AS count FROM customers;`),

            pool.query(`SELECT COUNT(*) AS count FROM purchases;`),

            pool.query(`SELECT COUNT(*) AS count FROM sales;`),

            pool.query(`
                SELECT COUNT(*) AS count
                FROM products
                WHERE stock_quantity <= reorder_level;
            `),
        ]);

        return res.status(200).json({
            status: "success",
            data: {
                products: Number(products.rows[0].count),
                categories: Number(categories.rows[0].count),
                suppliers: Number(suppliers.rows[0].count),
                customers: Number(customers.rows[0].count),
                purchases: Number(purchases.rows[0].count),
                sales: Number(sales.rows[0].count),
                low_stock: Number(lowStock.rows[0].count),
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
}


// GET /dashboard/recent-sales
async function getRecentSales(req, res) {
    try {
        const result = await pool.query(`
            SELECT
                s.id,
                c.full_name AS customer,
                s.invoice_number,
                s.sale_date,
                s.total_amount
            FROM sales s
            JOIN customers c
                ON s.customer_id = c.id
            ORDER BY s.sale_date DESC
            LIMIT 5;
        `);

        return res.status(200).json({
            status: "success",
            count: result.rowCount,
            data: result.rows
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error"
        });
    }
}



// GET /dashboard/recent-purchases
async function getRecentPurchases(req, res) {
    try {

        const result = await pool.query(`
            SELECT
                p.id,
                s.company_name AS supplier,
                p.invoice_number,
                p.purchase_date,
                p.total_amount
            FROM purchases p
            JOIN suppliers s
                ON p.supplier_id = s.id
            ORDER BY p.purchase_date DESC
            LIMIT 5;
        `);

        return res.status(200).json({
            status: "success",
            count: result.rowCount,
            data: result.rows
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error"
        });

    }
}


// GET /dashboard/low-stock
async function getLowStockProducts(req, res) {
    try {

        const result = await pool.query(`
            SELECT
                p.id,
                p.name,
                c.name AS category,
                p.stock_quantity,
                p.reorder_level
            FROM products p
            JOIN categories c
                ON p.category_id = c.id
            WHERE p.stock_quantity <= p.reorder_level
            ORDER BY p.stock_quantity ASC;
        `);

        return res.status(200).json({
            status: "success",
            count: result.rowCount,
            data: result.rows
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error"
        });

    }
}



module.exports = {
    getDashboardStats,
    getRecentSales,
    getRecentPurchases,
    getLowStockProducts
};