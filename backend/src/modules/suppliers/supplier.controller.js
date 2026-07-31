const pool = require("../../config/db")

// GET /suppliers?search=dell
// GET /suppliers
async function getAllSuppliers(req, res) {
    try {
        const { search } = req.query;

        let query = `
            SELECT
                id,
                company_name,
                contact_person,
                email,
                phone,
                address,
                created_at,
                updated_at
            FROM suppliers
        `;

        const values = [];
        if (search) {
            values.push(`%${search.trim()}%`)

            query += `
                WHERE
                    company_name ILIKE $1
                    OR contact_person ILIKE $1
                    OR email ILIKE $1
                    OR phone ILIKE $1
            `;

            query += `ORDER BY id;`
        }
        const result = await pool.query(query, values);


        if (result.rowCount === 0) {
            return res.status(400).json({
                status: "error",
                msg: "No Suppliers found"
            })
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


// GET /suppliers/:id
async function getSpecificSupplier(req, res) {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                status: "error",
                msg: "Supplier ID is required"
            })
        };

        const result = await pool.query(`
                SELECT 
                    id,
                    company_name,
                    contact_person,
                    email,
                    phone,
                    address,
                    created_at,
                    updated_at
                FROM suppliers
                WHERE id = $1
            `,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                status: "error",
                msg: "Supplier not found"
            })
        };

        return res.status(200).json({
            status: "error",
            msg: "Supplier found successfully",
            data: result.rows[0]
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error"
        })
    }
}

async function addNewSupplier(req, res) {
    try {
        const {
            company_name,
            contact_person,
            email,
            phone,
            address
        } = req.body;

        if (!company_name) {
            return res.status(400).json({
                status: "error",
                msg: "Company name is required"
            })
        };

        const result = await pool.query(
            `
            INSERT INTO suppliers (
                company_name,
                contact_person,
                email,
                phone,
                address
            )
            VALUES(
                $1, $2, $3, $4, $5
            )
            RETURNING *;
            `,
            [
                company_name.trim(),
                contact_person?.trim() ?? null,
                email?.trim() ?? null,
                phone?.trim() ?? null,
                address?.trim() ?? null
            ]
        );

        // return res.json(result)
        if (result.rowCount === 0) {
            return res.status(404).json({
                status: "error",
                msg: "something went wrong. try after few moments"
            })
        }

        return res.status(201).json({
            status: "success",
            msg: "supplier added successfully",
            data: result.rows[0]
        })

    } catch (error) {
        console.log(error);


        if (error.code == "23505") {
            return res.status(409).json({
                status: "error",
                msg: "Email or Phone already exists"
            });
        };

        return res.status(500).json({
            status: "error",
            msg: "Internal Server Erorr"
        });
    }
}

async function deleteSupplier(req, res) {
    try {
        // console.log(req)
        // return res.json(req.params)
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                msg: "Valid supplier ID is required"
            })
        };


        const result = await pool.query(
            `
            DELETE FROM suppliers
            WHERE id = $1
            RETURNING *;
            `,
            [id]
        );


        if (result.rowCount === 0) {
            return res.status(400).json({
                status: "error",
                msg: "supplier not found"
            })
        };

        return res.status(200).json({
            status: "success",
            msg: "supplier deleted successfully"
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error",
            msg: "Internal server error"
        })
    }
}


async function updateSupplier(req, res) {
    try {
        const { id } = req.params;

        const {
            company_name,
            contact_person,
            email,
            phone,
            address
        } = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                msg: "Supplier ID is required"
            })
        };

        if (
            company_name === undefined &&
            contact_person === undefined &&
            email === undefined &&
            phone === undefined &&
            address === undefined
        ) {
            return res.status(400).json({
                status: "error",
                msg: "Provide atleast one field to update"
            })
        };


        const updates = [];
        const values = [];


        if (company_name !== undefined) {
            values.push(company_name.trim());
            updates.push(`company_name = $${values.length}`)
        };

        if (contact_person !== undefined) {
            values.push(contact_person.trim());
            updates.push(`contact_person = $${values.length}`)
        };

        if (email !== undefined) {
            values.push(email.trim());
            updates.push(`email = $${values.length}`)
        }

        if (phone !== undefined) {
            values.push(phone.trim());
            updates.push(`phone = $${values.length}`)
        }

        if (address !== undefined) {
            values.push(address.trim());
            updates.push(`address = $${values.length}`)
        }


        // update timestamp
        updates.push(`updated_at = CURRENT_TIMESTAMP`);
        values.push(id);


        const query = `
            UPDATE suppliers
            SET ${updates.join(", ")}
            WHERE id = $${values.length}
            RETURNING *;
        `;

        const result = await pool.query(query, values);

        if (result.rowCount == 0) {
            return res.status(400).json({
                status: "error",
                msg: "supplier not found"
            })
        }

        return res.status(200).json({
            status: "success",
            msg: "Supplier updated successfully",
            data: result.rows[0]
        });

    } catch (error) {
        console.error(error)

        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error"
        })
    }
}
module.exports = {
    getAllSuppliers,
    getSpecificSupplier,
    addNewSupplier,
    deleteSupplier,
    updateSupplier
}