import { useEffect, useState } from "react";

import {
  getProducts,
  deleteProduct,
} from "../services/productService";

import ProductToolbar from "../components/Products/ProductToolbar";
import ProductTable from "../components/Products/ProductTable";
import ProductModal from "../components/Products/ProductModal";
import ConfirmModal from "../components/Common/ConfirmModal";

const Products = () => {

  // =========================
  // State
  // =========================

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Add / Edit Modal

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Delete Modal

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // =========================
  // Fetch Products
  // =========================

  const fetchProducts = async (keyword = "") => {

    try {

      setLoading(true);

      const response = await getProducts(keyword);

      setProducts(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  // =========================
  // Delete Product
  // =========================

  const handleDelete = async () => {

    try {

      setDeleting(true);

      await deleteProduct(selectedProduct.id);

      fetchProducts(search);

      setDeleteModalOpen(false);
      setSelectedProduct(null);

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.msg ||
        "Failed to delete product."
      );

    } finally {

      setDeleting(false);

    }

  };

  // =========================
  // Search
  // =========================

  useEffect(() => {

    const timer = setTimeout(() => {

      fetchProducts(search);

    }, 400);

    return () => clearTimeout(timer);

  }, [search]);

  // =========================
  // Add Product
  // =========================

  const handleAdd = () => {

    setEditingProduct(null);

    setShowModal(true);

  };

  // =========================
  // Edit Product
  // =========================

  const handleEdit = (product) => {

    setEditingProduct(product);

    setShowModal(true);

  };

  // =========================
  // Close Modal
  // =========================

  const handleClose = () => {

    setShowModal(false);

    setEditingProduct(null);

  };

  // =========================
  // Add / Update Success
  // =========================

  const handleSuccess = () => {

    fetchProducts(search);

    handleClose();

  };

  // =========================
  // Loading
  // =========================

  if (loading) {

    return (

      <div className="flex justify-center items-center py-20">

        <h2 className="text-xl font-semibold">

          Loading Products...

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

          Products

        </h1>

        <p className="text-gray-500">

          Manage all inventory products.

        </p>

      </div>

      {/* Toolbar */}

      <ProductToolbar
        search={search}
        setSearch={setSearch}
        onAdd={handleAdd}
      />

      {/* Table */}

      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={(product) => {

          setSelectedProduct(product);

          setDeleteModalOpen(true);

        }}
      />

      {/* Add / Edit Modal */}

      {showModal && (

        <ProductModal
          product={editingProduct}
          onClose={handleClose}
          onSuccess={handleSuccess}
        />

      )}

      {/* Delete Confirmation */}

      <ConfirmModal
        open={deleteModalOpen}
        title="Delete Product"
        message={`Are you sure you want to delete "${selectedProduct?.name}"?`}
        confirmText="Delete"
        confirmColor="red"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => {

          setDeleteModalOpen(false);

          setSelectedProduct(null);

        }}
      />

    </div>

  );

};

export default Products;