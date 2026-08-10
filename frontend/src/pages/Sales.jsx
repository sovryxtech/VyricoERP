import { useEffect, useState } from "react";

import {
  getSales,
  deleteSale,
} from "../services/saleService";

import SaleToolbar from "../components/Sales/SaleToolbar";
import SaleTable from "../components/Sales/SaleTable";
import SaleModal from "../components/Sales/SaleModal";

const Sales = () => {

  // =========================
  // State
  // =========================

  const [sales, setSales] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  // Modal

  const [showModal, setShowModal] = useState(false);

  const [editingSale, setEditingSale] = useState(null);

  // =========================
  // Fetch Sales
  // =========================

  const fetchSales = async (keyword = "") => {

    try {

      setLoading(true);

      const response = await getSales(keyword);

      setSales(response.data);

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

      fetchSales(search);

    }, 400);

    return () => clearTimeout(timer);

  }, [search]);

  // =========================
  // Add Sale
  // =========================

  const handleAdd = () => {

    setEditingSale(null);

    setShowModal(true);

  };

  // =========================
  // Edit Sale
  // =========================

  const handleEdit = (sale) => {

    setEditingSale(sale);

    setShowModal(true);

  };

  // =========================
  // Delete Sale
  // =========================

  const handleDelete = async (sale) => {

    const confirmed = window.confirm(
      `Delete Invoice "${sale.invoice_number}"?`
    );

    if (!confirmed) return;

    try {

      await deleteSale(sale.id);

      fetchSales(search);

      alert("Sale deleted successfully.");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.msg ||
        "Failed to delete sale."
      );

    }

  };

  // =========================
  // Close Modal
  // =========================

  const handleClose = () => {

    setShowModal(false);

    setEditingSale(null);

  };

  // =========================
  // Success
  // =========================

  const handleSuccess = () => {

    fetchSales(search);

    handleClose();

  };

  // =========================
  // Loading
  // =========================

  if (loading) {

    return (

      <div className="text-center py-10">

        <h2 className="text-xl font-semibold">

          Loading Sales...

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

          Sales

        </h1>

        <p className="text-gray-500">

          Manage all sales transactions.

        </p>

      </div>

      {/* Toolbar */}

      <SaleToolbar
        search={search}
        setSearch={setSearch}
        onAdd={handleAdd}
      />

      {/* Table */}

      <SaleTable
        sales={sales}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}

      {showModal && (

        <SaleModal
          sale={editingSale}
          onClose={handleClose}
          onSuccess={handleSuccess}
        />

      )}

    </div>

  );

};

export default Sales;