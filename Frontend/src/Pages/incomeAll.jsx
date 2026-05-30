import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function IncomeHistory() {
  const [incomes, setIncomes] = useState([]);

  const fetchIncomes = async () => {
    try {
      const response = await axiosInstance.get("/income", {
        withCredentials: true,
      });

      setIncomes(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">All Income History</h1>

      <div className="space-y-4">
        {incomes.map((income) => (
          <div
            key={income._id}
            className="bg-white dark:bg-[#111827] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-between"
          >
            <div>
              <h3 className="font-semibold">{income.source}</h3>

              <p className="text-sm text-gray-500">{income.paymentMethod}</p>

              <p className="text-sm text-gray-400">{income.date}</p>
            </div>

            <p className="text-green-600 font-bold text-lg">₹{income.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IncomeHistory;
