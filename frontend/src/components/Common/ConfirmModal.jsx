const ConfirmModal = ({
    open,
    title = "Confirm Action",
    message = "Are you sure?",
    confirmText = "Delete",
    cancelText = "Cancel",
    confirmColor = "red",
    loading = false,
    onConfirm,
    onCancel,
}) => {

    if (!open) return null;

    const colors = {
        red: "bg-red-600 hover:bg-red-700",
        blue: "bg-blue-600 hover:bg-blue-700",
        green: "bg-green-600 hover:bg-green-700",
    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-md">

                {/* Header */}

                <div className="border-b px-6 py-5">

                    <h2 className="text-xl font-bold">
                        {title}
                    </h2>

                </div>

                {/* Body */}

                <div className="px-6 py-6">

                    <p className="text-gray-600">
                        {message}
                    </p>

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-3 border-t px-6 py-5">

                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="px-5 py-2 rounded-lg border hover:bg-gray-100"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className={`px-5 py-2 rounded-lg text-white ${colors[confirmColor]}`}
                    >
                        {loading ? "Please wait..." : confirmText}
                    </button>

                </div>

            </div>

        </div>

    );

};

export default ConfirmModal;