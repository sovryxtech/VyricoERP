const StatCard = ({
    title,
    value,
    icon: Icon,
}) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm font-medium text-gray-500">
                        {title}
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-gray-900">
                        {value ?? 0}
                    </h2>

                </div>

                {Icon && (
                    <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center">

                        <Icon className="text-2xl text-blue-600" />

                    </div>
                )}

            </div>

        </div>
    );
};

export default StatCard;