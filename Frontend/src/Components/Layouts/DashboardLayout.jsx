import React, { useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import MobileMenu from "./MobileMenu";
import { useNavigate } from "react-router";
import axiosInstance from "../../api/axiosInstance";
import { useEffect } from "react";
function DashboardLayout({ title, children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/auth/me");

        setUser(response.data);
      } catch (error) {
        navigate("/login");
      }
    };

    fetchUser();
  }, []);
  return (
    <>
      <div
        className="bg-[#f6f7fb]
  dark:bg-[#030712]
  text-black
  dark:text-white
  transition-colors
  duration-300"
      >
        <Sidebar></Sidebar>
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen}></MobileMenu>
        <main className="lg:ml-[250px] h-screen overflow-y-auto p-4 sm:p-6 lg:p-8 ">
          <Topbar title={title} setIsOpen={setIsOpen}></Topbar>
          {children}
        </main>
      </div>
    </>
  );
}

export default DashboardLayout;
