"use client";
import { useState } from "react";
import { ethers } from "ethers";
import TokenTransfer from "../TokenTransfer.json";
import useStore from "../../utils/store";
import { DiamondPlus } from "lucide-react";
import ReactCardFlip from "react-card-flip";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const tokenAddress = "0x8257241C80A0F42C01818539A603962822D4a27D";

function App() {
  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [modal, setModal] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const { formData } = useStore();

  if (!formData) {
    return <p>No data available.</p>;
  }

  const toggleModal = () => setModal((prev) => !prev);

  const toggleFlip = () => setIsFlipped((prev) => !prev);

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
      setStatus("Transfer failed.");
    }
  };

  const handleExportPDF = async () => {
    try {
      const frontCard = document.getElementById("front-card");
      const backCard = document.getElementById("back-card");

      if (!frontCard || !backCard) {
        alert("Card elements not found. Please check the IDs.");
        return;
      }

      const pdf = new jsPDF("portrait", "px", "a4");
      const canvasWidth = pdf.internal.pageSize.getWidth();
      const canvasHeight = pdf.internal.pageSize.getHeight();

      const frontCanvas = await html2canvas(frontCard, { scale: 2 });
      const frontDataURL = frontCanvas.toDataURL("image/png");
      pdf.addImage(frontDataURL, "PNG", 0, 0, canvasWidth, canvasHeight);

      pdf.addPage();
      const backCanvas = await html2canvas(backCard, { scale: 2 });
      const backDataURL = backCanvas.toDataURL("image/png");
      pdf.addImage(backDataURL, "PNG", 0, 0, canvasWidth, canvasHeight);

      pdf.save("StudentCard.pdf");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Failed to export PDF. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-blue-400">
      <div className="flex flex-col items-center space-y-6">
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          {/* Front Side */}
          <div
            className="w-[350px] h-[500px] bg-white rounded-xl shadow-lg border border-gray-300 relative"
            id="front-card"
          >
            <svg
              className="absolute inset-0 w-full h-full z-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="security-pattern"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="10" cy="10" r="5" fill="rgba(0,0,255,0.1)" />
                  <rect
                    x="5"
                    y="5"
                    width="10"
                    height="10"
                    fill="none"
                    stroke="rgba(0,255,0,0.2)"
                    strokeWidth="0.5"
                  />
                </pattern>
                <filter id="noise">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.8"
                    numOctaves="3"
                    stitchTiles="stitch"
                  />
                  <feBlend in="SourceGraphic" mode="multiply" />
                </filter>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="url(#security-pattern)"
                filter="url(#noise)"
              />
            </svg>

            <div className="bg-blue-600 text-white rounded-t-xl p-4 relative z-10">
              <div className="flex items-center justify-center space-x-2">
                <DiamondPlus />
                <div>
                  <h2 className="text-lg font-bold">UniToken</h2>
                  <p className="text-sm">Student Identification Card</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center mt-4 relative z-10">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="Student"
                  className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-blue-500 shadow-md flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>

            <div className="px-4 mt-6 relative z-10">
              <p className="text-sm font-font-normal">
                Name:
                <br />
                <span className="font-semibold">{formData.name || "N/A"}</span>
              </p>
              <p className="text-sm font-normal mt-2">
                Matric Number:
                <br />
                <span className="font-semibold">
                  {formData.matricNumber || "N/A"}
                </span>
              </p>
              <p className="text-sm font-semibold mt-2">
                Wallet Address:{" "}
                <span className="text-xs text-gray-600">
                  {formData.userAddress || "N/A"}
                </span>
              </p>
              <p className="text-sm font-normal mt-2">
                <span>
                  Phone Number:
                  <br />
                  <span className="font-semibold">
                    {formData.phoneNumber || "N/A"}
                  </span>
                </span>
              </p>
              <div className="flex items-center justify-center">
                <img width={70} height={70} src="/chip.png" />
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div
            className="w-[350px] h-[500px] bg-white rounded-xl shadow-lg border border-gray-300 flex flex-col justify-between p-4 relative"
            id="back-card"
          >
            <svg
              className="absolute inset-0 w-full h-full z-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="security-pattern"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="10" cy="10" r="5" fill="rgba(0,0,255,0.1)" />
                  <rect
                    x="5"
                    y="5"
                    width="10"
                    height="10"
                    fill="none"
                    stroke="rgba(0,255,0,0.2)"
                    strokeWidth="0.5"
                  />
                </pattern>
                <filter id="noise">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.8"
                    numOctaves="3"
                    stitchTiles="stitch"
                  />
                  <feBlend in="SourceGraphic" mode="multiply" />
                </filter>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="url(#security-pattern)"
                filter="url(#noise)"
              />
            </svg>

            <div className="bg-blue-600 text-white rounded-t-md p-3 flex items-center justify-center relative z-10">
              <h2 className="text-lg font-bold">Student Identification</h2>
            </div>

            <div className="flex flex-col items-center justify-center relative z-10">
              <p className="text-sm text-center px-4 text-gray-700 mb-4">
                "This card is property of UniToken University."
              </p>
              <div className="bg-gray-100 border border-dashed border-gray-300 p-3 w-full rounded-md">
                <h3 className="text-gray-700 text-sm font-semibold">
                  Emergency Contact:
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Phone: +2347066279211
                  <br />
                  Email: bellobambo21@gmail.com
                </p>
              </div>
            </div>

            <div className="bg-gray-100 rounded-b-md p-3 text-center relative z-10">
              <p className="text-xs text-gray-500">
                If found, please return to UniToken University.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Address: 123 College Ile Ife, Osun State, Zip.
              </p>
            </div>
          </div>
        </ReactCardFlip>
        <div className=" bottom-0 w-full  rounded-b-xl px-4 py-2 relative z-10">
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
            onClick={toggleModal}
          >
            Pay
          </button>
        </div>
        <div className="flex justify-center items-center space-x-5">
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-all"
            onClick={toggleFlip}
          >
            {isFlipped ? "Flip to Front" : "Flip to Back"}
          </button>

          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-all "
            onClick={handleExportPDF}
          >
            Download as PDF
          </button>
        </div>
      </div>

      {modal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          aria-labelledby="token-transfer-modal"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-md bg-blue-100 shadow-md rounded-lg p-6">
            <button
              className="absolute top-4 right-4 text-blue-600 hover:text-blue-800 text-lg font-bold"
              onClick={toggleModal}
              aria-label="Close modal"
            >
              &times;
            </button>

            <h1
              id="token-transfer-modal"
              className="text-2xl font-semibold text-blue-800 mb-4 text-center"
            >
              Token Transfer
            </h1>

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

            <button
              onClick={handleTransfer}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
            >
              Transfer Tokens
            </button>

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
