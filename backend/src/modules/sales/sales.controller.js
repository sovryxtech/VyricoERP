const pool = require("../../config/db");


// GET /sales
async function getAllSales(req, res) {
    try {
        const result = await pool.query(
            `
            SELECT
                s.id,
                c.full_name AS customer,
                s.invoice_number,
                s.sale_date,
                s.total_amount,
                s.created_at,
                s.updated_at
            FROM sales s
            JOIN customers c
                ON s.customer_id = c.id
            ORDER BY s.id;
            `
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                status: "error",
                msg: "No sales found"
            });
        }

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



// GET /sales/:id
async function getSpecificSale(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                msg: "Sale ID is required"
            });
        }

        // Sale Header
        const saleResult = await pool.query(
            `
            SELECT
                s.id,
                c.full_name AS customer,
                s.invoice_number,
                s.sale_date,
                s.total_amount,
                s.created_at,
                s.updated_at
            FROM sales s
            JOIN customers c
                ON s.customer_id = c.id
            WHERE s.id = $1;
            `,
            [id]
        );

        if (saleResult.rowCount === 0) {
            return res.status(404).json({
                status: "error",
                msg: "Sale not found"
            });
        }

        // Sale Items
        const itemsResult = await pool.query(
            `
            SELECT
                si.id,
                p.name AS product,
                si.quantity,
                si.selling_price,
                si.subtotal
            FROM sale_items si
            JOIN products p
                ON si.product_id = p.id
            WHERE si.sale_id = $1
            ORDER BY si.id;
            `,
            [id]
        );

        return res.status(200).json({
            status: "success",
            data: {
                sale: saleResult.rows[0],
                items: itemsResult.rows
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error"
        });
    }
}




// POST /sales
async function addNewSale(req, res) {
    const client = await pool.connect();

    try {
        const {
            customer_id,
            invoice_number,
            sale_date,
            items
        } = req.body;

        // Validation
        if (
            !customer_id ||
            !invoice_number ||
            !sale_date ||
            !Array.isArray(items) ||
            items.length === 0
        ) {
            return res.status(400).json({
                status: "error",
                msg: "Customer, invoice number, sale date and items are required"
            });
        }

        await client.query("BEGIN");

        // Check customer exists
        const customerResult = await client.query(
            `
            SELECT id
            FROM customers
            WHERE id = $1;
            `,
            [customer_id]
        );

        if (customerResult.rowCount === 0) {
            await client.query("ROLLBACK");

            return res.status(404).json({
                status: "error",
                msg: "Customer not found"
            });
        }

        // Create sale
        const saleResult = await client.query(
            `
            INSERT INTO sales (
                customer_id,
                invoice_number,
                sale_date,
                total_amount
            )
            VALUES ($1, $2, $3, 0)
            RETURNING id;
            `,
            [
                customer_id,
                invoice_number.trim(),
                sale_date
            ]
        );

        const saleID = saleResult.rows[0].id;
        let totalAmount = 0;

        // Process each item
        for (const item of items) {

            // Validate item
            if (
                !item.product_id ||
                item.quantity === undefined ||
                item.selling_price === undefined ||
                item.quantity <= 0 ||
                item.selling_price < 0
            ) {
                throw new Error("Invalid sale item");
            }

            // Check product exists
            const productResult = await client.query(
                `
                SELECT
                    id,
                    stock_quantity
                FROM products
                WHERE id = $1;
                `,
                [item.product_id]
            );

            if (productResult.rowCount === 0) {
                throw new Error(
                    `Product ${item.product_id} not found`
                );
            }

            // Check stock availability
            if (
                productResult.rows[0].stock_quantity < item.quantity
            ) {
                throw new Error(
                    `Insufficient stock for product ${item.product_id}`
                );
            }

            // Calculate subtotal
            const subtotal =
                Number(item.quantity) *
                Number(item.selling_price);

            totalAmount += subtotal;

            // Insert sale item
            await client.query(
                `
                INSERT INTO sale_items (
                    sale_id,
                    product_id,
                    quantity,
                    selling_price,
                    subtotal
                )
                VALUES ($1, $2, $3, $4, $5);
                `,
                [
                    saleID,
                    item.product_id,
                    item.quantity,
                    item.selling_price,
                    subtotal
                ]
            );

            // Decrease stock
            await client.query(
                `
                UPDATE products
                SET
                    stock_quantity = stock_quantity - $1,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $2;
                `,
                [
                    item.quantity,
                    item.product_id
                ]
            );
        }

        // Update sale total
        await client.query(
            `
            UPDATE sales
            SET
                total_amount = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2;
            `,
            [
                totalAmount,
                saleID
            ]
        );

        await client.query("COMMIT");

        return res.status(201).json({
            status: "success",
            msg: "Sale created successfully",
            data: {
                sale_id: saleID,
                total_amount: totalAmount,
                items_count: items.length
            }
        });

    } catch (error) {

        await client.query("ROLLBACK");

        console.error(error);

        if (error.code === "23505") {
            return res.status(409).json({
                status: "error",
                msg: "Invoice number already exists"
            });
        }

        return res.status(500).json({
            status: "error",
            msg: error.message || "Internal Server Error"
        });

    } finally {
        client.release();
    }
}



