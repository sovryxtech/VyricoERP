import { useEffect, useMemo, useState } from "react";

import {
    createSale,
    updateSale,
} from "../../services/saleService";

import { getCustomers } from "../../services/customerService";
import { getProducts } from "../../services/productService";

import SaleItemsTable from "./SaleItemsTable";

const SaleForm = ({
    sale,
    onSuccess,
    onCancel,
}) => {

    // =====================================
    // Loading
    // =====================================

    const [loading, setLoading] = useState(false);

    // =====================================
    // Dropdown Data
    // =====================================

    const [customers, setCustomers] = useState([]);

    const [products, setProducts] = useState([]);

    // =====================================
    // Form
    // =====================================

    const [form, setForm] = useState({

        customer_id: "",

        invoice_number: "",

        sale_date: new Date()
            .toISOString()
            .split("T")[0],

    });

    // =====================================
    // Sale Items
    // =====================================

    const [items, setItems] = useState([
        {
            product_id: "",
            quantity: 1,
            selling_price: 0,
        },
    ]);

    // =====================================
    // Fetch Customers
    // =====================================

    const fetchCustomers = async () => {

        try {

            const response = await getCustomers();

            setCustomers(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    // =====================================
    // Fetch Products
    // =====================================

    const fetchProducts = async () => {

        try {

            const response = await getProducts();

            setProducts(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    // =====================================
    // Initial Load
    // =====================================

    useEffect(() => {

        fetchCustomers();

        fetchProducts();

    }, []);

    // =====================================
    // Edit Mode
    // =====================================

    useEffect(() => {

        if (!sale) return;

        setForm({

            customer_id: sale.customer_id || "",

            invoice_number: sale.invoice_number || "",

            sale_date:
                sale.sale_date?.split("T")[0] || "",

        });

        if (sale.items?.length) {

            setItems(

                sale.items.map(item => ({

                    product_id: item.product_id,

                    quantity: item.quantity,

                    selling_price: item.selling_price,

                }))

            );

        }

    }, [sale]);

    // =====================================
    // Handle Form Change
    // =====================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm(prev => ({

            ...prev,

            [name]: value,

        }));

    };

    // =====================================
    // Add Item
    // =====================================

    const addItem = () => {

        setItems(prev => [

            ...prev,

            {

                product_id: "",

                quantity: 1,

                selling_price: 0,

            },

        ]);

    };

    // =====================================
    // Remove Item
    // =====================================

    const removeItem = (index) => {

        setItems(prev =>
            prev.filter((_, i) => i !== index)
        );

    };

    // =====================================
    // Update Item
    // =====================================

    const handleItemChange = (
        index,
        field,
        value
    ) => {

        const updated = [...items];

        updated[index][field] = value;

        // Auto-fill selling price
        if (field === "product_id") {

            const product = products.find(

                p => Number(p.id) === Number(value)

            );

            if (product) {

                updated[index].selling_price =
                    Number(product.selling_price);

            }

        }

        setItems(updated);

    };

    // =====================================
    // Totals
    // =====================================

    const subtotal = useMemo(() => {

        return items.reduce(

            (sum, item) =>

                sum +

                Number(item.quantity || 0) *

                Number(item.selling_price || 0),

            0

        );

    }, [items]);

    const grandTotal = subtotal;
    // =====================================
    // Submit
    // =====================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const payload = {

                customer_id: Number(form.customer_id),

                invoice_number: form.invoice_number,

                sale_date: form.sale_date,

                items: items.map(item => ({

                    product_id: Number(item.product_id),

                    quantity: Number(item.quantity),

                    selling_price: Number(item.selling_price),

                })),

            };

            if (sale) {

                await updateSale(
                    sale.id,
                    payload
                );

            } else {

                await createSale(payload);

            }

            onSuccess();

        } catch (error) {

            console.error(error);

            alert(

                error.response?.data?.msg ||

                "Failed to save sale."

            );

        } finally {

            setLoading(false);

        }

    };

    // =====================================
    // UI
    // =====================================

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-8"
        >

            {/* ========================= */}

            {/* Sale Information */}

            {/* ========================= */}

            <div>

                <h3 className="text-lg font-semibold border-b pb-3 mb-6">

                    Sale Information

                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Customer */}

                    <div>

                        <label className="block mb-2 font-medium">

                            Customer

                        </label>

                        <select
                            name="customer_id"
                            value={form.customer_id}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                            required
                        >

                            <option value="">

                                Select Customer

                            </option>

                            {customers.map(customer => (

                                <option
                                    key={customer.id}
                                    value={customer.id}
                                >

                                    {customer.full_name}

                                </option>

                            ))}

                        </select>

                    </div>

                    {/* Invoice */}

                    <div>

                        <label className="block mb-2 font-medium">

                            Invoice Number

                        </label>

                        <input
                            type="text"
                            name="invoice_number"
                            value={form.invoice_number}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                            placeholder="SAL-1001"
                            required
                        />

                    </div>

                    {/* Date */}

                    <div>

                        <label className="block mb-2 font-medium">

                            Sale Date

                        </label>

                        <input
                            type="date"
                            name="sale_date"
                            value={form.sale_date}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                            required
                        />

                    </div>

                </div>

            </div>

            {/* ========================= */}

            {/* Sale Items */}

            {/* ========================= */}

            <SaleItemsTable
                items={items}
                products={products}
                handleItemChange={handleItemChange}
                addItem={addItem}
                removeItem={removeItem}
            />

            {/* ===================================== */}

            {/* Summary */}

            {/* ===================================== */}

            <div className="flex justify-end">

                <div className="w-full md:w-80 bg-gray-50 rounded-lg border p-6">

                    <div className="flex justify-between mb-3">

                        <span className="font-medium">

                            Subtotal

                        </span>

                        <span>

                            ₹ {subtotal.toFixed(2)}

                        </span>

                    </div>

                    <hr className="my-3" />

                    <div className="flex justify-between text-lg font-bold">

                        <span>

                            Grand Total

                        </span>

                        <span className="text-green-600">

                            ₹ {grandTotal.toFixed(2)}

                        </span>

                    </div>

                </div>

            </div>

            {/* ===================================== */}

            {/* Buttons */}

            {/* ===================================== */}

            <div className="flex justify-end gap-4 pt-4 border-t">

                <button
                    type="button"
                    onClick={onCancel}
                    className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                >

                    Cancel

                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                >

                    {loading
                        ? "Saving..."
                        : sale
                            ? "Update Sale"
                            : "Create Sale"}

                </button>

            </div>

        </form>

    );

};

export default SaleForm;