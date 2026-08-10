import PurchaseForm from "./PurchaseForm";

const PurchaseModal = ({
    purchase,
    onClose,
    onSuccess,
}) => {

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">

                {/* Header */}

                <div className="flex justify-between items-center border-b px-6 py-4">

                    <h2 className="text-2xl font-bold">

                        {purchase ? "Edit Purchase" : "New Purchase"}

                    </h2>

                    <button
                        onClick={onClose}
                        className="text-3xl hover:text-red-500"
                    >
                        ×
                    </button>

                </div>

                {/* Body */}

                <div className="overflow-y-auto max-h-[80vh] p-6">

                    <PurchaseForm
                        purchase={purchase}
                        onSuccess={onSuccess}
                        onCancel={onClose}
                    />

                </div>

            </div>

        </div>

    );

};

export default PurchaseModal;