import UserProfile from "./UserProfile";

const Navbar = () => {

  return (

    <header className="bg-white shadow px-8 py-5 flex justify-between">

      <div>

        <h1 className="text-2xl font-bold">

          Welcome Back 👋

        </h1>

        <p className="text-gray-500">

          Have a productive day.

        </p>

      </div>

      <UserProfile />

    </header>

  );
};

export default Navbar;