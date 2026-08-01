import ProductForm from "./ProductForm";

const ProductModal = ({
    product,
    onClose,
    onSuccess,
}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-4">

                    <h2 className="text-2xl font-bold">
                        {product ? "Edit Product" : "Add Product"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-3xl leading-none hover:text-red-500"
                    >
                        ×
                    </button>

                </div>

                {/* Scrollable Body */}
                <div className="overflow-y-auto p-6">

                    <ProductForm
                        product={product}
                        onSuccess={onSuccess}
                        onCancel={onClose}
                    />

                </div>

            </div>

        </div>
    );
};

export default ProductModal;