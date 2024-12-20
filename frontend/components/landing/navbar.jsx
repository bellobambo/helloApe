"use client";
import React, { useState } from "react";
import Link from "next/link";
import { DiamondPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export const LandingNavbar = () => {
  const router = useRouter();
  const [userAddress, setUserAddress] = useState(null);

  const connectToMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserAddress(accounts[0]);
        router.push("/card");
      } catch (error) {
        alert("Could Not Connect to Metamask!!");
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert(
        "MetaMask is not installed. Please install MetaMask and try again."
      );
    }
  };

  const displayAddress = (address) => {
    if (!address) return "Connect Wallet";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const handleButtonClick = () => {
    if (userAddress) {
      router.push("/card"); // Redirect directly if wallet is connected
    } else {
      connectToMetaMask(); // Connect to MetaMask if not already connected
    }
  };

  return (
    <div>
      <div className="w-[90%] mx-auto flex justify-between items-center py-3.5">
        <Link
          href=""
          className="text-2xl outline-none font-semibold flex items-center gap-5"
        >
          <div>
            <DiamondPlus />
          </div>
          <div>UniToken</div>
        </Link>

        <button
          onClick={handleButtonClick}
          className="p-2 bg-blue-600 rounded-md text-white font-medium"
        >
          {displayAddress(userAddress)}
        </button>
      </div>
    </div>
  );
};
