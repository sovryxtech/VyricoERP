import SaleForm from "./SaleForm";

const SaleModal = ({
    sale,
    onClose,
    onSuccess,
}) => {

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">

                {/* Header */}

                <div className="flex justify-between items-center border-b px-6 py-4">

                    <h2 className="text-2xl font-bold">

                        {sale
                            ? "Edit Sale"
                            : "New Sale"}

                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl hover:text-red-600"
                    >

                        ×

                    </button>

                </div>

                {/* Form */}

                <div className="p-6">

                    <SaleForm
                        sale={sale}
                        onSuccess={onSuccess}
                        onCancel={onClose}
                    />

                </div>

            </div>

        </div>

    );

};

export default SaleModal;