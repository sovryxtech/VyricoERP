import { useState } from "react";

import {
    createCustomer,
    updateCustomer,
} from "../../services/customerService";

const CustomerForm = ({
    customer,
    onSuccess,
    onCancel,
}) => {

    const [form, setForm] = useState({

        full_name: customer?.full_name || "",
        email: customer?.email || "",
        phone: customer?.phone || "",
        address: customer?.address || "",

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

            if (customer) {

                await updateCustomer(customer.id, form);

            } else {

                await createCustomer(form);

            }

            onSuccess();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.msg ||
                "Failed to save customer."
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

            <div>

                <h3 className="text-lg font-semibold border-b pb-3 mb-6">
                    Customer Information
                </h3>

                <div className="space-y-6">

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name
                        </label>

                        <input
                            name="full_name"
                            value={form.full_name}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
                        />

                    </div>

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
                                Phone
                            </label>

                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
                            />

                        </div>

                    </div>

                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Address
                        </label>

                        <textarea
                            rows={4}
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 resize-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
                        />

                    </div>

                </div>

            </div>

            <div className="flex justify-end gap-4 border-t pt-6">

                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg font-semibold disabled:opacity-50"
                >
                    {loading
                        ? customer
                            ? "Updating..."
                            : "Saving..."
                        : customer
                            ? "Update Customer"
                            : "Save Customer"}
                </button>

            </div>

        </form>

    );

};

export default CustomerForm;