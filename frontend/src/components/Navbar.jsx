import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
        SellX
      </h1>

      <div className="relative">
        {user ? (
          <button className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg">
            <img src={user.photo || "https://via.placeholder.com/50"} alt="Profile" className="w-8 h-8 rounded-full" />
            <span>{user.fullname || "User"}</span>
          </button>
        ) : (
          <button onClick={() => navigate("/signin")} className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