// DELETE /sales/:id
async function deleteSale(req, res) {
    const client = await pool.connect();

    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                msg: "Sale ID is required"
            });
        }

        await client.query("BEGIN");

        // Check if sale exists
        const saleResult = await client.query(
            `
            SELECT id
            FROM sales
            WHERE id = $1;
            `,
            [id]
        );

        if (saleResult.rowCount === 0) {
            await client.query("ROLLBACK");

            return res.status(404).json({
                status: "error",
                msg: "Sale not found"
            });
        }

        // Get all sale items
        const itemsResult = await client.query(
            `
            SELECT
                product_id,
                quantity
            FROM sale_items
            WHERE sale_id = $1;
            `,
            [id]
        );

        // Restore stock
        for (const item of itemsResult.rows) {
            await client.query(
                `
                UPDATE products
                SET
                    stock_quantity = stock_quantity + $1,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $2;
                `,
                [
                    item.quantity,
                    item.product_id
                ]
            );
        }

        // Delete sale items
        await client.query(
            `
            DELETE FROM sale_items
            WHERE sale_id = $1;
            `,
            [id]
        );

        // Delete sale
        await client.query(
            `
            DELETE FROM sales
            WHERE id = $1;
            `,
            [id]
        );

        await client.query("COMMIT");

        return res.status(200).json({
            status: "success",
            msg: "Sale deleted successfully"
        });

    } catch (error) {
        await client.query("ROLLBACK");

        console.error(error);

        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error"
        });

    } finally {
        client.release();
    }
}




// PATCH /sales/:id
async function updateSale(req, res) {
    const client = await pool.connect();

    try {
        const { id } = req.params;

        const {
            customer_id,
            invoice_number,
            sale_date,
            items
        } = req.body;

        if (
            !customer_id ||
            !invoice_number ||
            !sale_date ||
            !Array.isArray(items) ||
            items.length === 0
        ) {
            return res.status(400).json({
                status: "error",
                msg: "Customer, invoice number, sale date and items are required"
            });
        }

        await client.query("BEGIN");

        // Check sale exists
        const saleResult = await client.query(
            `
            SELECT id
            FROM sales
            WHERE id = $1;
            `,
            [id]
        );

        if (saleResult.rowCount === 0) {
            throw new Error("Sale not found");
        }

        // Check customer exists
        const customerResult = await client.query(
            `
            SELECT id
            FROM customers
            WHERE id = $1;
            `,
            [customer_id]
        );

        if (customerResult.rowCount === 0) {
            throw new Error("Customer not found");
        }

        // Get old sale items
        const oldItemsResult = await client.query(
            `
            SELECT
                product_id,
                quantity
            FROM sale_items
            WHERE sale_id = $1;
            `,
            [id]
        );

        // Restore old stock
        for (const item of oldItemsResult.rows) {
            await client.query(
                `
                UPDATE products
                SET
                    stock_quantity = stock_quantity + $1,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $2;
                `,
                [
                    item.quantity,
                    item.product_id
                ]
            );
        }

        // Delete old items
        await client.query(
            `
            DELETE FROM sale_items
            WHERE sale_id = $1;
            `,
            [id]
        );

        // Update sale header
        await client.query(
            `
            UPDATE sales
            SET
                customer_id = $1,
                invoice_number = $2,
                sale_date = $3,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $4;
            `,
            [
                customer_id,
                invoice_number.trim(),
                sale_date,
                id
            ]
        );

        let totalAmount = 0;

        // Insert new items
        for (const item of items) {

            if (
                !item.product_id ||
                item.quantity === undefined ||
                item.selling_price === undefined ||
                item.quantity <= 0 ||
                item.selling_price < 0
            ) {
                throw new Error("Invalid sale item");
            }

            // Check product
            const productResult = await client.query(
                `
                SELECT
                    id,
                    stock_quantity
                FROM products
                WHERE id = $1;
                `,
                [item.product_id]
            );

            if (productResult.rowCount === 0) {
                throw new Error(
                    `Product ${item.product_id} not found`
                );
            }

            // Check available stock
            if (
                productResult.rows[0].stock_quantity < item.quantity
            ) {
                throw new Error(
                    `Insufficient stock for product ${item.product_id}`
                );
            }

            const subtotal =
                Number(item.quantity) *
                Number(item.selling_price);

            totalAmount += subtotal;

            // Insert new sale item
            await client.query(
                `
                INSERT INTO sale_items (
                    sale_id,
                    product_id,
                    quantity,
                    selling_price,
                    subtotal
                )
                VALUES ($1,$2,$3,$4,$5);
                `,
                [
                    id,
                    item.product_id,
                    item.quantity,
                    item.selling_price,
                    subtotal
                ]
            );

            // Decrease stock
            await client.query(
                `
                UPDATE products
                SET
                    stock_quantity = stock_quantity - $1,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $2;
                `,
                [
                    item.quantity,
                    item.product_id
                ]
            );
        }

        // Update total
        await client.query(
            `
            UPDATE sales
            SET
                total_amount = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2;
            `,
            [
                totalAmount,
                id
            ]
        );

        await client.query("COMMIT");

        return res.status(200).json({
            status: "success",
            msg: "Sale updated successfully",
            data: {
                sale_id: Number(id),
                total_amount: totalAmount,
                items_count: items.length
            }
        });

    } catch (error) {

        await client.query("ROLLBACK");

        console.error(error);

        if (error.code === "23505") {
            return res.status(409).json({
                status: "error",
                msg: "Invoice number already exists"
            });
        }

        return res.status(500).json({
            status: "error",
            msg: error.message || "Internal Server Error"
        });

    } finally {
        client.release();
    }
}


module.exports = {
    getAllSales,
    getSpecificSale,
    addNewSale,
    deleteSale,
    updateSale
}