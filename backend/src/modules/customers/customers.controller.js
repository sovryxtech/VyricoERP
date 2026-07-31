const pool = require("../../config/db")

// GET /customers
// GET /customers?search=abhishek
async function getAllCustomers(req, res) {
    try {
        const { search } = req.query;

        let query = `
            SELECT
                id,
                full_name,
                email,
                phone,
                address,
                created_at,
                updated_at
            FROM customers
        `;

        const values = [];

        if (search) {
            values.push(`%${search.trim()}%`);

            query += `
                WHERE
                    full_name ILIKE $1
                    OR email ILIKE $1
                    OR phone ILIKE $1
            `;
        }

        query += `
            ORDER BY id;
        `;

        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({
                status: "error",
                msg: "No customers found"
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



// GET /customers/:id
async function getSpecificCustomer(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                msg: "Customer ID is required"
            });
        }

        const result = await pool.query(
            `
            SELECT
                id,
                full_name,
                email,
                phone,
                address,
                created_at,
                updated_at
            FROM customers
            WHERE id = $1;
            `,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                status: "error",
                msg: "Customer not found"
            });
        }

        return res.status(200).json({
            status: "success",
            msg: "Customer found successfully",
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

// POST /customers
async function addCustomer(req, res) {
    try {
        const {
            full_name,
            email,
            phone,
            address
        } = req.body;

        if (!full_name) {
            return res.status(400).json({
                status: "error",
                msg: "Customer name is required"
            });
        }

        const result = await pool.query(
            `
            INSERT INTO customers (
                full_name,
                email,
                phone,
                address
            )
            VALUES ($1, $2, $3, $4)
            RETURNING *;
            `,
            [
                full_name.trim(),
                email?.trim() ?? null,
                phone?.trim() ?? null,
                address?.trim() ?? null
            ]
        );

        return res.status(201).json({
            status: "success",
            msg: "Customer added successfully",
            data: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        if (error.code === "23505") {
            return res.status(409).json({
                status: "error",
                msg: "Email or phone already exists"
            });
        }

        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error"
        });
    }
}


// DELETE /customers/:id
async function deleteCustomer(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                msg: "Customer ID is required"
            });
        }

        const result = await pool.query(
            `
            DELETE FROM customers
            WHERE id = $1
            RETURNING *;
            `,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                status: "error",
                msg: "Customer not found"
            });
        }

        return res.status(200).json({
            status: "success",
            msg: "Customer deleted successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error"
        });
    }
}


// PATCH /customers/:id
async function updateCustomer(req, res) {
    try {
        const { id } = req.params;

        const {
            full_name,
            email,
            phone,
            address
        } = req.body;

        if (!id) {
            return res.status(400).json({
                status: "error",
                msg: "Customer ID is required"
            });
        }

        if (
            full_name === undefined &&
            email === undefined &&
            phone === undefined &&
            address === undefined
        ) {
            return res.status(400).json({
                status: "error",
                msg: "Provide at least one field to update"
            });
        }

        const updates = [];
        const values = [];

        if (full_name !== undefined) {
            values.push(full_name.trim());
            updates.push(`full_name = $${values.length}`);
        }

        if (email !== undefined) {
            values.push(email?.trim() ?? null);
            updates.push(`email = $${values.length}`);
        }

        if (phone !== undefined) {
            values.push(phone?.trim() ?? null);
            updates.push(`phone = $${values.length}`);
        }

        if (address !== undefined) {
            values.push(address?.trim() ?? null);
            updates.push(`address = $${values.length}`);
        }

        updates.push(`updated_at = CURRENT_TIMESTAMP`);

        values.push(id);

        const query = `
            UPDATE customers
            SET ${updates.join(", ")}
            WHERE id = $${values.length}
            RETURNING *;
        `;

        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({
                status: "error",
                msg: "Customer not found"
            });
        }

        return res.status(200).json({
            status: "success",
            msg: "Customer updated successfully",
            data: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        if (error.code === "23505") {
            return res.status(409).json({
                status: "error",
                msg: "Email or phone already exists"
            });
        }

        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error"
        });
    }
}



module.exports = {
    getAllCustomers,
    getSpecificCustomer,
    addCustomer,
    deleteCustomer,
    updateCustomer
};