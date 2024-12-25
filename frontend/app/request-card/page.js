"use client";

import useStore from "@/utils/store";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    matricNumber: "",
    name: "",
    phoneNumber: "",
    image: null,
  });
  const { userAddress, setUserAddress, setFormData: saveFormData } = useStore();

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
  }, [setUserAddress]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveFormData({ ...formData, userAddress });
    alert("Form submitted successfully!");
    router.push("/card");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Request For Virtual Card
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label
              htmlFor="walletAddress"
              className="block text-sm font-medium text-gray-700"
            >
              Wallet Address
            </label>
            <input
              type="text"
              value={userAddress || ""}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="matricNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Matric Number
            </label>
            <input
              type="text"
              id="matricNumber"
              name="matricNumber"
              value={formData.matricNumber}
              onChange={handleInputChange}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
