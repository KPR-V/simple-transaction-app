"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { set, z } from "zod";
import abi from "@/components/simpletransaction.json"
const transactionSchema = z.object({
  toAddress: z
    .string()
    .min(1, "To address is required")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  amount: z.number().positive("Amount must be positive"),
});

const Page = () => {
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("not connected");
  const [loading, setLoading] = useState(false);
 const [usd,setusd] = useState(0);
  
    const init = async () => {
      const contractAddress = "0x9CFa7D64c987Ea3186EA7C619C0E7D8C34107c6e";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;

        if (!ethereum) {
          console.error("Ethereum object not found. Install MetaMask.");
          return;
        }

        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        if (accounts.length === 0) {
          console.error("No accounts found. Please connect MetaMask.");
          return;
        }

        window.ethereum.on("accountsChanged", (accounts) => {
          if (accounts.length === 0) {
            console.log("Please connect to MetaMask.");
          } else {
            setAccount(accounts[0]);
            window.location.reload();
          }
        });

        setAccount(accounts[0]);

        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner(); 

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer 
        );

        setState({ provider, signer, contract });
      } catch (error) {
        console.error("Error initializing provider:", error);
      }
    };

    useEffect(() => {
      init();
    })

  



  const handleChangeToAddress = (e) => {
    setToAddress(e.target.value);
  };

  const handleChangeAmount = (e) => {
    
    setAmount(e.target.value);
   
  };


  const sendTransaction = async (e) => {
    e.preventDefault();
    setLoading(true);
    const parsedAmount = parseFloat(amount);
    const { contract } = state;
    const amountToSend = {
      value: ethers.parseUnits(parsedAmount.toString(), "ether"),
    };
    const etherAmount = ethers.parseUnits(amount.toString(), "ether"); 
    const converted = await contract.converttousd(etherAmount); 

    
    const formattedUsdAmount = ethers.formatUnits(converted, "ether"); 

    setusd(formattedUsdAmount); 
    

    const validation = transactionSchema.safeParse({
      toAddress,
      amount: parsedAmount,
    });

    if (!validation.success) {
      const errorMessages = validation.error.format();
      setErrors(errorMessages);
      setLoading(false);
      return;
    }

    setErrors({});

   
    try {
      const transaction = await contract.transaction(toAddress, amountToSend);
      await transaction.wait();
    } catch (error) {
      setLoading(false);
      console.error("Transaction error:", error);
    }
   

    setLoading(false);
    setAmount("");
    setToAddress("");
    setusd(0);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="mb-6 text-lg font-semibold text-gray-800">
        Connected account: {account}
      </div>
      <form
        onSubmit={sendTransaction}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <input
            type="text"
            placeholder="To address"
            value={toAddress}
            onChange={handleChangeToAddress}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.toAddress && (
            <p className="mt-2 text-sm text-red-600">
              {errors.toAddress._errors[0]}
            </p>
          )}
        </div>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={handleChangeAmount}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-2 text-sm text-gray-600">
            {usd} USD
          </p>
          {errors.amount && (
            <p className="mt-2 text-sm text-red-600">
              {errors.amount._errors[0]}
            </p>
          )}
        </div>

        <button
          disabled={loading}
          type="submit"
          className={`w-full py-3 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
            ${
              loading
                ? "bg-blue-700 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            } 
          `}
        >
          {loading ? (
            <div className="inline-flex items-center">
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </div>
          ) : (
            "Send"
          )}
        </button>
      </form>
    </main>
  );
};

export default Page;
