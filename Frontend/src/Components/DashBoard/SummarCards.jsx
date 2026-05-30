import React from "react";
import { FaWallet } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaPiggyBank } from "react-icons/fa";

function SummarCards({ summary }) {
  if (!summary) {
    return (
      <div className="text-center text-gray-500 py-10">
        Loading dashboard data...
      </div>
    );
  }

  if (!summary.totalBalance && summary.totalBalance !== 0) {
    return (
      <div className="text-center text-red-500 py-10">
        Error loading summary data
      </div>
    );
  }
  const cards = [
    {
      title: "Total Balance",
      amount: `${summary.totalBalance.toLocaleString()}`,
      icon: <FaWallet />,
      bg: summary.totalBalance >= 0 ? "bg-green-50" : "bg-red-50",
      text: summary.totalBalance >= 0 ? "text-[#00a63d]" : "text-red-500",
    },
    {
      title: "Total Income",
      amount: `${summary.totalIncome.toLocaleString()}`,
      change:
        summary.incomeGrowth > 0
          ? `+${summary.incomeGrowth}%`
          : `${summary.incomeGrowth}%`,
      icon: <FaArrowUp />,
      bg: summary.incomeGrowth >= 0 ? "bg-green-50" : "bg-red-50",
      text: summary.incomeGrowth >= 0 ? "text-[#00a63d]" : "text-red-500",
    },
    {
      title: "Total Expenses",
      amount: `${summary.totalExpense.toLocaleString()}`,
      change:
        summary.expenseGrowth > 0
          ? `+${summary.expenseGrowth}%`
          : `${summary.expenseGrowth}%`,
      icon: <FaArrowDown />,
      bg: "bg-red-50",
      text: "text-red-500",
    },
    {
      title: "Net Savings",
      amount: `${summary.totalSavings.toLocaleString()}`,
      change:
        summary.savingsGrowth > 0
          ? `+${summary.savingsGrowth}%`
          : `${summary.savingsGrowth}%`,
      icon: <FaPiggyBank />,
      bg: summary.savingsGrowth >= 0 ? "bg-green-50" : "bg-red-50",
      text: summary.savingsGrowth >= 0 ? "text-[#00a63d]" : "text-red-500",
    },
  ];

  return (
    <>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        {cards.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm hover:shadow-md translate-y-1 transition"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {item.title}
                </p>
                <h3
                  className="text-2xl text-black
dark:text-white font-bold"
                >
                  ₹{item.amount}
                </h3>
              </div>
              <div
                className={`w-11 h-11 rounded-xl ${item.bg} ${item.text} flex items-center justify-center`}
              >
                {item.icon}
              </div>
            </div>
            <p className={`text-sm ${item.text} font-medium`}>{item.change}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default SummarCards;
