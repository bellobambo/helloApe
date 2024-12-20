"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Coins, DiamondPlus, ShieldPlus, Wallet } from "lucide-react";
import Link from "next/link";

const Page = () => {
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
