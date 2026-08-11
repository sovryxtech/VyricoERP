const pool = require("../../config/db");


// ============================================
// GET INVENTORY
// GET /inventory
// GET /inventory?search=dell
// GET /inventory?status=low-stock
// GET /inventory?status=out-of-stock
// ============================================

async function getInventory(req, res) {

    try {

        const { search, status } = req.query;

        const values = [];
        const conditions = [];


        // SEARCH

        if (search && search.trim() !== "") {

            values.push(`%${search.trim()}%`);

            conditions.push(`
                (
                    p.sku ILIKE $${values.length}
                    OR p.name ILIKE $${values.length}
                    OR c.name ILIKE $${values.length}
                )
            `);

        }


        // LOW STOCK

        if (status === "low-stock") {

            conditions.push(`
                p.stock_quantity > 0
                AND p.stock_quantity <= p.reorder_level
            `);

        }


        // OUT OF STOCK

        if (status === "out-of-stock") {

            conditions.push(`
                p.stock_quantity = 0
            `);

        }


        // QUERY

        let query = `
            SELECT

                p.id,
                p.sku,
                p.name,
                p.description,
                p.barcode,

                c.name AS category,

                p.purchase_price,
                p.selling_price,

                p.stock_quantity,
                p.reorder_level,

                (
                    p.stock_quantity * p.purchase_price
                ) AS stock_value,

                CASE

                    WHEN p.stock_quantity = 0
                        THEN 'Out of Stock'

                    WHEN p.stock_quantity <= p.reorder_level
                        THEN 'Low Stock'

                    ELSE
                        'In Stock'

                END AS status,

                p.unit,
                p.image_url,
                p.is_active,
                p.created_at,
                p.updated_at

            FROM products p

            JOIN categories c
                ON p.category_id = c.id
        `;


        // WHERE

        if (conditions.length > 0) {

            query += `
                WHERE ${conditions.join(" AND ")}
            `;

        }


        // ORDERING

        query += `
            ORDER BY p.name ASC
        `;


        const result = await pool.query(
            query,
            values
        );


        return res.status(200).json({

            status: "success",

            count: result.rows.length,

            data: result.rows

        });


    } catch (error) {

        console.error(
            "Get inventory error:",
            error
        );

        return res.status(500).json({

            status: "error",

            msg: "Internal Server Error"

        });

    }

}



// ============================================
// GET INVENTORY BY ID
// GET /inventory/:id
// ============================================

async function getInventoryByID(req, res) {

    try {

        const { id } = req.params;


        // VALIDATION

        if (!id) {

            return res.status(400).json({

                status: "error",

                msg: "Product ID is required"

            });

        }


        // QUERY

        const query = `
            SELECT

                p.id,
                p.sku,
                p.name,
                p.description,
                p.barcode,

                c.name AS category,

                p.purchase_price,
                p.selling_price,

                p.stock_quantity,
                p.reorder_level,

                (
                    p.stock_quantity * p.purchase_price
                ) AS stock_value,

                CASE

                    WHEN p.stock_quantity = 0
                        THEN 'Out of Stock'

                    WHEN p.stock_quantity <= p.reorder_level
                        THEN 'Low Stock'

                    ELSE
                        'In Stock'

                END AS status,

                p.unit,
                p.image_url,
                p.is_active,
                p.created_at,
                p.updated_at

            FROM products p

            JOIN categories c
                ON p.category_id = c.id

            WHERE p.id = $1
        `;


        const result = await pool.query(
            query,
            [id]
        );


        // NOT FOUND

        if (result.rowCount === 0) {

            return res.status(404).json({

                status: "error",

                msg: "Inventory item not found"

            });

        }


        // SUCCESS

        return res.status(200).json({

            status: "success",

            msg: "Inventory found successfully",

            data: result.rows[0]

        });


    } catch (error) {

        console.error(
            "Get inventory by ID error:",
            error
        );

        return res.status(500).json({

            status: "error",

            msg: "Internal Server Error"

        });

    }

}


module.exports = {

    getInventory,

    getInventoryByID

};