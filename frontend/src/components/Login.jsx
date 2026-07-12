// // import { useState } from "react";
// // import { login } from "../services/authService";

// // function Login() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const data = await login({
// //         email,
// //         password,
// //       });

// //       console.log(data);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="w-full max-w-md bg-white rounded-xl shadow-lg p-8"
// //       >
// //         <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
// //           Welcome Back
// //         </h1>

// //         <p className="text-center text-gray-500 mb-8">
// //           Login to your account
// //         </p>

// //         {/* Email */}
// //         <div className="mb-5">
// //           <label className="block text-sm font-medium text-gray-700 mb-2">
// //             Email
// //           </label>

// //           <input
// //             type="email"
// //             placeholder="Enter your email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
// //           />
// //         </div>

// //         {/* Password */}
// //         <div className="mb-6">
// //           <label className="block text-sm font-medium text-gray-700 mb-2">
// //             Password
// //           </label>

// //           <input
// //             type="password"
// //             placeholder="Enter your password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
// //           />
// //         </div>

// //         {/* Button */}
// //         <button
// //           type="submit"
// //           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 cursor-pointer"
// //         >
// //           Login
// //         </button>

// //         <p className="text-center text-gray-500 text-sm mt-6">
// //           Don't have an account?{" "}
// //           <span className="text-blue-600 font-medium cursor-pointer hover:underline">
// //             Sign Up
// //           </span>
// //         </p>
// //       </form>
// //     </div>
// //   );
// // }

// // export default Login;



// import { useState } from "react";
// import { useNavigate, Link } from "react-router";
// import { login } from "../services/authService";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const data = await login({ email, password });

//       if (data.status === "success") {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));
//         navigate("/dashboard"); // change to wherever you want to redirect
//       } else {
//         setError(data.msg || "Login failed. Please try again.");
//       }
//     } catch (err) {
//       setError(
//         err?.response?.data?.msg || "Something went wrong. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const handleGoogleLogin = () => {
//     // Point this to your backend's Google OAuth entry route
//     // window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
//   // };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
//         {/* Logo */}
//         {/* <div className="flex justify-center mb-5">
//           <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center">
//             <svg
//               viewBox="0 0 24 24"
//               className="w-8 h-8 text-white"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path d="M12 2a10 10 0 1 0 10 10" strokeLinecap="round" />
//               <path d="M12 6a6 6 0 1 0 6 6" strokeLinecap="round" />
//             </svg>
//           </div>
//         </div> */}

//         <h1 className="text-3xl font-bold text-center text-gray-900 mb-1">
//           Welcome back
//         </h1>
//         <p className="text-center text-gray-500 mb-7">
//           Sign In to continue
//         </p>

//         {/* Google Sign-In */}
//         <button
//           type="button"
//           // onClick={handleGoogleLogin}
//           className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-full py-3 mb-5 hover:bg-gray-50 transition cursor-pointer"
//         >
//           <svg className="w-5 h-5" viewBox="0 0 24 24">
//             <path
//               fill="#4285F4"
//               d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
//             />
//             <path
//               fill="#34A853"
//               d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
//             />
//             <path
//               fill="#FBBC05"
//               d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29A11.96 11.96 0 000 12c0 1.93.46 3.76 1.29 5.38l3.98-3.09z"
//             />
//             <path
//               fill="#EA4335"
//               d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
//             />
//           </svg>
//           <span className="font-medium text-gray-700">Continue with Google</span>
//         </button>

//         {/* Divider */}
//         <div className="flex items-center gap-3 mb-5">
//           <div className="flex-1 h-px bg-gray-200" />
//           <span className="text-xs text-gray-400 font-medium">OR</span>
//           <div className="flex-1 h-px bg-gray-200" />
//         </div>

//         <form onSubmit={handleSubmit}>
//           {/* Email */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-800 mb-1.5">
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//             />
//           </div>

//           {/* Password */}
//           <div className="mb-2">
//             <div className="flex items-center justify-between mb-1.5">
//               <label className="block text-sm font-medium text-gray-800">
//                 Password
//               </label>
//               <Link
//                 to="/forgot-password"
//                 className="text-sm text-blue-600 hover:underline"
//               >
//                 Forgot password?
//               </Link>
//             </div>
//             <input
//               type="password"
//               placeholder="Your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//             />
//           </div>

//           {/* Error message */}
//           {error && (
//             <p className="text-sm text-red-600 mt-3 text-center">{error}</p>
//           )}

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full mt-5 bg-gradient-to-r from-blue-600 to-sky-400 text-white font-semibold py-3 rounded-full hover:opacity-90 transition duration-300 cursor-pointer disabled:opacity-60"
//           >
//             {loading ? "Signing In..." : "Sign In"}
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="flex items-center gap-3 my-6">
//           <div className="flex-1 h-px bg-gray-200" />
//           <span className="text-xs text-gray-400 font-medium tracking-wide">
//             NEW TO PLATFORM?
//           </span>
//           <div className="flex-1 h-px bg-gray-200" />
//         </div>

//         <Link
//           to="/signup"
//           className="block w-full text-center border border-gray-300 rounded-full py-3 font-semibold text-gray-800 hover:bg-gray-50 transition"
//         >
//           Create an Account
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Login;