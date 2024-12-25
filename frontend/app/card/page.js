"use client";
import { useState } from "react";
import { ethers } from "ethers";
import TokenTransfer from "../TokenTransfer.json";
import useStore from "../../utils/store";
import { DiamondPlus } from "lucide-react";

const tokenAddress = "0x8257241C80A0F42C01818539A603962822D4a27D";

function App() {
  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [modal, setModal] = useState(false);
  const { formData } = useStore();

  if (!formData) {
    return <p>No data available.</p>;
  }

  const handleClick = () => {
    setModal((prevState) => !prevState);
  };

  const handleTransfer = async () => {
    if (!receiverAddress || !amount) {
      alert("Please enter a valid amount and receiver address.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        tokenAddress,
        TokenTransfer.abi,
        signer
      );

      setStatus("Transaction sent, waiting for confirmation...");

      const tx = await contract.transfer(
        receiverAddress,
        ethers.parseUnits(amount, 18)
      );

      await tx.wait();
      setStatus("Transfer successful!");
    } catch (error) {
      console.error("Error transferring tokens:", error);
      alert("Transfer failed. Please check the details and try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-blue-400">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-[350px] h-[500px] bg-white rounded-xl shadow-lg border border-gray-300 relative">
          <div className="bg-blue-600 text-white rounded-t-xl p-4">
            <div className="flex items-center justify-center space-x-2">
              <DiamondPlus />

              <div>
                <h2 className="text-lg font-bold">UniToken</h2>
                <p className="text-sm">Student Identification Card</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center mt-4">
            {formData.image ? (
              <img
                src={
                  typeof formData.image === "string"
                    ? formData.image
                    : URL.createObjectURL(formData.image) || "-"
                }
                alt=""
                className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-blue-500 shadow-md flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
          </div>

          {/* Personal Details */}
          <div className="px-4 mt-6">
            <p className="text-sm font-semibold">
              <span className="block">Name:</span> {formData.name || "N/A"}
            </p>
            <p className="text-sm font-semibold mt-2">
              <span className="block">Matric Number:</span>{" "}
              {formData.matricNumber || "N/A"}
            </p>
            <p className="text-sm font-semibold mt-2">
              <span className="block">Wallet Address:</span>
              <span className="text-xs text-gray-600">
                {formData.userAddress || "N/A"}
              </span>
            </p>
            <p className="text-sm font-semibold mt-2">
              <span className="block">Phone Number:</span>{" "}
              {formData.phoneNumber || "N/A"}
            </p>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 w-full bg-gray-100 rounded-b-xl px-4 py-2">
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
              onClick={handleClick}
            >
              Pay
            </button>
          </div>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative w-full max-w-md bg-blue-100 shadow-md rounded-lg p-6">
            {/* Close Icon */}
            <button
              className="absolute top-4 right-4 text-blue-600 hover:text-blue-800 text-lg font-bold"
              onClick={handleClick}
            >
              &times;
            </button>

            <h1 className="text-2xl font-semibold text-blue-800 mb-4 text-center">
              Token Transfer
            </h1>

            {/* Display the user's address */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-700">
                Your Address:
              </label>
              <div
                className="bg-blue-200 text-blue-800 p-2 rounded-md text-sm truncate"
                title={formData.userAddress}
              >
                {formData.userAddress || "Fetching your address..."}
              </div>
            </div>

            {/* Input for the receiver's address */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-700">
                Receiver Address:
              </label>
              <input
                type="text"
                value={receiverAddress}
                onChange={(e) => setReceiverAddress(e.target.value)}
                placeholder="Enter receiver's address"
                className="w-full border border-blue-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Input for the amount to transfer */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-blue-700">
                Amount:
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount to transfer"
                className="w-full border border-blue-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Transfer button */}
            <button
              onClick={handleTransfer}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
            >
              Transfer Tokens
            </button>

            {/* Status message */}
            {status && (
              <p
                className={`mt-4 text-center font-medium ${
                  status.includes("successful")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {status}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
