import { useEffect, useState } from "react";

import {
    getCategories,
    deleteCategory,
} from "../services/categoryService";

import CategoryToolbar from "../components/Categories/CategoryToolbar";
import CategoryTable from "../components/Categories/CategoryTable";
import CategoryModal from "../components/Categories/CategoryModal";
import ConfirmModal from "../components/Common/ConfirmModal";

const Categories = () => {

    // ===========================
    // State
    // ===========================

    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    // Add / Edit Modal
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    // Delete Modal
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [deleting, setDeleting] = useState(false);

    // ===========================
    // Fetch Categories
    // ===========================

    const fetchCategories = async (keyword = "") => {

        try {

            setLoading(true);

            const response = await getCategories(keyword);

            setCategories(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    // ===========================
    // Delete Category
    // ===========================

    const handleDelete = async () => {

        try {

            setDeleting(true);

            await deleteCategory(selectedCategory.id);

            fetchCategories(search);

            setDeleteModalOpen(false);
            setSelectedCategory(null);

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.msg ||
                "Failed to delete category."
            );

        } finally {

            setDeleting(false);

        }

    };

    // ===========================
    // Initial Load + Search
    // ===========================

    useEffect(() => {

        const timer = setTimeout(() => {

            fetchCategories(search);

        }, 400);

        return () => clearTimeout(timer);

    }, [search]);

    // ===========================
    // Render
    // ===========================

    return (

        <div>

            {/* Heading */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    Categories

                </h1>

                <p className="text-gray-500">

                    Manage product categories.

                </p>

            </div>

            {/* Toolbar */}

            <CategoryToolbar
                search={search}
                setSearch={setSearch}
                onAdd={() => {

                    setEditingCategory(null);

                    setShowModal(true);

                }}
            />

            {/* Loading */}

            {loading && (

                <div className="mb-4 text-gray-500">

                    Loading categories...

                </div>

            )}

            {/* Table */}

            <CategoryTable
                categories={categories}
                onEdit={(category) => {

                    setEditingCategory(category);

                    setShowModal(true);

                }}
                onDelete={(category) => {

                    setSelectedCategory(category);

                    setDeleteModalOpen(true);

                }}
            />

            {/* Add / Edit Modal */}

            {showModal && (

                <CategoryModal
                    category={editingCategory}
                    onClose={() => {

                        setShowModal(false);

                        setEditingCategory(null);

                    }}
                    onSuccess={() => {

                        fetchCategories(search);

                        setShowModal(false);

                        setEditingCategory(null);

                    }}
                />

            )}

            {/* Delete Modal */}

            <ConfirmModal
                open={deleteModalOpen}
                title="Delete Category"
                message={`Are you sure you want to delete "${selectedCategory?.name}"?`}
                confirmText="Delete"
                confirmColor="red"
                loading={deleting}
                onConfirm={handleDelete}
                onCancel={() => {

                    setDeleteModalOpen(false);

                    setSelectedCategory(null);

                }}
            />

        </div>

    );

};

export default Categories;