import React from "react";
import DashboardLayout from "../Components/Layouts/DashboardLayout";
import AIPreviewCard from "../Components/DashBoard/AiPreviewCard";
import { FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useEffect } from "react";

function Budgets() {
  const [budgets, setBudgets] = useState([]);

  const [summary, setSummary] = useState({});
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    category: "",

    limit: "",

    month: "May",
  });
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories");

      setCategories(response.data.filter((item) => item.type === "Expense"));
    } catch (error) {}
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/budgets", formData);

      fetchBudgets();

      setFormData({
        category: "",

        limit: "",

        month: "May",
      });
    } catch (error) {}
  };
  useEffect(() => {
    fetchBudgets();

    fetchCategories();
  }, []);
  const fetchBudgets = async () => {
    try {
      const response = await axiosInstance.get("/budgets");

      setBudgets(response.data.budgets);

      setSummary({
        totalBudget: response.data.totalBudget,

        totalUsed: response.data.totalUsed,

        remainingBudget: response.data.remainingBudget,
      });
    } catch (error) {}
  };
  useEffect(() => {
    fetchBudgets();
  }, []);

  summary.totalBudget = summary.totalBudget || 0;
  summary.totalUsed = summary.totalUsed || 0;
  summary.remainingBudget = summary.totalBudget - summary.totalUsed;

  return (
    <>
      <DashboardLayout title={"Budgets"}>
        {/* TOP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {/* Total Budget */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <p className="text-gray-500 mb-3">Total Monthly Budget</p>

            <h2 className="text-4xl font-bold">
              ₹{summary.totalBudget.toLocaleString()}
            </h2>
          </div>

          {/* Total Used */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <p className="text-gray-500 mb-3">Total Used</p>

            <h2 className="text-4xl font-bold text-red-500">
              ₹{summary.totalUsed.toLocaleString()}
            </h2>
          </div>

          {/* Remaining */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <p className="text-gray-500 mb-3">Remaining Budget</p>

            <h2 className="text-4xl font-bold text-green-500">
              ₹{summary.remainingBudget.toLocaleString()}
            </h2>
          </div>
        </div>

        {/* ADD BUDGET */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-8">Add Monthly Budget</h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {/* CATEGORY */}
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-[#5b3df5]"
              >
                <option value="">Select Category</option>

                {categories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            {/* LIMIT */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Budget Limit
              </label>

              <input
                type="number"
                name="limit"
                value={formData.limit}
                onChange={handleChange}
                required
                placeholder="Enter limit"
                className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-[#5b3df5]"
              />
            </div>

            {/* MONTH */}
            <div>
              <label className="block text-sm font-medium mb-2">Month</label>

              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-[#5b3df5]"
              >
                <option value="Jan">January</option>

                <option value="Feb">February</option>

                <option value="Mar">March</option>

                <option value="Apr">April</option>

                <option value="May">May</option>

                <option value="Jun">June</option>

                <option value="Jul">July</option>

                <option value="Aug">August</option>

                <option value="Sep">September</option>

                <option value="Oct">October</option>

                <option value="Nov">November</option>

                <option value="Dec">December</option>
              </select>
            </div>

            {/* BUTTON */}
            <div className="md:col-span-3">
              <button
                type="submit"
                className="bg-[#5b3df5] text-white px-8 py-4 rounded-xl font-medium hover:opacity-90 transition"
              >
                Add Budget
              </button>
            </div>
          </form>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-12">
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              {/* Heading */}
              <h2 className="text-2xl font-semibold mb-8">
                Category Budget Planner
              </h2>

              {/* Budget List */}
              <div className="space-y-8">
                {budgets.map((item, index) => {
                  const progress = (item.spent / item.limit) * 100;

                  return (
                    <div
                      key={index}
                      className="border-b border-gray-100 dark:border-gray-800 pb-8 last:border-0"
                    >
                      {/* Top Row */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">
                            {item.category}
                          </h3>

                          <p className="text-gray-500 mt-1">
                            ₹{item.spent.toLocaleString()} spent out of ₹
                            {item.limit.toLocaleString()}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-gray-500">
                            Remaining: ₹{item.remaining.toLocaleString()}
                          </p>

                          <p
                            className={`font-medium mt-1 ${
                              item.status === "Safe"
                                ? "text-green-500"
                                : item.status === "Warning"
                                  ? "text-yellow-500"
                                  : "text-red-500"
                            }`}
                          >
                            {item.status}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`${item.color} h-full rounded-full`}
                          style={{
                            width: `${Math.min(progress, 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

export default Budgets;
