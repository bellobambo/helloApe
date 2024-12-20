"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Coins, DiamondPlus, ShieldPlus, Wallet } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
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
    <div className="card-gradient bg-blue-400">
      <LandingNavbar />
      <Hero />

      <div className="w-[90%] mx-auto py-16">
        <div className="text-center text-3xl font-medium">
          <h4>Why Choose UniToken</h4>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 pt-10">
          <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
            <div className="mb-3 text-blue-600">
              <ShieldPlus size={64} />
            </div>
            <div className="text-center text-gray-700 font-medium">
              Verify your identity for library access, labs, and more using
              cutting-edge decentralized technology.
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
            <div className="mb-3 text-blue-600">
              <Coins size={64} />
            </div>
            <div className="text-center text-gray-700 font-medium">
              Make quick and secure payments at campus shops using crypto or
              fiat through your connected wallet.
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center">
            <div className="mb-3 text-blue-600">
              <Wallet size={64} />
            </div>
            <div className="text-center text-gray-700 font-medium">
              Browse and shop from your favorite campus stores, all in one
              place.
            </div>
          </div>
        </div>
      </div>

      <footer className="py-10 bg-blue-500 text-white border-t border-blue-700/50">
        <div className="w-[90%] mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="flex items-center gap-5">
            <DiamondPlus size={32} className="text-white" />
            <span className="text-2xl font-semibold">UniToken</span>
          </div>

          <div className="mt-2 lg:mt-0 flex flex underline  gap-2 text-sm">
            <Link href="/" className="hover:text-gray-200">
              About Us
            </Link>
            <Link href="/" className="hover:text-gray-200">
              Features
            </Link>
            <Link href="/" className="hover:text-gray-200">
              Pricing
            </Link>
            <Link href="/" className="hover:text-gray-200">
              Contact
            </Link>

            <button
              onClick={handleButtonClick}
              className="p-2 bg-blue-600 rounded-md text-white font-medium"
            >
              {displayAddress(userAddress)}
            </button>
          </div>

          <div className="mt-6 lg:mt-0 text-sm text-center lg:text-right">
            <p>
              &copy; {new Date().getFullYear()} UniToken. All rights reserved.
            </p>
            <p>Designed with ❤️ for students everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Page;
