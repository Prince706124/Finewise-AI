import React from "react";
import { FaRobot } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router";

function AIPreviewCard() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white dark:bg-[#111827] h rounded-2xl border border-gray-100 dark:border-gray-800 p-5 h-full">
        {/* Top Icon */}
        <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#f4f1ff] text-[#5b3df5] text-xl mb-4">
          <FaRobot />
        </div>

        {/* Heading */}
        <h3 className="font-semibold text-black dark:text-white text-lg mb-5">
          AI Financial Insights
        </h3>

        {/* AI Suggestions */}
        <div className="space-y-3 mb-5">
          <div className="bg-[#f8f7ff] dark:bg-[#1f1f1f] border border-[#ddd8ff] rounded-xl p-3 text-sm text-gray-700 dark:text-gray-200">
            Shopping expenses are rising faster than average.
          </div>

          <div className="bg-red-50 dark:bg-[#1f1f1f] border border-red-100 rounded-xl p-3 text-sm text-gray-700 dark:text-gray-200">
            3 recurring subscriptions detected this month.
          </div>

          <div className="bg-green-50 dark:bg-[#1f1f1f] border border-green-100 rounded-xl p-3 text-sm text-gray-700 dark:text-gray-200">
            Potential monthly saving opportunity: ₹3,500.
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/ai-advisor")}
          className="w-full bg-[#5b3df5] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition cursor-pointer"
        >
          View Full AI Advisor
          <FaArrowRightLong />
        </button>
      </div>
    </>
  );
}

export default AIPreviewCard;
