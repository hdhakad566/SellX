import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">SellX</h1>
        <Link
          to="/signin"
          className="text-blue-600 font-semibold hover:text-blue-800 transition"
        >
          Sign In
        </Link>
      </nav>

      {/* Page Content */}
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h2 className="text-3xl font-bold text-gray-800">Welcome to SellX</h2>
        <p className="text-gray-600 mt-2">Buy, sell, and trade with ease.</p>
      </div>
    </div>
  );
};

export default HomePage;
