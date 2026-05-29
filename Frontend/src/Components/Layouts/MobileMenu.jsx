import React from "react";
import { FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaMoneyBillWaveAlt } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaChartSimple } from "react-icons/fa6";
import { BiSolidReport } from "react-icons/bi";
import { FaRobot } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

function MobileMenu({ isOpen, setIsOpen }) {
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
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <aside
          className={`fixed top-0 left-0 w-[260px] h-screen bg-white dark:bg-[#111827] z-50 p-5
    overflow-y-auto transition-all duration-300 ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    }`}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-[#5b3df5] mb-10">FinWise</h1>
            <button onClick={() => setIsOpen(true)}>
              <FaTimes size={14} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {menus.map((data, idx) => {
              return (
                <NavLink
                  key={idx}
                  to={data.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? "bg-[#5b3df5] text-white" : "text-gray-600 hover:bg-gray-100"}`
                  }
                >
                  {data.icons}
                  {data.name}
                </NavLink>
              );
            })}
          </div>
        </aside>
      </div>
    </>
  );
}

export default MobileMenu;
