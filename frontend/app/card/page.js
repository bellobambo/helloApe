"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import TokenTransfer from "../TokenTransfer.json";

const tokenAddress = "0x8257241C80A0F42C01818539A603962822D4a27D";

function App() {
  const [userAddress, setUserAddress] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchAccount = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setUserAddress(accounts[0]);
        } catch (error) {
          console.error("Error fetching accounts:", error);
        }
      }
    };
    fetchAccount();
  }, []);

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
      // setStatus("Transfer failed. Please check the details and try again.");
      alert("Transfer failed. Please check the details and try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-blue-400">
      <div className="w-full max-w-md bg-blue-100 shadow-md rounded-lg p-6">
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
            title={userAddress}
          >
            {userAddress || "Fetching your address..."}
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
              status.includes("successful") ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
