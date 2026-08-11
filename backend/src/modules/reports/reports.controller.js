const pool = require("../../config/db");


// ============================================
// GET REPORT SUMMARY
// GET /reports/summary
// ============================================

async function getReportSummary(req, res) {

    try {

        const query = `
            SELECT

                -- PRODUCTS
                (
                    SELECT COUNT(*)
                    FROM products
                    WHERE is_active = TRUE
                ) AS total_products,

                (
                    SELECT COUNT(*)
                    FROM products
                    WHERE is_active = TRUE
                    AND stock_quantity > 0
                    AND stock_quantity <= reorder_level
                ) AS low_stock_products,

                (
                    SELECT COUNT(*)
                    FROM products
                    WHERE is_active = TRUE
                    AND stock_quantity = 0
                ) AS out_of_stock_products,


                -- CUSTOMERS
                (
                    SELECT COUNT(*)
                    FROM customers
                ) AS total_customers,


                -- SUPPLIERS
                (
                    SELECT COUNT(*)
                    FROM suppliers
                ) AS total_suppliers,


                -- SALES
                (
                    SELECT COUNT(*)
                    FROM sales
                ) AS total_sales,

                (
                    SELECT COALESCE(SUM(total_amount), 0)
                    FROM sales
                ) AS total_sales_amount,


                -- PURCHASES
                (
                    SELECT COUNT(*)
                    FROM purchases
                ) AS total_purchases,

                (
                    SELECT COALESCE(SUM(total_amount), 0)
                    FROM purchases
                ) AS total_purchase_amount,


                -- INVENTORY
                (
                    SELECT COALESCE(
                        SUM(stock_quantity * purchase_price),
                        0
                    )
                    FROM products
                    WHERE is_active = TRUE
                ) AS inventory_value

        `;


        const result = await pool.query(query);


        const data = result.rows[0];


        return res.status(200).json({

            status: "success",

            data: {

                products: {
                    total: Number(data.total_products),
                    low_stock: Number(data.low_stock_products),
                    out_of_stock: Number(data.out_of_stock_products)
                },

                customers: {
                    total: Number(data.total_customers)
                },

                suppliers: {
                    total: Number(data.total_suppliers)
                },

                sales: {
                    count: Number(data.total_sales),
                    amount: data.total_sales_amount
                },

                purchases: {
                    count: Number(data.total_purchases),
                    amount: data.total_purchase_amount
                },

                inventory: {
                    value: data.inventory_value
                }

            }

        });


    } catch (error) {

        console.error(
            "Get report summary error:",
            error
        );

        return res.status(500).json({

            status: "error",

            msg: "Internal Server Error"

        });

    }

}


module.exports = {

    getReportSummary

};