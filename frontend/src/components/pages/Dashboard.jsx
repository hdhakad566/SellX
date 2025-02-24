import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
 

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin"); // Redirect if not logged in
    }
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">Welcome to SellX Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
