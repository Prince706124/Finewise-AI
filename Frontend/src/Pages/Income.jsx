import React from "react";
import DashboardLayout from "../Components/Layouts/DashboardLayout";
import AIPreviewCard from "../Components/DashBoard/AiPreviewCard";
import { FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

function Income() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    date: "",
    paymentMethod: "",
    notes: "",
  });

  const [incomes, setIncomes] = useState([]);
  // FETCH ALL INCOMES
  const fetchIncomes = async () => {
    try {
      const response = await axiosInstance.get("/income", {
        withCredentials: true,
      });

      setIncomes(response.data);
    } catch (error) {}
  };
  // RUN ON COMPONENT LOAD
  useEffect(() => {
    fetchIncomes();
  }, []);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD INCOME
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/income", formData, {
        withCredentials: true,
      });

      toast.success("Income added successfully!");

      // REFRESH UI
      fetchIncomes();

      // CLEAR FORM
      setFormData({
        source: "",
        amount: "",
        date: "",
        paymentMethod: "",
        notes: "",
      });
    } catch (error) {
      toast.error("Failed to add income");
    }
  };

  // TOTAL INCOME
  const totalIncome = incomes.reduce(
    (acc, income) => acc + Number(income.amount),
    0,
  );

  // TOTAL ENTRIES
  const totalEntries = incomes.length;

  // SOURCE COUNT
  const sourceCount = {};

  incomes.forEach((income) => {
    sourceCount[income.source] = (sourceCount[income.source] || 0) + 1;
  });

  // HIGHEST SOURCE
  const highestSource =
    Object.keys(sourceCount).length > 0
      ? Object.keys(sourceCount).reduce((a, b) =>
          sourceCount[a] > sourceCount[b] ? a : b,
        )
      : "No Data";

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/income/${id}`, {
        withCredentials: true,
      });

      // Update UI instantly
      setIncomes(incomes.filter((income) => income._id !== id));
    } catch (error) {
      toast.error("Failed to delete income");
    }
  };

  return (
    <>
      <ToastContainer />
      <DashboardLayout title={"Income"}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT SECTION */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h2 className="text-2xl font-semibold mb-8">Add New Income</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Income Source */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Income Source
                  </label>

                  <input
                    type="text"
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    placeholder="Salary / Freelancing / Business"
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
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Enter amount"
                    className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-[#5b3df5]"
                  />
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
                      className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-[#5b3df5]"
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
                    name="paymentMethod"
                    onChange={handleChange}
                    value={formData.paymentMethod}
                    className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-[#5b3df5]"
                  >
                    <option>Bank Transfer</option>
                    <option>UPI</option>
                    <option>Cash</option>
                    <option>Cheque</option>
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
                  Save Income
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="lg:col-span-5 space-y-6">
            {/* Summary Card */}
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h3 className="text-xl font-semibold mb-6">Income Summary</h3>

              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                  <p className="text-gray-500">This Month Income</p>

                  <p className="font-semibold text-green-600">₹{totalIncome}</p>
                </div>

                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                  <p className="text-gray-500">Highest Source</p>

                  <p className="font-semibold">{highestSource}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-gray-500">Entries Added</p>

                  <p className="font-semibold"> {totalEntries}</p>
                </div>
              </div>
            </div>

            {/* Recent Income */}
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Recent Income History</h3>

                <button
                  onClick={() => navigate("/income-all")}
                  className="text-sm text-[#5b3df5] font-medium"
                >
                  View All
                </button>
              </div>

              <div className="space-y-5">
                {incomes.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0"
                  >
                    <div>
                      <h4 className="font-medium text-sm">{item.source}</h4>

                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                    </div>

                    <p className="font-semibold text-green-600">
                      {item.amount}
                    </p>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
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

export default Income;
