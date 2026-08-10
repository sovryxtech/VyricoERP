import {
    deleteCategory,
} from "../../services/categoryService";

const CategoryRow = ({
    category,
    onEdit,
    onDelete,
}) => {



    return (

        <tr className="border-b hover:bg-gray-50 transition">

            {/* ID */}

            <td className="p-4">
                {category.id}
            </td>

            {/* Name */}

            <td className="p-4 font-semibold">
                {category.name}
            </td>

            {/* Description */}

            <td className="p-4 text-gray-600">
                {category.description || "-"}
            </td>

            {/* Actions */}

            <td className="p-4">

                <button
                    onClick={() => onEdit(category)}
                    className="mr-3 text-blue-600 hover:text-blue-800 font-medium"
                >
                    Edit
                </button>

                {/* <button
                    onClick={handleDelete}
                    className="text-red-600 hover:text-red-800 font-medium"
                >
                    Delete
                </button> */}

                <button
                    onClick={() => onDelete(category)}
                    className="text-red-600 hover:text-red-800 font-medium"

                > Delete</button>

            </td>

        </tr>

    );

};

export default CategoryRow;