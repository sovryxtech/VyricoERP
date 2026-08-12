const SummaryCard = ({
    title,
    value,
    description,
    icon,
    valuePrefix = "",
    valueSuffix = "",
}) => {

    return (

        <div className="bg-white border rounded-xl p-5 shadow-sm">

            <div className="flex items-start justify-between">

                {/* TEXT */}

                <div>

                    <p className="text-sm font-medium text-gray-500">
                        {title}
                    </p>

                    <div className="mt-2 flex items-baseline gap-1">

                        {valuePrefix && (
                            <span className="text-lg font-semibold text-gray-700">
                                {valuePrefix}
                            </span>
                        )}

                        <p className="text-2xl font-bold text-gray-800">
                            {value ?? 0}
                        </p>

                        {valueSuffix && (
                            <span className="text-sm text-gray-500">
                                {valueSuffix}
                            </span>
                        )}

                    </div>

                    {description && (

                        <p className="mt-1 text-xs text-gray-500">
                            {description}
                        </p>

                    )}

                </div>


                {/* ICON */}

                {icon && (

                    <div className="
                        w-10
                        h-10
                        rounded-lg
                        bg-blue-50
                        text-blue-600
                        flex
                        items-center
                        justify-center
                    ">

                        {icon}

                    </div>

                )}

            </div>

        </div>

    );

};


export default SummaryCard;