// import { useState } from "react";
import { useEffect, useState } from "react";
import {
    createProduct,
    updateProduct,
} from "../../services/productService";
import { getCategories } from "../../services/categoryService";

const ProductForm = ({
    product,
    onSuccess,
    onCancel,
}) => {

    const [form, setForm] = useState({

        sku: product?.sku || "",
        name: product?.name || "",
        description: product?.description || "",
        barcode: product?.barcode || "",
        category_id: product?.category_id || "",
        purchase_price: product?.purchase_price || "",
        selling_price: product?.selling_price || "",
        stock_quantity: product?.stock_quantity || "",
        unit: product?.unit || "pcs",
        reorder_level: product?.reorder_level || "",
        image_url: product?.image_url || "",
        is_active: product?.is_active ?? true,

    });
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data);
            } catch (error) {
                console.error("Failed to load categories", error);
            }
        };

        fetchCategories();
    }, []);

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

            if (product) {

                await updateProduct(product.id, form);

            } else {

                await createProduct(form);

            }

            onSuccess();

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.msg ||
                "Failed to save product."
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

            {/* ================= Product Information ================= */}

            <div>

                <h3 className="text-lg font-semibold border-b pb-3 mb-6">
                    Product Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            SKU
                        </label>

                        <input
                            name="sku"
                            value={form.sku}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Barcode
                        </label>

                        <input
                            name="barcode"
                            value={form.barcode}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                        />
                    </div>

                </div>

                <div className="mt-6">

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Product Name
                    </label>

                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                        required
                    />

                </div>

                <div className="mt-6">

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description
                    </label>

                    <textarea
                        rows={4}
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    />

                </div>

            </div>

            {/* ================= Inventory ================= */}

            <div>

                <h3 className="text-lg font-semibold border-b pb-3 mb-6">
                    Inventory
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Category */}

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Category
                        </label>

                        <select
                            name="category_id"
                            value={form.category_id}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                            required
                        >

                            <option value="">
                                Select Category
                            </option>

                            {categories.map((category) => (

                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>

                            ))}

                        </select>

                    </div>

                    {/* Unit */}

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Unit
                        </label>

                        <select
                            name="unit"
                            value={form.unit}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                        >
                            <option value="pcs">Pieces</option>
                            <option value="kg">Kilogram</option>
                            <option value="box">Box</option>
                            <option value="packet">Packet</option>
                            <option value="bottle">Bottle</option>
                        </select>

                    </div>

                    {/* Stock */}

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Stock Quantity
                        </label>

                        <input
                            type="number"
                            name="stock_quantity"
                            value={form.stock_quantity}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                            required
                        />

                    </div>

                    {/* Reorder */}

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Reorder Level
                        </label>

                        <input
                            type="number"
                            name="reorder_level"
                            value={form.reorder_level}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                            required
                        />

                    </div>

                </div>

            </div>

            {/* ================= Pricing ================= */}

            <div>

                <h3 className="text-lg font-semibold border-b pb-3 mb-6">
                    Pricing
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Purchase Price (₹)
                        </label>

                        <input
                            type="number"
                            name="purchase_price"
                            value={form.purchase_price}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                            required
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Selling Price (₹)
                        </label>

                        <input
                            type="number"
                            name="selling_price"
                            value={form.selling_price}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                            required
                        />

                    </div>

                </div>

            </div>

            {/* ================= Additional ================= */}

            <div>

                <h3 className="text-lg font-semibold border-b pb-3 mb-6">
                    Additional Information
                </h3>

                <div className="space-y-6">

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Image URL
                        </label>

                        <input
                            name="image_url"
                            value={form.image_url}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Status
                        </label>

                        <select
                            name="is_active"
                            value={form.is_active}
                            onChange={(e) =>
                                setForm(prev => ({
                                    ...prev,
                                    is_active: e.target.value === "true",
                                }))
                            }
                            className="w-full md:w-60 rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                        >
                            <option value={true}>🟢 Active</option>
                            <option value={false}>🔴 Inactive</option>
                        </select>

                    </div>

                </div>

            </div>

            {/* ================= Buttons ================= */}

            <div className="flex justify-end gap-4 border-t pt-6">

                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg font-semibold transition disabled:opacity-50"
                >
                    {loading
                        ? product
                            ? "Updating..."
                            : "Saving..."
                        : product
                            ? "Update Product"
                            : "Save Product"}
                </button>

            </div>

        </form>
    );

};

export default ProductForm;