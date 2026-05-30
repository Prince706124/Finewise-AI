import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const ExpenseAll = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const response = await axiosInstance.get("/expenses", {
        withCredentials: true,
      });

      setExpenses(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">All Expenses</h1>

      <div className="space-y-4">
        {expenses.map((expense) => (
          <div
            key={expense._id}
            className="bg-white dark:bg-[#111827] p-4 rounded-xl border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{expense.title}</p>

                <p className="text-gray-500 text-sm">{expense.category}</p>
              </div>

              <p className="text-red-500 font-bold">₹{expense.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseAll;
