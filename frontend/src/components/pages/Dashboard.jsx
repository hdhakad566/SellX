import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) {
      navigate("/signin"); // Redirect if not logged in
    } else {
      axios
        .get(`http://localhost:5000/api/auth/user/${userId}`)
        .then((response) => setUser(response.data))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/signin");
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">Welcome to SellX Dashboard</h1>
        {user && (
          <>
            <p className="text-gray-700">Hello, {user.name}!</p>
            <div className="relative inline-block mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md focus:outline-none"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                Showdown
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4">
                  <div className="flex items-center space-x-3 border-b pb-2">
                    <img
                      src={`http://localhost:5000/uploads/${user.photo}`}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <button
                    className="w-full mt-3 px-4 py-2 text-center text-white bg-red-500 rounded-md hover:bg-red-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;