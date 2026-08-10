import { useEffect, useState } from "react";

import {
  getSuppliers,
  deleteSupplier,
} from "../services/supplierService";

import SupplierToolbar from "../components/Suppliers/SupplierToolbar";
import SupplierTable from "../components/Suppliers/SupplierTable";
import SupplierModal from "../components/Suppliers/SupplierModal";
import ConfirmModal from "../components/Common/ConfirmModal";

const Suppliers = () => {

  // =========================
  // State
  // =========================

  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  // Add / Edit Modal

  const [showModal, setShowModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  // Delete Modal

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // =========================
  // Fetch Suppliers
  // =========================

  const fetchSuppliers = async (keyword = "") => {

    try {

      setLoading(true);

      const response = await getSuppliers(keyword);

      setSuppliers(response.data);

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

      fetchSuppliers(search);

    }, 400);

    return () => clearTimeout(timer);

  }, [search]);

  // =========================
  // Add Supplier
  // =========================

  const handleAdd = () => {

    setEditingSupplier(null);

    setShowModal(true);

  };

  // =========================
  // Edit Supplier
  // =========================

  const handleEdit = (supplier) => {

    setEditingSupplier(supplier);

    setShowModal(true);

  };

  // =========================
  // Close Modal
  // =========================

  const handleClose = () => {

    setShowModal(false);

    setEditingSupplier(null);

  };

  // =========================
  // Add / Update Success
  // =========================

  const handleSuccess = () => {

    fetchSuppliers(search);

    handleClose();

  };

  // =========================
  // Delete Supplier
  // =========================

  const handleDelete = async () => {

    try {

      setDeleting(true);

      await deleteSupplier(selectedSupplier.id);

      fetchSuppliers(search);

      setDeleteModalOpen(false);
      setSelectedSupplier(null);

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.msg ||
        "Failed to delete supplier."
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

          Loading Suppliers...

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

          Suppliers

        </h1>

        <p className="text-gray-500">

          Manage all suppliers.

        </p>

      </div>

      {/* Toolbar */}

      <SupplierToolbar
        search={search}
        setSearch={setSearch}
        onAdd={handleAdd}
      />

      {/* Table */}

      <SupplierTable
        suppliers={suppliers}
        onEdit={handleEdit}
        onDelete={(supplier) => {

          setSelectedSupplier(supplier);

          setDeleteModalOpen(true);

        }}
      />

      {/* Add / Edit Modal */}

      {showModal && (

        <SupplierModal
          supplier={editingSupplier}
          onClose={handleClose}
          onSuccess={handleSuccess}
        />

      )}

      {/* Delete Confirmation */}

      <ConfirmModal
        open={deleteModalOpen}
        title="Delete Supplier"
        message={`Are you sure you want to delete "${selectedSupplier?.company_name}"?`}
        confirmText="Delete"
        confirmColor="red"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => {

          setDeleteModalOpen(false);

          setSelectedSupplier(null);

        }}
      />

    </div>

  );

};

export default Suppliers;