import React from "react";
import DashboardLayout from "../Components/Layouts/DashboardLayout";
import AIPreviewCard from "../Components/DashBoard/AIPreviewCard";
import { FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Expense() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories");

      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    paymentMethod: "",
    notes: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.title ||
      !formData.amount ||
      !formData.category ||
      !formData.date
    ) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      const response = await axiosInstance.post("/expenses", {
        ...formData,
        amount: Number(formData.amount),
      });

      console.log(response.data);
      toast.success("Expense added successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setFormData({
        title: "",
        amount: "",
        category: "",
        date: "",
        paymentMethod: "UPI",
        notes: "",
      });

      // Refresh expenses list
      fetchExpenses();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add expense!");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/expenses/${id}`, {
        withCredentials: true,
      });

      console.log(response.data);

      // Remove deleted expense from UI
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const [expenses, setExpenses] = useState([]);
  const fetchExpenses = async () => {
    try {
      const response = await axiosInstance.get("/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchExpenses();
  }, []);

  const totalExpense = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0,
  );

  // Total Entries
  const totalEntries = expenses.length;

  // Category Count
  const categoryCount = {};

  expenses.forEach((expense) => {
    categoryCount[expense.category] =
      (categoryCount[expense.category] || 0) + 1;
  });

  // Top Category
  const topCategory =
    Object.keys(categoryCount).length > 0
      ? Object.keys(categoryCount).reduce((a, b) =>
          categoryCount[a] > categoryCount[b] ? a : b,
        )
      : "No Data";

  return (
    <>
      <ToastContainer />
      <DashboardLayout title={"Add Expense"}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT SECTION */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h2 className="text-2xl font-semibold mb-8">Add New Expense</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Expense Title */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Expense Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder="Groceries / Rent / Petrol"
                    className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-[#5b3df5]"
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Amount
                  </label>

                  <input
                    type="number"
                    name="amount"
                    onChange={handleChange}
                    placeholder="Enter expense amount"
                    className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-[#5b3df5]"
                  />
                </div>

                {/* Expense Category */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Expense Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-gray-200 text-gray-500 dark:text-gray-400 dark:bg-[#111827] rounded-xl px-4 py-4 outline-none focus:border-[#5b3df5]"
                  >
                    <option value="">Select Category</option>
                    {categories.map((item) => (
                      <option key={item._id} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>

                  <div className="relative">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full border border-gray-200  rounded-xl px-4 py-4 outline-none focus:border-[#5b3df5]"
                    />

                    <FaCalendarAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Payment Method
                  </label>

                  <select
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="w-full border border-gray-200 dark:bg-[#111827]  rounded-xl px-4 py-4 outline-none focus:border-[#5b3df5]"
                  >
                    <option value="UPI">UPI</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Cash</option>
                    <option>Bank Transfer</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Notes
                  </label>

                  <textarea
                    rows="4"
                    name="notes"
                    onChange={handleChange}
                    placeholder="Additional note..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none resize-none focus:border-[#5b3df5]"
                  ></textarea>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="w-full bg-[#5b3df5] text-white py-4 rounded-xl font-medium hover:opacity-90 transition"
                >
                  Save Expense
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="lg:col-span-4 space-y-6">
            {/* Summary Card */}
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h3 className="text-xl font-semibold mb-6">Expense Summary</h3>

              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                  <p className="text-gray-500">This Month Expense</p>

                  <p className="font-semibold text-red-500">₹{totalExpense}</p>
                </div>

                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                  <p className="text-gray-500">Top Category</p>

                  <p className="font-semibold">{topCategory}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-gray-500">Entries Added</p>

                  <p className="font-semibold">{totalEntries}</p>
                </div>
              </div>
            </div>

            {/* Recent Expense History */}
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">
                  Recent Expense History
                </h3>

                <button
                  onClick={() => navigate("/expenses-all")}
                  className="text-sm text-[#5b3df5] font-medium"
                >
                  View All
                </button>
              </div>

              <div className="space-y-5">
                {expenses.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0"
                  >
                    <div>
                      <h4 className="font-medium text-sm">{item.title}</h4>

                      <p className="text-xs text-gray-500 mt-1">
                        {item.category} • {item.date}
                      </p>
                    </div>

                    <p className="font-semibold text-red-500">{item.amount}</p>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

export default Expense;
