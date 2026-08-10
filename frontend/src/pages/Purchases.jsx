import { useEffect, useState } from "react";

import {
  getPurchases,
  deletePurchase,
} from "../services/purchaseService";

import PurchaseToolbar from "../components/Purchases/PurchaseToolbar";
import PurchaseTable from "../components/Purchases/PurchaseTable";
import PurchaseModal from "../components/Purchases/PurchaseModal";
import ConfirmModal from "../components/Common/ConfirmModal";

const Purchases = () => {

  // =========================
  // State
  // =========================

  const [purchases, setPurchases] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  // Modal

  const [showModal, setShowModal] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState(null);

  // Delete Modal

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // =========================
  // Fetch Purchases
  // =========================

  const fetchPurchases = async (keyword = "") => {

    try {

      setLoading(true);

      const response = await getPurchases(keyword);

      setPurchases(response.data);

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

      fetchPurchases(search);

    }, 400);

    return () => clearTimeout(timer);

  }, [search]);

  // =========================
  // Add Purchase
  // =========================

  const handleAdd = () => {

    setEditingPurchase(null);

    setShowModal(true);

  };

  // =========================
  // Edit Purchase
  // =========================

  const handleEdit = (purchase) => {

    setEditingPurchase(purchase);

    setShowModal(true);

  };

  // =========================
  // Close Modal
  // =========================

  const handleClose = () => {

    setShowModal(false);

    setEditingPurchase(null);

  };

  // =========================
  // Save Success
  // =========================

  const handleSuccess = () => {

    fetchPurchases(search);

    handleClose();

  };

  // =========================
  // Delete Purchase
  // =========================

  const handleDelete = async () => {

    try {

      setDeleting(true);

      await deletePurchase(selectedPurchase.id);

      fetchPurchases(search);

      setDeleteModalOpen(false);
      setSelectedPurchase(null);

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.msg ||
        "Failed to delete purchase."
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

          Loading Purchases...

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

          Purchases

        </h1>

        <p className="text-gray-500">

          Manage all purchase records.

        </p>

      </div>

      {/* Toolbar */}

      <PurchaseToolbar
        search={search}
        setSearch={setSearch}
        onAdd={handleAdd}
      />

      {/* Table */}

      <PurchaseTable
        purchases={purchases}
        onEdit={handleEdit}
        onDelete={(purchase) => {

          setSelectedPurchase(purchase);

          setDeleteModalOpen(true);

        }}
      />

      {/* Add/Edit Modal */}

      {showModal && (

        <PurchaseModal
          purchase={editingPurchase}
          onClose={handleClose}
          onSuccess={handleSuccess}
        />

      )}

      {/* Delete Confirmation */}

      <ConfirmModal
        open={deleteModalOpen}
        title="Delete Purchase"
        message={`Are you sure you want to delete purchase "${selectedPurchase?.invoice_number}"?`}
        confirmText="Delete"
        confirmColor="red"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => {

          setDeleteModalOpen(false);

          setSelectedPurchase(null);

        }}
      />

    </div>

  );

};

export default Purchases;