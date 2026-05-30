import React, { useEffect, useRef, useState } from "react";

import { FaBars, FaBell } from "react-icons/fa";

import axiosInstance from "../../api/axiosInstance";

import { useNavigate } from "react-router-dom";

function Topbar({ title, setIsOpen }) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef();

  // FETCH USER
  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("/auth/me");

      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // LOGOUT
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");

      localStorage.removeItem("darkMode");

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // USER INFO
  const firstName = user?.name?.split(" ")[0] || "User";

  const firstLetter = firstName.charAt(0).toUpperCase();

  return (
    <div
      className="
      w-full
      bg-white
      dark:bg-[#111827]
      border
      border-gray-100
      dark:border-gray-800
      rounded-2xl
      px-4
      sm:px-6
      py-4
      flex
      items-center
      justify-between
      mb-6
      transition-colors
      duration-300
    "
    >
      {/* LEFT */}

      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsOpen(true)}
          className="
          w-10
          h-10
          rounded-full
          border
          border-gray-100
          dark:border-gray-800
          flex
          lg:hidden
          items-center
          justify-center
        "
        >
          <FaBars />
        </button>

        <h2
          className="
          text-lg
          sm:text-xl
          font-semibold
          dark:text-white
        "
        >
          {title}
        </h2>
        {title === "Dashboard" && (
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#5b3df5]"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-3 sm:gap-4">
        {/* NOTIFICATION */}

        <button
          className="
          w-10
          h-10
          rounded-full
          border
          border-gray-100
          dark:border-gray-800
          flex
          items-center
          justify-center
          dark:text-white
        "
        >
          <FaBell size={20} />
        </button>

        {/* USER */}

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="
            flex
            items-center
            gap-2
          "
          >
            {/* CIRCLE */}

            <div
              className="
              w-10
              h-10
              rounded-full
              bg-[#5b3df5]
              text-white
              flex
              items-center
              justify-center
              font-semibold
            "
            >
              {firstLetter}
            </div>

            {/* NAME */}

            <span
              className="
              text-sm
              font-semibold
              hidden
              sm:block
              dark:text-white
            "
            >
              {firstName}
            </span>
          </button>

          {/* DROPDOWN */}

          {showMenu && (
            <div
              className="
                absolute
                right-0
                top-14
                w-52
                bg-white
                dark:bg-[#111827]
                border
                border-gray-100
                dark:border-gray-800
                rounded-2xl
                shadow-lg
                overflow-hidden
                z-50
              "
            >
              <button
                onClick={() => navigate("/settings")}
                className="
                  w-full
                  text-left
                  px-5
                  py-4
                  hover:bg-gray-50
                  dark:hover:bg-[#1f2937]
                  dark:text-white
                "
              >
                Settings
              </button>

              <button
                onClick={handleLogout}
                className="
                  w-full
                  text-left
                  px-5
                  py-4
                  text-red-500
                  hover:bg-red-50
                  dark:hover:bg-[#1f2937]
                "
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
