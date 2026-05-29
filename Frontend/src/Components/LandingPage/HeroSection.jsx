import React from "react";
import { FaChartPie } from "react-icons/fa6";
import { FaPiggyBank } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { Link } from "react-router";
function HeroSection() {
  return (
    <>
      <section className="max-width-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-sm uppercase tracking-[3px] text-[#5b3df5]">
            Smart Personal Finance Program
          </p>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-gray-900">
            Track Money Smarter.Save Better With AI
          </h2>
          <p className="text-gray-600 text-lg leading-8 mb-8 max-w-xl ">
            Finewise AI helps you manage income, expenses, budgets, reports and
            financial goals while AI continuously analyzes your habits to
            uncover money waste and saving opportunites.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link
              to="/register"
              className="px-7 py-4 border rounded-md text-sm font-medium text-gray-800  hover:bg-gray-300 transition cursor-pointer"
            >
              Create Free Account
            </Link>
            <button className="px-7 py-4 bg-[#5b3df5] border rounded-md text-sm font-medium text-white hover:bg-[#7769fc] transition cursor-pointer">
              Explore Features
            </button>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-gray-500 font-medium">
            <span>✔ Income & Expense Tracking</span>
            <span>✔ AI Financial Adivisory</span>
            <span>✔ Monthly Reports</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-white  rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm hover:translate-y-1 transition">
            <FaChartPie className="text-[#5b3df5] text-2xl mb-4" />
            <h3 className="font-semibold text-lg mb-2">Expense Analytics</h3>
            <p className="text-sm text-gray-500">
              Visual Spending Category Breakdown with Charts.
            </p>
          </div>
          <div className="bg-white  rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm hover:translate-y-1 transition">
            <FaPiggyBank className="text-[#5b3df5] text-2xl mb-4" />
            <h3 className="font-semibold text-lg mb-2">Saving Planner</h3>
            <p className="text-sm text-gray-500">
              Goal based monthly smart saving discipline.
            </p>
          </div>
          <div className="bg-white  rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm hover:translate-y-1 transition">
            <FaRobot className="text-[#5b3df5] text-2xl mb-4" />
            <h3 className="font-semibold text-lg mb-2">AI insights</h3>
            <p className="text-sm text-gray-500">
              AI detects money leakages and wasteful habits.
            </p>
          </div>
          <div className="bg-white  rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm hover:translate-y-1 transition">
            <BiSolidReport className="text-[#5b3df5] text-2xl mb-4" />
            <h3 className="font-semibold text-lg mb-2">Monthly Reports</h3>
            <p className="text-sm text-gray-500">
              Clear financial health summary every month.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
