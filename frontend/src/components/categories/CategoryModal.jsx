import CategoryForm from "./CategoryForm";

const CategoryModal = ({
    category,
    onClose,
    onSuccess,
}) => {

    return (

        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">

                {/* Header */}

                <div className="flex justify-between items-center border-b px-6 py-5">

                    <h2 className="text-2xl font-bold">

                        {category
                            ? "Edit Category"
                            : "Add Category"}

                    </h2>

                    <button
                        onClick={onClose}
                        className="text-3xl text-gray-500 hover:text-red-500 transition"
                    >
                        ×
                    </button>

                </div>

                {/* Scrollable Form */}

                <div className="overflow-y-auto max-h-[75vh] p-6">

                    <CategoryForm
                        category={category}
                        onSuccess={onSuccess}
                        onCancel={onClose}
                    />

                </div>

            </div>

        </div>

    );

};

export default CategoryModal;