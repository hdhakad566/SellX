import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

const Navbar = () => {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState({
    address: "",
    network: "",
    balance: "",
  });

  const [showDropdown, setShowDropdown] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();
      const balance = ethers.formatEther(await provider.getBalance(address));

      setWallet({
        address,
        network: network.name.toUpperCase(),
        balance: balance.slice(0, 6) + " ETH",
      });
    } catch (error) {
      console.error("Wallet connection failed", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">SellX</h1>

      <button
        onClick={connectWallet}
        className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        {wallet.address ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}` : "Connect Wallet"}
      </button>

      <div className="relative">
        <button
          className="bg-gray-800 px-4 py-2 rounded-lg"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          Profile
        </button>
        
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg p-4" onClick={(e) => e.stopPropagation()}>
            <p><strong>Address:</strong> {wallet.address || "Not Connected"}</p>
            <p><strong>Network:</strong> {wallet.network || "N/A"}</p>
            <p><strong>Balance:</strong> {wallet.balance || "0 ETH"}</p>
            <hr className="my-2" />
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
