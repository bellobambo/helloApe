import React, { useState } from "react";
import { ethers } from "ethers";
import TokenTransfer from "./TokenTransfer.json";

const CONTRACT_ADDRESS = "0x8257241C80A0F42C01818539A603962822D4a27D";

function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");

  let provider;
  let signer;
  let contract;

  // Connect Wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);

      // Initialize contract
      contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        TokenTransfer.abi,
        signer
      );
    } else {
      alert("MetaMask not detected. Please install it!");
    }
  };

  // Fetch Token Balance
  const fetchBalance = async () => {
    if (!account) {
      alert("Connect your wallet first.");
      return;
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, TokenTransfer.abi, signer);

    try {
      const result = await contract.balanceOf(account);
      setBalance(ethers.utils.formatEther(result.toString()));
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const transferTokens = async () => {
    if (!receiver || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, TokenTransfer.abi, signer);

    try {
      const tx = await contract.transfer(
        receiver,
        ethers.utils.parseEther(amount)
      );
      await tx.wait();
      alert(`Transfer successful! Transaction Hash: ${tx.hash}`);
    } catch (error) {
      console.error("Transfer failed:", error);
      alert("Transfer failed. Check console for details.");
    }
  };

  return (
    <div className="App">
      <h1>TokenTransfer UI</h1>

      <button onClick={connectWallet}>
        {account ? `Connected: ${account}` : "Connect Wallet"}
      </button>

      <div>
        <h2>Your Balance</h2>
        <button onClick={fetchBalance}>Fetch Balance</button>
        <p>{balance} Tokens</p>
      </div>

      <div>
        <h2>Transfer Tokens</h2>
        <input
          type="text"
          placeholder="Receiver's Address"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={transferTokens}>Transfer</button>
      </div>
    </div>
  );
}

export default App;
