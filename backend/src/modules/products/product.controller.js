const pool = require("../../config/db")


// GET /products
async function getAllProducts(req, res) {
    try {
        const { search, category_id } = req.query;

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
                p.unit,
                p.reorder_level,
                p.image_url,
                p.is_active,
                p.created_at,
                p.updated_at
            FROM products p
            JOIN categories c
                ON p.category_id = c.id
        `;

        const conditions = [];
        const values = [];

        // Search by product name, SKU or barcode
        if (search) {
            values.push(`%${search.trim()}%`);

            conditions.push(`
                (
                    p.name ILIKE $${values.length}
                    OR p.sku ILIKE $${values.length}
                    OR p.barcode ILIKE $${values.length}
                )
            `);
        }

        // Filter by category ID
        if (category_id) {
            values.push(category_id);

            conditions.push(`
                p.category_id = $${values.length}
            `);
        }

        // Add WHERE clause if needed
        if (conditions.length > 0) {
            query += `
                WHERE
                ${conditions.join(" AND ")}
            `;
        }

        query += `
            ORDER BY p.id;
        `;

        const result = await pool.query(query, values);

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

async function getSpecificProduct(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                msg: "Valid id is required"
            });
        }

        const result = await pool.query(
            `
            SELECT
                p.id,
                p.sku,
                p.name,
                p.description,
                p.barcode,
                c.name AS category,
                p.purchase_price,
                p.selling_price,
                p.unit,
                p.stock_quantity,
                p.reorder_level,
                p.image_url,
                p.is_active,
                p.created_at,
                p.updated_at
            FROM products p JOIN categories c
            ON p.category_id = c.id
            WHERE p.id=$1
            `,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                status: "error",
                msg: "Product not found"
            })
        }

        return res.status(200).json({
            status: "success",
            msg: "Product found successfully",
            data: result.rows[0]
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error"
        });
    }
}

async function addProduct(req, res) {
    try {
        const {
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
        } = req.body;

        // Validate required fields
        if (
            !sku ||
            !name ||
            category_id === undefined ||
            purchase_price === undefined ||
            selling_price === undefined
        ) {
            return res.status(400).json({
                status: "error",
                msg: "SKU, Name, Category, Purchase Price and Selling Price are required"
            });
        }

        // Check category exists
        const checkCategory = await pool.query(
            `
            SELECT id
            FROM categories
            WHERE id = $1;
            `,
            [category_id]
        );

        if (checkCategory.rowCount === 0) {
            return res.status(404).json({
                status: "error",
                msg: "Category not found"
            });
        }

        // Insert product
        const result = await pool.query(
            `
            INSERT INTO products (
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
                $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11
            )
            RETURNING *;
            `,
            [
                sku.trim(),
                name.trim(),
                description?.trim() ?? null,
                barcode?.trim() ?? null,
                category_id,
                purchase_price,
                selling_price,
                stock_quantity ?? 0,
                unit ?? "pcs",
                reorder_level ?? 10,
                image_url ?? null
            ]
        );

        return res.status(201).json({
            status: "success",
            msg: "Product added successfully",
            data: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        // Handle duplicate SKU or Barcode
        if (error.code === "23505") {
            return res.status(409).json({
                status: "error",
                msg: "SKU or Barcode already exists"
            });
        }

        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error"
        });
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                status: "error",
                msg: "Product ID is required"
            })
        };

        const result = await pool.query(
            `
            DELETE FROM products
            WHERE id = $1
            RETURNING *;
            `,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                status: "error",
                msg: "Product not found"
            });
        };


        return res.status(200).json({
            status: "success",
            msg: "Product deleted successfully"
        });
    } catch (error) {

        console.error(error);

        if (error.code === "23503") {
            return res.status(400).json({
                status: "error",
                msg: "Cannot delete this product because it has sales or purchase records."
            });
        }

        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error"
        });
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params;

        const {
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
            image_url,
            is_active
        } = req.body;

        if (!id) {
            return res.status(400).json({
                status: "error",
                msg: "Product ID is required"
            });
        }

        const updates = [];
        const values = [];

        if (sku !== undefined) {
            values.push(sku.trim());
            updates.push(`sku = $${values.length}`);
        }

        if (name !== undefined) {
            values.push(name.trim());
            updates.push(`name = $${values.length}`);
        }

        if (description !== undefined) {
            values.push(description?.trim() ?? null);
            updates.push(`description = $${values.length}`);
        }

        if (barcode !== undefined) {
            values.push(barcode?.trim() ?? null);
            updates.push(`barcode = $${values.length}`);
        }

        if (category_id !== undefined) {
            values.push(category_id);
            updates.push(`category_id = $${values.length}`);
        }

        if (purchase_price !== undefined) {
            values.push(purchase_price);
            updates.push(`purchase_price = $${values.length}`);
        }

        if (selling_price !== undefined) {
            values.push(selling_price);
            updates.push(`selling_price = $${values.length}`);
        }

        if (stock_quantity !== undefined) {
            values.push(stock_quantity);
            updates.push(`stock_quantity = $${values.length}`);
        }

        if (unit !== undefined) {
            values.push(unit.trim());
            updates.push(`unit = $${values.length}`);
        }

        if (reorder_level !== undefined) {
            values.push(reorder_level);
            updates.push(`reorder_level = $${values.length}`);
        }

        if (image_url !== undefined) {
            values.push(image_url);
            updates.push(`image_url = $${values.length}`);
        }

        if (is_active !== undefined) {
            values.push(is_active);
            updates.push(`is_active = $${values.length}`);
        }

        if (updates.length === 0) {
            return res.status(400).json({
                status: "error",
                msg: "Provide at least one field to update"
            });
        }

        updates.push(`updated_at = CURRENT_TIMESTAMP`);

        values.push(id);

        const query = `
            UPDATE products
            SET ${updates.join(", ")}
            WHERE id = $${values.length}
            RETURNING *;
        `;


        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({
                status: "error",
                msg: "Product not found"
            });
        }

        return res.status(200).json({
            status: "success",
            msg: "Product updated successfully",
            data: result.rows[0]
        });

    } catch (error) {

        if (error.code === "23505") {
            return res.status(409).json({
                status: "error",
                msg: "SKU or Barcode already exists"
            });
        }

        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error"
        });
    }
}
module.exports = {
    getAllProducts,
    getSpecificProduct,
    addProduct,
    deleteProduct,
    updateProduct
}