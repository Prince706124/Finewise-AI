import React, { useEffect, useState } from "react";

import DashboardLayout from "../Components/Layouts/DashboardLayout";

import { FaRobot, FaArrowRightLong } from "react-icons/fa6";

import { FaArrowRight } from "react-icons/fa";

import { Link } from "react-router";

import { useNavigate } from "react-router-dom";

import axiosInstance from "../api/axiosInstance";

function AIAdvisor() {
  const navigate = useNavigate();

  const [aiData, setAiData] = useState(null);

  const [loading, setLoading] = useState(true);

  // FETCH AI
  const fetchAIInsights = async () => {
    try {
      const response = await axiosInstance.get("/ai/insights");

      //

      setAiData(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAIInsights();
  }, []);

  // SAFE AI TEXT
  const renderAIText = (item) => {
    if (item === null || item === undefined) return "";

    if (typeof item === "string" || typeof item === "number") return item;

    if (Array.isArray(item)) {
      return item.map(renderAIText).join(", ");
    }

    if (typeof item === "object") {
      return Object.values(item).map(renderAIText).join(" ");
    }

    return String(item);
  };

  // LOADING
  if (loading) {
    return (
      <DashboardLayout title={"AI Financial Advisor"}>
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-10 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Generating AI Financial Insights...
          </h2>

          <p className="text-gray-500">AI is analyzing your finances.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={"AI Financial Advisor"}>
      <div className="space-y-6">
        {/* TOP CARD */}

        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-[#f4f1ff] text-[#5b3df5] flex items-center justify-center text-2xl">
                  <FaRobot />
                </div>

                <h2 className="text-3xl font-bold">
                  AI Monthly Financial Analysis Ready
                </h2>
              </div>

              <p className="text-gray-500 leading-8 max-w-4xl">
                Personalized financial analysis generated from your real
                spending and savings data.
              </p>
            </div>

            <button
              onClick={() => navigate("/ai-chat")}
              className="bg-[#5b3df5] text-white px-8 py-4 rounded-xl font-medium flex items-center gap-3"
            >
              Chat With AI Advisor
              <FaArrowRightLong />
            </button>
          </div>
        </div>

        {/* EXECUTIVE SUMMARY */}

        <div className="bg-[#faf8ff] dark:bg-[#1f1f1f] border border-[#ece8ff] rounded-2xl p-6">
          <h2 className="text-3xl font-bold mb-5">AI Executive Summary</h2>

          <p className="text-gray-600 leading-9 text-lg">
            {renderAIText(aiData?.executiveSummary)}
          </p>
        </div>

        {/* GRID */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SPENDING */}

          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <h2 className="text-3xl font-bold mb-8">
              Spending Pattern Analysis
            </h2>

            <div className="space-y-5">
              {aiData?.spendingAnalysis?.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-100 dark:border-gray-800 rounded-xl p-5 text-gray-700 dark:text-gray-200 leading-7"
                >
                  {renderAIText(item)}
                </div>
              ))}
            </div>
          </div>

          {/* SAVINGS */}

          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <h2 className="text-3xl font-bold mb-8">
              Smart Saving Opportunities
            </h2>

            <div className="space-y-5">
              {aiData?.savingTips?.map((item, index) => (
                <div
                  key={index}
                  className="border border-[#ece8ff] bg-[#faf8ff] dark:bg-[#1f1f1f] rounded-xl p-5 text-gray-700 dark:text-gray-200 leading-7"
                >
                  {renderAIText(item)}
                </div>
              ))}
            </div>
          </div>

          {/*money waste detected*/}

          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <h2 className="text-3xl font-bold mb-8">Money Waste Detected</h2>

            <div className="space-y-5">
              {aiData?.moneyWaste?.map((item, index) => (
                <div
                  key={index}
                  className="border border-[#ece8ff] bg-[#faf8ff] dark:bg-[#1f1f1f] rounded-xl p-5 text-gray-700 dark:text-gray-200 leading-7"
                >
                  {renderAIText(item)}
                </div>
              ))}
            </div>
          </div>

          {/* Recomended next month budget */}

          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <h2 className="text-3xl font-bold mb-8">
              Recomended next month budget
            </h2>

            <div className="space-y-5">
              {aiData?.recommendedBudgets?.map((item, index) => (
                <div
                  key={index}
                  className="border border-[#ece8ff] bg-[#faf8ff] dark:bg-[#1f1f1f] rounded-xl p-5 text-gray-700 dark:text-gray-200 leading-7"
                >
                  {renderAIText(item)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AIAdvisor;
