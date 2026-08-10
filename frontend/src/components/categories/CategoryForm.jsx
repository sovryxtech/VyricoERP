import { useState } from "react";

import {
    createCategory,
    updateCategory,
} from "../../services/categoryService";

const CategoryForm = ({
    category,
    onSuccess,
    onCancel,
}) => {

    const [form, setForm] = useState({

        name: category?.name || "",
        description: category?.description || "",

    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            if (category) {

                await updateCategory(category.id, form);

            } else {

                await createCategory(form);

            }

            onSuccess();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.msg ||
                "Failed to save category."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-8"
        >

            {/* ================= Category Information ================= */}

            <div>

                <h3 className="text-lg font-semibold border-b pb-3 mb-6">
                    Category Information
                </h3>

                {/* Category Name */}

                <div className="mb-6">

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter category name"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                                   focus:outline-none focus:ring-2
                                   focus:ring-blue-200 focus:border-blue-500"
                        required
                    />

                </div>

                {/* Description */}

                <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description
                    </label>

                    <textarea
                        rows={5}
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Enter category description"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                                   resize-none focus:outline-none
                                   focus:ring-2 focus:ring-blue-200
                                   focus:border-blue-500"
                    />

                </div>

            </div>

            {/* ================= Buttons ================= */}

            <div className="flex justify-end gap-4 border-t pt-6">

                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2.5 rounded-lg border border-gray-300
                               hover:bg-gray-100 transition"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700
                               text-white px-8 py-2.5 rounded-lg
                               font-semibold transition
                               disabled:opacity-50"
                >
                    {loading
                        ? category
                            ? "Updating..."
                            : "Saving..."
                        : category
                            ? "Update Category"
                            : "Save Category"}
                </button>

            </div>

        </form>

    );

};

export default CategoryForm;