import { useEffect, useState } from "react";

import {
    getCustomers,
    deleteCustomer,
} from "../services/customerService";

import CustomerToolbar from "../components/Customers/CustomerToolbar";
import CustomerTable from "../components/Customers/CustomerTable";
import CustomerModal from "../components/Customers/CustomerModal";
import ConfirmModal from "../components/Common/ConfirmModal";

const Customers = () => {

    // =========================
    // State
    // =========================

    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    // Add / Edit Modal

    const [showModal, setShowModal] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);

    // Delete Modal

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [deleting, setDeleting] = useState(false);

    // =========================
    // Fetch Customers
    // =========================

    const fetchCustomers = async (keyword = "") => {

        try {

            setLoading(true);

            const response = await getCustomers(keyword);

            setCustomers(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    // =========================
    // Search
    // =========================

    useEffect(() => {

        const timer = setTimeout(() => {

            fetchCustomers(search);

        }, 400);

        return () => clearTimeout(timer);

    }, [search]);

    // =========================
    // Add Customer
    // =========================

    const handleAdd = () => {

        setEditingCustomer(null);

        setShowModal(true);

    };

    // =========================
    // Edit Customer
    // =========================

    const handleEdit = (customer) => {

        setEditingCustomer(customer);

        setShowModal(true);

    };

    // =========================
    // Close Modal
    // =========================

    const handleClose = () => {

        setShowModal(false);

        setEditingCustomer(null);

    };

    // =========================
    // Save Success
    // =========================

    const handleSuccess = () => {

        fetchCustomers(search);

        handleClose();

    };

    // =========================
    // Delete Customer
    // =========================

    const handleDelete = async () => {

        try {

            setDeleting(true);

            await deleteCustomer(selectedCustomer.id);

            fetchCustomers(search);

            setDeleteModalOpen(false);
            setSelectedCustomer(null);

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.msg ||
                "Failed to delete customer."
            );

        } finally {

            setDeleting(false);

        }

    };

    // =========================
    // Loading
    // =========================

    if (loading) {

        return (

            <div className="flex justify-center items-center py-20">

                <h2 className="text-xl font-semibold">

                    Loading Customers...

                </h2>

            </div>

        );

    }

    // =========================
    // UI
    // =========================

    return (

        <div>

            {/* Heading */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    Customers

                </h1>

                <p className="text-gray-500">

                    Manage all customers.

                </p>

            </div>

            {/* Toolbar */}

            <CustomerToolbar
                search={search}
                setSearch={setSearch}
                onAdd={handleAdd}
            />

            {/* Table */}

            <CustomerTable
                customers={customers}
                onEdit={handleEdit}
                onDelete={(customer) => {

                    setSelectedCustomer(customer);

                    setDeleteModalOpen(true);

                }}
            />

            {/* Add / Edit Modal */}

            {showModal && (

                <CustomerModal
                    customer={editingCustomer}
                    onClose={handleClose}
                    onSuccess={handleSuccess}
                />

            )}

            {/* Delete Modal */}

            <ConfirmModal
                open={deleteModalOpen}
                title="Delete Customer"
                message={`Are you sure you want to delete "${selectedCustomer?.full_name}"?`}
                confirmText="Delete"
                confirmColor="red"
                loading={deleting}
                onConfirm={handleDelete}
                onCancel={() => {

                    setDeleteModalOpen(false);

                    setSelectedCustomer(null);

                }}
            />

        </div>

    );

};

export default Customers;