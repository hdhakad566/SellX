import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signin", formData);
      alert("Login successful!");
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard"); // Redirect after login
    } catch (error) {
      console.error(error);
      alert("Signin failed!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Sign In</h2>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 mb-2 border rounded"/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 mb-2 border rounded"/>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Sign In</button>
        <p className="text-center text-sm text-gray-600 mt-3">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
