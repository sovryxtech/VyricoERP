// PurchaseForm.jsx

import { useEffect, useMemo, useState } from "react";

import {
    createPurchase,
    updatePurchase,
} from "../../services/purchaseService";

import { getSuppliers } from "../../services/supplierService";
import { getProducts } from "../../services/productService";

import PurchaseItemsTable from "./PurchaseItemsTable";

const PurchaseForm = ({
    purchase,
    onSuccess,
    onCancel,
}) => {

    const [loading, setLoading] = useState(false);

    const [suppliers, setSuppliers] = useState([]);

    const [products, setProducts] = useState([]);

    const [form, setForm] = useState({

        supplier_id:
            purchase?.supplier_id || "",

        invoice_number:
            purchase?.invoice_number || "",

        purchase_date:
            purchase?.purchase_date
                ? purchase.purchase_date.split("T")[0]
                : new Date()
                    .toISOString()
                    .split("T")[0],

        status:
            purchase?.status || "Pending",

        discount:
            purchase?.discount || 0,

        tax:
            purchase?.tax || 0,

    });

    const [items, setItems] = useState(

        purchase?.items || [

            {

                product_id: "",

                quantity: 1,

                purchase_price: 0,

            },

        ]

    );

    useEffect(() => {

        const fetchData = async () => {

            try {

                const supplierRes =
                    await getSuppliers();

                setSuppliers(
                    supplierRes.data
                );

                const productRes =
                    await getProducts();

                setProducts(
                    productRes.data
                );

            } catch (error) {

                console.error(error);

            }

        };

        fetchData();

    }, []);

    // =============================
    // Form
    // =============================

    const handleChange = (e) => {

        setForm(prev => ({

            ...prev,

            [e.target.name]:
                e.target.value,

        }));

    };

    // =============================
    // Items
    // =============================

    const handleItemChange = (
        index,
        field,
        value
    ) => {

        const updated = [...items];

        updated[index][field] = value;

        setItems(updated);

    };

    const addItem = () => {

        setItems(prev => [

            ...prev,

            {

                product_id: "",

                quantity: 1,

                purchase_price: 0,

            },

        ]);

    };

    const removeItem = (index) => {

        if (items.length === 1) return;

        setItems(

            items.filter(

                (_, i) => i !== index

            )

        );

    };

    // =============================
    // Calculations
    // =============================

    const subtotal = useMemo(() => {

        return items.reduce(

            (sum, item) =>

                sum +

                Number(item.quantity || 0) *

                Number(item.purchase_price || 0),

            0

        );

    }, [items]);

    const grandTotal = useMemo(() => {

        return (

            subtotal

            -

            Number(form.discount || 0)

            +

            Number(form.tax || 0)

        );

    }, [

        subtotal,

        form.discount,

        form.tax,

    ]);

    // =============================
    // Submit
    // =============================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const payload = {

                ...form,

                subtotal,

                grand_total:
                    grandTotal,

                items,

            };

            if (purchase) {

                await updatePurchase(

                    purchase.id,

                    payload

                );

            } else {

                await createPurchase(

                    payload

                );

            }

            onSuccess();

        } catch (error) {

            console.error(error);

            alert(

                error.response?.data?.msg ||

                "Failed to save purchase."

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

            {/* ================= Purchase Information ================= */}

            <div>

                <h3 className="text-lg font-semibold border-b pb-3 mb-6">

                    Purchase Information

                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>

                        <label className="block text-sm font-semibold mb-2">

                            Supplier

                        </label>

                        <select
                            name="supplier_id"
                            value={form.supplier_id}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                        >

                            <option value="">

                                Select Supplier

                            </option>

                            {suppliers.map((supplier) => (

                                <option
                                    key={supplier.id}
                                    value={supplier.id}
                                >

                                    {supplier.company_name}

                                </option>

                            ))}

                        </select>

                    </div>

                    <div>

                        <label className="block text-sm font-semibold mb-2">

                            Invoice Number

                        </label>

                        <input
                            type="text"
                            name="invoice_number"
                            value={form.invoice_number}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-semibold mb-2">

                            Purchase Date

                        </label>

                        <input
                            type="date"
                            name="purchase_date"
                            value={form.purchase_date}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-semibold mb-2">

                            Status

                        </label>

                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                        >

                            <option>Pending</option>
                            <option>Completed</option>
                            <option>Cancelled</option>

                        </select>

                    </div>

                </div>

            </div>
            {/* ================= Purchase Items ================= */}
            <PurchaseItemsTable
                items={items}
                products={products}
                handleItemChange={handleItemChange}
                addItem={addItem}
                removeItem={removeItem}
            />
            {/* ================= Purchase Summary ================= */}

            <div>

                <h3 className="text-lg font-semibold border-b pb-3 mb-6">

                    Purchase Summary

                </h3>

                <div className="max-w-lg ml-auto space-y-4 bg-gray-50 rounded-xl p-6">

                    {/* Discount */}

                    <div className="flex justify-between items-center">

                        <label className="font-medium">

                            Discount (₹)

                        </label>

                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            name="discount"
                            value={form.discount}
                            onChange={handleChange}
                            className="w-40 rounded-lg border border-gray-300 px-3 py-2 text-right"
                        />

                    </div>

                    {/* Tax */}

                    <div className="flex justify-between items-center">

                        <label className="font-medium">

                            Tax (₹)

                        </label>

                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            name="tax"
                            value={form.tax}
                            onChange={handleChange}
                            className="w-40 rounded-lg border border-gray-300 px-3 py-2 text-right"
                        />

                    </div>

                    <hr />

                    <div className="flex justify-between">

                        <span className="font-medium">

                            Subtotal

                        </span>

                        <span className="font-semibold">

                            ₹ {subtotal.toFixed(2)}

                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span className="font-medium">

                            Discount

                        </span>

                        <span className="text-red-600">

                            - ₹ {Number(form.discount).toFixed(2)}

                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span className="font-medium">

                            Tax

                        </span>

                        <span className="text-green-700">

                            + ₹ {Number(form.tax).toFixed(2)}

                        </span>

                    </div>

                    <hr />

                    <div className="flex justify-between text-2xl font-bold text-blue-700">

                        <span>

                            Grand Total

                        </span>

                        <span>

                            ₹ {grandTotal.toFixed(2)}

                        </span>

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
                        ? purchase
                            ? "Updating..."
                            : "Saving..."
                        : purchase
                            ? "Update Purchase"
                            : "Save Purchase"}

                </button>

            </div>

        </form>

    );

};

export default PurchaseForm;