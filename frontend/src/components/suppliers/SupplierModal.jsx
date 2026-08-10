import SupplierForm from "./SupplierForm";

const SupplierModal = ({
    supplier,
    onClose,
    onSuccess,
}) => {

    return (

        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">

                {/* Header */}

                <div className="flex items-center justify-between border-b p-5">

                    <h2 className="text-2xl font-bold">

                        {supplier
                            ? "Edit Supplier"
                            : "Add Supplier"}

                    </h2>

                    <button
                        onClick={onClose}
                        className="text-3xl leading-none text-gray-500 hover:text-red-500"
                    >
                        ×
                    </button>

                </div>

                {/* Body */}

                <div className="overflow-y-auto p-6">

                    <SupplierForm
                        supplier={supplier}
                        onSuccess={onSuccess}
                        onCancel={onClose}
                    />

                </div>

            </div>

        </div>

    );

};

export default SupplierModal;