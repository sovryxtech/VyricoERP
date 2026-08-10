import { useState } from "react";

import {
    createSupplier,
    updateSupplier,
} from "../../services/supplierService";

const SupplierForm = ({
    supplier,
    onSuccess,
    onCancel,
}) => {

    const [form, setForm] = useState({

        company_name: supplier?.company_name || "",
        contact_person: supplier?.contact_person || "",
        email: supplier?.email || "",
        phone: supplier?.phone || "",
        address: supplier?.address || "",

    });

    const [loading, setLoading] = useState(false);

    // =========================
    // Handle Input Change
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    // =========================
    // Submit
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            if (supplier) {

                await updateSupplier(supplier.id, form);

            } else {

                await createSupplier(form);

            }

            onSuccess();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.msg ||
                "Failed to save supplier."
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

            {/* ================= Company ================= */}

            <div>

                <h3 className="text-lg font-semibold border-b pb-3 mb-6">
                    Company Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Company Name
                        </label>

                        <input
                            type="text"
                            name="company_name"
                            value={form.company_name}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Contact Person
                        </label>

                        <input
                            type="text"
                            name="contact_person"
                            value={form.contact_person}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
                        />

                    </div>

                </div>

            </div>

            {/* ================= Contact ================= */}

            <div>

                <h3 className="text-lg font-semibold border-b pb-3 mb-6">
                    Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
                        />

                    </div>

                </div>

            </div>

            {/* ================= Address ================= */}

            <div>

                <h3 className="text-lg font-semibold border-b pb-3 mb-6">
                    Address
                </h3>

                <textarea
                    rows={4}
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter supplier address..."
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 resize-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
                />

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
                        ? supplier
                            ? "Updating..."
                            : "Saving..."
                        : supplier
                            ? "Update Supplier"
                            : "Save Supplier"}
                </button>

            </div>

        </form>

    );

};

export default SupplierForm;