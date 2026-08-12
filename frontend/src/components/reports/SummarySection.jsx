import SummaryCard from "./SummaryCard";


const SummarySection = ({
    summary
}) => {

    if (!summary) {
        return null;
    }


    // ============================================
    // FORMAT CURRENCY
    // ============================================

    const formatCurrency = (value) => {

        const number = Number(value || 0);

        return number.toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

    };


    return (

        <div className="space-y-6">

            {/* SECTION TITLE */}

            <div>

                <h2 className="text-lg font-semibold text-gray-800">
                    Buness Summary
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Overview of your current business performance.
                </p>

            </div>


            {/* SUMMARY CARDS */}

            <div className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-4
            ">


                {/* TOTAL PRODUCTS */}

                <SummaryCard
                    title="Total Products"
                    value={summary.products?.total}
                    description="Products in inventory"
                    icon="📦"
                />


                {/* LOW STOCK */}

                <SummaryCard
                    title="Low Stock"
                    value={summary.products?.low_stock}
                    description="Products below reorder level"
                    icon="⚠️"
                />


                {/* OUT OF STOCK */}

                <SummaryCard
                    title="Out of Stock"
                    value={summary.products?.out_of_stock}
                    description="Products with zero stock"
                    icon="🚫"
                />


                {/* CUSTOMERS */}

                <SummaryCard
                    title="Customers"
                    value={summary.customers?.total}
                    description="Registered customers"
                    icon="👥"
                />


                {/* SUPPLIERS */}

                <SummaryCard
                    title="Suppliers"
                    value={summary.suppliers?.total}
                    description="Registered suppliers"
                    icon="🏢"
                />


                {/* SALES COUNT */}

                <SummaryCard
                    title="Sales"
                    value={summary.sales?.count}
                    description="Total sales transactions"
                    icon="📈"
                />


                {/* SALES AMOUNT */}

                <SummaryCard
                    title="Sales Amount"
                    value={formatCurrency(
                        summary.sales?.amount
                    )}
                    valuePrefix="₹"
                    description="Total sales value"
                    icon="💰"
                />


                {/* PURCHASE COUNT */}

                <SummaryCard
                    title="Purchases"
                    value={summary.purchases?.count}
                    description="Total purchase transactions"
                    icon="🛒"
                />


                {/* PURCHASE AMOUNT */}

                <SummaryCard
                    title="Purchase Amount"
                    value={formatCurrency(
                        summary.purchases?.amount
                    )}
                    valuePrefix="₹"
                    description="Total purchase value"
                    icon="💵"
                />


                {/* INVENTORY VALUE */}

                <SummaryCard
                    title="Inventory Value"
                    value={formatCurrency(
                        summary.inventory?.value
                    )}
                    valuePrefix="₹"
                    description="Current stock value"
                    icon="📦"
                />

            </div>

        </div>

    );

};


export default SummarySection;