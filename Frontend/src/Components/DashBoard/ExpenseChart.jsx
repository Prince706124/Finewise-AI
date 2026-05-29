import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function ExpenseChart({ categories }) {
  const total = categories.reduce((sum, item) => sum + item.amount, 0);

  const colors = ["#6d5dfc", "#8b7fff", "#b3abff", "#d7d2ff", "#ece9ff"];

  return (
    <>
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-5 h-full">
        <h3 className="font-semibold text-black dark:text-white text-lg mb-5">
          Expense Overview
        </h3>

        <div className="w-full h-[220px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categories}
                innerRadius={60}
                outerRadius={85}
                paddingAngle={3}
                dataKey={"amount"}
              >
                {categories.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Content */}
          <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
            <p className="text-xs text-gray-500">Total Expense</p>

            <h2 className="text-lg text-[#5b3df5] dark:text-white font-bold">
              ₹{total.toLocaleString()}
            </h2>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3 mt-2">
          {categories.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center justify-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[index] }}
                ></span>
                <span className="text-gray-600 dark:text-white">
                  {item.category}
                </span>
              </div>
              <span className="font-medium text-gray-600 dark:text-white">
                {item.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ExpenseChart;
