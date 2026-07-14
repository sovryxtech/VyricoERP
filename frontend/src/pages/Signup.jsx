import { useState } from "react";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// business logic layers
import { signup } from "../services/authService"
import { saveAuth } from "../utils/authStorage"


const Signup = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")

        if (
            !formData.name ||
            !formData.username ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("Please fill all fields")
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords donot match")
            return;
        }


        try {
            setLoading(true)


            const response = await signup({
                name: formData.name,
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            const token = response.token;
            const user = response.user;
            saveAuth({ token, user })
            // console.log(response)
            // saveAuth({})

            navigate("/dashboard")
        } catch (err) {
            setError(
                err.response?.data?.msg || "Somewhting went wrong. Try again"
            )
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white w-full max-w-md rounded-xl shadow-lg p-8"
            >
                <h1 className="text-3xl font-bold text-center mb-2">
                    Create Account
                </h1>

                <p className="text-center text-gray-500 mb-6">
                    Sign up to continue
                </p>

                {error && (
                    <div
                        className="mb-4 rounded bg-red-100 text-red-700 px-3 py-2"
                    >
                        {error}
                    </div>
                )}
                <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            name: e.target.value,
                        })
                    }
                    className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            username: e.target.value,
                        })
                    }
                    className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            email: e.target.value,
                        })
                    }
                    className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />

                <div className="relative mb-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                        className="w-full border border-gray-300 rounded-md p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword((prev) => !prev)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? (
                            <FaEyeSlash size={18} />
                        ) : (
                            <FaEye size={18} />
                        )}
                    </button>
                </div>

                <div className="relative mb-6">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                confirmPassword: e.target.value,
                            })
                        }
                        className="w-full border border-gray-300 rounded-md p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showConfirmPassword ? (
                            <FaEyeSlash size={18} />
                        ) : (
                            <FaEye size={18} />
                        )}
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-md transition duration-200"
                >
                    {/* Create Account */}
                    {loading ? "Creating Account" : "Create Account"}
                </button>

                <p className="text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-amber-500 hover:underline cursor-pointer font-medium"
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Signup;