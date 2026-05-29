import React from "react";
import { Navigate, NavLink, useNavigate } from "react-router";
import { MdDashboard } from "react-icons/md";
import { FaMoneyBillWaveAlt } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaChartSimple } from "react-icons/fa6";
import { BiSolidReport } from "react-icons/bi";
import { FaRobot } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

function Sidebar() {
  const navigate = useNavigate();

  const menus = [
    { name: "Dashboard", path: "/dashboard", icons: <MdDashboard /> },
    { name: "Income", path: "/income", icons: <FaMoneyBillWaveAlt /> },
    { name: "Expenses", path: "/expenses", icons: <FaWallet /> },
    { name: "Categories", path: "/categories", icons: <BiSolidCategoryAlt /> },
    { name: "Budgets", path: "/budgets", icons: <FaChartSimple /> },
    { name: "Reports", path: "/reports", icons: <BiSolidReport /> },
    { name: "AI Adivisor", path: "/ai-advisor", icons: <FaRobot /> },
    { name: "Settings", path: "/settings", icons: <IoMdSettings /> },
  ];

  return (
    <>
      <aside className="w-[250px] bg-white dark:bg-[#111827] border-r border-gray-100 dark:border-gray-800 h-screen fixed top-0 px-5 py-6 hidden lg:block overflow-y-auto">
        <h1 className="text-2xl font-bold text-[#5b3df5] mb-10 ">FinWise</h1>
        <div className="flex flex-col gap-2">
          {menus.map((data, idx) => {
            return (
              <NavLink
                key={idx}
                to={data.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? "bg-[#5b3df5] text-white " : "text-gray-600 dark:text-gray-400 hover:bg-gray-100"}`
                }
              >
                {data.icons}
                {data.name}
              </NavLink>
            );
          })}
        </div>
        <div className="mt-12 bg-[#f8f7ff] dark:bg-[#1f1f1f] border border-[#ddd8ff] rounded-2xl p-4">
          <p className="text-sm font-semibold mb-2 ">
            Your AI Financial Assistant
          </p>
          <p className="text-xs text-gray-500 mb-4 ">
            Get Smart Monthly Insights and Improve Your Savings habits
          </p>
          <button
            onClick={() => navigate("/ai-chat")}
            className="w-full bg-[#5b3df5] text-white py-2 rounded-lg text-sm "
          >
            {" "}
            Ask AI Assistance
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
