const pool = require("../../config/db")

// GET categories/
async function getAllCategory(req, res) {
    try {
        const result = await pool.query(
            `
            SELECT 
            id,name,description
            FROM categories
            ORDER BY id;
            `
        );

        res.status(200).json({
            status: "success",
            count: result.rowCount,
            data: result.rows
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: "Internal Server Erorr, Try after few moments"
        });
    }
}

// GET categories/:id
async function getSpecificCategory(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                msg: "Category Id is required"
            })
        }

        const result = await pool.query(
            `
            SELECT 
            id, name, description
            FROM categories
            WHERE id=$1
            `,
            [id]
        )

        // return res.json(result)
        if (result.rowCount === 0) {
            return res.status(404).json({
                status: "error",
                msg: "Valid category is needed"
            })
        }

        return res.status(200).json({
            status: "success",
            msg: "Category found successfully",
            data: result.rows[0]
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error"
        })
    }
}

// POST categories/
async function addCategory(req, res) {
    try {
        // const { name, description } = req.body;
        const { name, description } = req.body;

        // name = name?.trim();
        // description = description?.trim();


        //validate
        if (!name || !description) {
            return res.status(400).json({
                status: "error",
                msg: "Name and Description are required"
            })
        }

        const result = await pool.query(
            `
            INSERT INTO categories (name,description)
            VALUES ($1 , $2)
            RETURNING id,name,description
            `,
            [name.trim(), description.trim()]
        )

        return res.status(201).json({
            status: "success",
            msg: "Category added successfully",
            data: result.rows[0]
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error."
        })
    }

}

// DELETE /categories/:id
// DELETE /categories/:id

async function deleteCategory(req, res) {
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                msg: "Category ID is required."
            });
        }

        // Check whether any products belong to this category

        const productCheck = await pool.query(
            `
            SELECT COUNT(*) AS total
            FROM products
            WHERE category_id = $1;
            `,
            [id]
        );

        const totalProducts = Number(productCheck.rows[0].total);

        if (totalProducts > 0) {
            return res.status(400).json({
                status: "error",
                msg: `Cannot delete category. ${totalProducts} product(s) are assigned to this category.`
            });
        }

        // Delete category

        const result = await pool.query(
            `
            DELETE FROM categories
            WHERE id = $1
            RETURNING *;
            `,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                status: "error",
                msg: "Category not found."
            });
        }

        return res.status(200).json({
            status: "success",
            msg: "Category deleted successfully."
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error."
        });

    }
}

// PATCH categories/:id
async function updateCategory(req, res) {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        if (!id) {
            return res.status(400).json({
                status: "error",
                msg: "Category ID is required"
            })
        };

        if (name === undefined && description === undefined) {
            return res.status(400).json({
                status: "error",
                msg: "Provide atleast one field to update"
            })
        }


        // Build query dynamically
        const updates = []
        const values = []

        if (name !== undefined) {
            values.push(name.trim());
            updates.push(`name=$${values.length}`);
        };

        if (description !== undefined) {
            values.push(description.trim());
            updates.push(`description=$${values.length}`)
        };

        values.push(id);

        const query = `
                UPDATE categories
                SET ${updates.join(", ")}
                WHERE id = $${values.length}
                RETURNING *
        `
        // UPDATE categories
        // SET name = $1, description = $2
        // WHERE id = $3
        // RETURNING *;

        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({
                status: "error",
                msg: "Category not found"
            })
        }

        return res.status(200).json({
            status: "success",
            msg: "Category updated sucessfully",
            data: result.rows[0]
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error."
        })
    }

}
module.exports = {
    getAllCategory,
    getSpecificCategory,
    addCategory,
    deleteCategory,
    updateCategory
}