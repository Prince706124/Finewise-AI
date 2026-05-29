import React from "react";
import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useEffect } from "react";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const fetchTransactions = async () => {
    const response = await axiosInstance.get("/dashboard/recent-transactions");

    setTransactions(response.data);
  };
  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">All Transactions</h1>

          <p className="text-gray-500 mt-1 text-sm">
            Track all your recent income and expenses
          </p>
        </div>

        <div className="bg-[#f4f1ff] text-[#5b3df5] px-4 py-2 rounded-xl text-sm font-medium">
          {transactions.length} Transactions
        </div>
      </div>

      {/* Transactions */}
      <div className="space-y-4">
        {transactions.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition rounded-2xl px-5 py-4"
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold ${
                  item.type === "credit"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {item.type === "credit" ? "+" : "-"}
              </div>

              {/* Details */}
              <div>
                <h4 className="font-semibold text-gray-800">{item.title}</h4>

                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-gray-500">{item.category}</p>

                  <span className="text-gray-300">•</span>

                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="text-right">
              <p
                className={`text-lg font-bold ${
                  item.type === "credit" ? "text-green-600" : "text-red-500"
                }`}
              >
                {item.type === "credit" ? "+" : "-"} ₹{item.amount}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {item.type === "credit" ? "Income" : "Expense"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transactions;
