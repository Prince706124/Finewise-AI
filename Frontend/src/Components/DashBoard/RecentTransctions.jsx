import React from "react";
import { useNavigate } from "react-router";

function RecentTransactions({ transactions }) {
  const navigate = useNavigate();
  if (!transactions) return null;

  return (
    <>
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-5 h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3
            className="font-semibold
text-black
dark:text-white text-lg"
          >
            Recent Transactions
          </h3>

          <p
            onClick={() => {
              navigate("/transactions");
            }}
            className="text-sm text-[#5b3df5] font-medium cursor-pointer hover:underline"
          >
            View All
          </p>
        </div>

        {/* Transactions */}
        <div className="space-y-4">
          {transactions.slice(0, 5).map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0"
            >
              {/* Left */}
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white text-sm">
                  {item.title}
                </h4>

                <p className="text-xs text-gray-500 mt-1">{item.category}</p>
              </div>

              {/* Right */}
              <div className="text-right">
                <p
                  className={`font-semibold text-sm ${
                    item.type === "credit" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {item.type === "credit" ? "+" : "-"} ₹{item.amount}
                </p>

                <p className="text-xs text-gray-500 mt-1">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default RecentTransactions;
