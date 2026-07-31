const pool = require("../../config/db");


// GET /purchases
async function getAllPurchases(req, res) {
    try {
        const result = await pool.query(
            `
            SELECT
                p.id,
                s.company_name AS supplier,
                p.invoice_number,
                p.purchase_date,
                p.total_amount,
                p.created_at,
                p.updated_at
            FROM purchases p
            JOIN suppliers s
                ON p.supplier_id = s.id
            ORDER BY p.id;
            `
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                status: "error",
                msg: "No purchases found"
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

// GET /purchases/:id
async function getSpecificPurchase(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                msg: "Purchase ID is required"
            });
        }

        // Purchase Header
        const purchaseResult = await pool.query(
            `
            SELECT
                p.id,
                s.company_name AS supplier,
                p.invoice_number,
                p.purchase_date,
                p.total_amount,
                p.created_at,
                p.updated_at
            FROM purchases p
            JOIN suppliers s
                ON p.supplier_id = s.id
            WHERE p.id = $1;
            `,
            [id]
        );

        if (purchaseResult.rowCount === 0) {
            return res.status(404).json({
                status: "error",
                msg: "Purchase not found"
            });
        }

        // Purchase Items
        const itemsResult = await pool.query(
            `
            SELECT
                pi.id,
                pr.name AS product,
                pi.quantity,
                pi.purchase_price,
                pi.subtotal
            FROM purchase_items pi
            JOIN products pr
                ON pi.product_id = pr.id
            WHERE pi.purchase_id = $1
            ORDER BY pi.id;
            `,
            [id]
        );

        return res.status(200).json({
            status: "success",
            data: {
                purchase: purchaseResult.rows[0],
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


// POST /purchases
async function addNewPurchase(req, res) {
    const client = await pool.connect();

    try {
        const {
            supplier_id,
            invoice_number,
            purchase_date,
            items
        } = req.body;

        // Validation
        if (
            !supplier_id ||
            !invoice_number ||
            !purchase_date ||
            !Array.isArray(items) ||
            items.length === 0
        ) {
            return res.status(400).json({
                status: "error",
                msg: "Supplier, invoice number, purchase date and items are required"
            });
        }

        await client.query("BEGIN");

        // Check supplier exists
        const supplierResult = await client.query(
            `
            SELECT id
            FROM suppliers
            WHERE id = $1;
            `,
            [supplier_id]
        );

        if (supplierResult.rowCount === 0) {
            await client.query("ROLLBACK");

            return res.status(404).json({
                status: "error",
                msg: "Supplier not found"
            });
        }

        // Create purchase
        const purchaseResult = await client.query(
            `
            INSERT INTO purchases (
                supplier_id,
                invoice_number,
                purchase_date,
                total_amount
            )
            VALUES ($1, $2, $3, 0)
            RETURNING id;
            `,
            [
                supplier_id,
                invoice_number.trim(),
                purchase_date
            ]
        );

        const purchaseID = purchaseResult.rows[0].id;

        let totalAmount = 0;

        // Process each item
        for (const item of items) {

            // Validate item
            if (
                !item.product_id ||
                item.quantity === undefined ||
                item.purchase_price === undefined ||
                item.quantity <= 0 ||
                item.purchase_price < 0
            ) {
                throw new Error("Invalid purchase item");
            }

            // Check product exists
            const productResult = await client.query(
                `
                SELECT id
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

            // Calculate subtotal
            const subtotal =
                Number(item.quantity) *
                Number(item.purchase_price);

            totalAmount += subtotal;

            // Insert purchase item
            await client.query(
                `
                INSERT INTO purchase_items (
                    purchase_id,
                    product_id,
                    quantity,
                    purchase_price,
                    subtotal
                )
                VALUES ($1, $2, $3, $4, $5);
                `,
                [
                    purchaseID,
                    item.product_id,
                    item.quantity,
                    item.purchase_price,
                    subtotal
                ]
            );

            // Update stock
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

        // Update purchase total
        await client.query(
            `
            UPDATE purchases
            SET
                total_amount = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2;
            `,
            [
                totalAmount,
                purchaseID
            ]
        );

        await client.query("COMMIT");

        return res.status(201).json({
            status: "success",
            msg: "Purchase created successfully",
            data: {
                purchase_id: purchaseID,
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



// DELETE /purchases/:id
async function deletePurchase(req, res) {
    const client = await pool.connect();

    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                msg: "Purchase ID is required"
            });
        }

        await client.query("BEGIN");

        // Check purchase exists
        const purchaseResult = await client.query(
            `
            SELECT id
            FROM purchases
            WHERE id = $1;
            `,
            [id]
        );

        if (purchaseResult.rowCount === 0) {
            await client.query("ROLLBACK");

            return res.status(404).json({
                status: "error",
                msg: "Purchase not found"
            });
        }

        // Get all purchase items
        const itemsResult = await client.query(
            `
            SELECT
                product_id,
                quantity
            FROM purchase_items
            WHERE purchase_id = $1;
            `,
            [id]
        );

        // Restore stock
        for (const item of itemsResult.rows) {
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

        // Delete purchase items
        await client.query(
            `
            DELETE FROM purchase_items
            WHERE purchase_id = $1;
            `,
            [id]
        );

        // Delete purchase
        await client.query(
            `
            DELETE FROM purchases
            WHERE id = $1;
            `,
            [id]
        );

        await client.query("COMMIT");

        return res.status(200).json({
            status: "success",
            msg: "Purchase deleted successfully"
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





// PATCH /purchases/:id
async function updatePurchase(req, res) {
    const client = await pool.connect();

    try {
        const { id } = req.params;

        const {
            supplier_id,
            invoice_number,
            purchase_date,
            items
        } = req.body;

        if (
            !id ||
            !supplier_id ||
            !invoice_number ||
            !purchase_date ||
            !Array.isArray(items) ||
            items.length === 0
        ) {
            return res.status(400).json({
                status: "error",
                msg: "Purchase ID, supplier, invoice number, purchase date and items are required"
            });
        }

        await client.query("BEGIN");

        // Check purchase exists
        const purchaseResult = await client.query(
            `
            SELECT id
            FROM purchases
            WHERE id = $1;
            `,
            [id]
        );

        if (purchaseResult.rowCount === 0) {
            await client.query("ROLLBACK");

            return res.status(404).json({
                status: "error",
                msg: "Purchase not found"
            });
        }

        // Check supplier exists
        const supplierResult = await client.query(
            `
            SELECT id
            FROM suppliers
            WHERE id = $1;
            `,
            [supplier_id]
        );

        if (supplierResult.rowCount === 0) {
            await client.query("ROLLBACK");

            return res.status(404).json({
                status: "error",
                msg: "Supplier not found"
            });
        }

        // Get old purchase items
        const oldItems = await client.query(
            `
            SELECT
                product_id,
                quantity
            FROM purchase_items
            WHERE purchase_id = $1;
            `,
            [id]
        );

        // Reverse old stock
        for (const item of oldItems.rows) {
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

        // Delete old purchase items
        await client.query(
            `
            DELETE FROM purchase_items
            WHERE purchase_id = $1;
            `,
            [id]
        );

        // Update purchase header
        await client.query(
            `
            UPDATE purchases
            SET
                supplier_id = $1,
                invoice_number = $2,
                purchase_date = $3,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $4;
            `,
            [
                supplier_id,
                invoice_number.trim(),
                purchase_date,
                id
            ]
        );

        let totalAmount = 0;

        // Insert new items
        for (const item of items) {

            if (
                !item.product_id ||
                item.quantity === undefined ||
                item.purchase_price === undefined ||
                item.quantity <= 0 ||
                item.purchase_price < 0
            ) {
                throw new Error("Invalid purchase item");
            }

            // Check product exists
            const productResult = await client.query(
                `
                SELECT id
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

            const subtotal =
                Number(item.quantity) *
                Number(item.purchase_price);

            totalAmount += subtotal;

            // Insert purchase item
            await client.query(
                `
                INSERT INTO purchase_items (
                    purchase_id,
                    product_id,
                    quantity,
                    purchase_price,
                    subtotal
                )
                VALUES ($1,$2,$3,$4,$5);
                `,
                [
                    id,
                    item.product_id,
                    item.quantity,
                    item.purchase_price,
                    subtotal
                ]
            );

            // Increase stock again
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

        // Update total
        await client.query(
            `
            UPDATE purchases
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
            msg: "Purchase updated successfully",
            data: {
                purchase_id: id,
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
    getAllPurchases,
    getSpecificPurchase,
    addNewPurchase,
    deletePurchase,
    updatePurchase
}

