import { useEffect, useState } from "react";

import { getProducts } from "../services/productService";
import { deleteProduct } from "../services/productService";

import ProductToolbar from "../components/Products/ProductToolbar";
import ProductTable from "../components/Products/ProductTable";
import ProductModal from "../components/Products/ProductModal";

const Products = () => {

  // =========================
  // State
  // =========================

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  // Modal

  const [showModal, setShowModal] = useState(false);

  // null = Add Product
  // product object = Edit Product

  const [editingProduct, setEditingProduct] = useState(null);

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

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      await deleteProduct(id);

      // Refresh table
      fetchProducts(search);

      alert("Product deleted successfully.");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.msg ||
        "Failed to delete product."
      );
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
  // Open Add Modal
  // =========================

  const handleAdd = () => {

    setEditingProduct(null);

    setShowModal(true);

  };

  // =========================
  // Open Edit Modal
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
  // Success (Add / Update)
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

      <div className="text-center py-10">

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
        onDelete={handleDelete}
        onEdit={(product) => {
          setEditingProduct(product);
          setShowModal(true);
        }}
      />

      {/* Modal */}

      {showModal && (

        <ProductModal
          product={editingProduct}
          onClose={handleClose}
          onSuccess={handleSuccess}
        />

      )}

    </div>

  );

};

export default Products;