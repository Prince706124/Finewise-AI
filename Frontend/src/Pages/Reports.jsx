import React, { useEffect, useState } from "react";

import DashboardLayout from "../Components/Layouts/DashboardLayout";

import AIPreviewCard from "../Components/DashBoard/AiPreviewCard";

import axiosInstance from "../api/axiosInstance";

function Reports() {
  const [report, setReport] = useState(null);

  // FETCH REPORT
  const fetchReport = async () => {
    try {
      const response = await axiosInstance.get("/reports/summary");

      setReport(response.data);
      //
    } catch (error) {}
  };

  useEffect(() => {
    fetchReport();
  }, []);

  // LOADING
  if (!report) {
    return (
      <DashboardLayout title={"Reports"}>
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={"Reports"}>
      <div
        className="
bg-white
dark:bg-[#111827]
rounded-2xl
border
border-gray-100
dark:border-gray-800
p-6
"
      >
        <h2 className="text-2xl font-semibold mb-5">AI Financial Summary</h2>

        <p
          className="
  text-gray-600
  dark:text-gray-300
  leading-8
  "
        >
          {report.aiReport?.executiveSummary}
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
        {/* LEFT */}
        <div className="lg:col-span-8 space-y-6">
          {/* SUMMARY */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <h2 className="text-2xl font-semibold mb-8">
              Monthly Financial Summary
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* INCOME */}
              <div className="border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
                <p className="text-gray-500 mb-3">Total Income</p>

                <h3 className="text-4xl font-bold text-green-500">
                  ₹{report.totalIncome.toLocaleString()}
                </h3>
              </div>

              {/* EXPENSE */}
              <div className="border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
                <p className="text-gray-500 mb-3">Total Expenses</p>

                <h3 className="text-4xl font-bold text-red-500">
                  ₹{report.totalExpense.toLocaleString()}
                </h3>
              </div>

              {/* SAVINGS */}
              <div className="border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
                <p className="text-gray-500 mb-3">Net Savings</p>

                <h3 className="text-4xl font-bold text-blue-500">
                  ₹{report.savings.toLocaleString()}
                </h3>
              </div>

              {/* SAVINGS % */}
              <div className="border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
                <p className="text-gray-500 mb-3">Savings Percentage</p>

                <h3 className="text-4xl font-bold text-[#5b3df5]">
                  {report.savingsPercentage}%
                </h3>
              </div>
            </div>
          </div>

          {/* OBSERVATIONS */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <h2 className="text-2xl font-semibold mb-8">
              Monthly Observations
            </h2>

            <div className="space-y-5">
              {report.aiReport?.observations?.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-100 dark:border-gray-800 rounded-2xl p-5"
                >
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>

                  <p className="text-gray-500 leading-7">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-4 space-y-6">
          {/* HIGHLIGHTS */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <h2 className="text-2xl font-semibold mb-8">Report Highlights</h2>

            <div className="space-y-5 mb-6">
              <div className="bg-[#faf8ff] dark:bg-[#1f1f1f] border border-[#ece8ff]  rounded-xl p-5 text-gray-700 dark:text-gray-200">
                Highest spending category:{" "}
                <span className="font-semibold">{report.topCategory}</span> (₹
                {report.topCategoryAmount.toLocaleString()})
              </div>

              {report.aiReport?.highlights?.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#faf8ff] dark:bg-[#1f1f1f] border border-[#ece8ff] rounded-xl p-5 text-gray-700 dark:text-gray-200"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* DOWNLOAD BUTTON */}
            <button className="w-full bg-[#5b3df5] text-white py-4 rounded-xl font-medium hover:opacity-90 transition">
              Download Full Report
            </button>
          </div>

          {/* AI CARD */}
          <AIPreviewCard />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Reports;
