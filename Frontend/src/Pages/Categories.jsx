import React from "react";
import DashboardLayout from "../Components/Layouts/DashboardLayout";
import AIPreviewCard from "../Components/DashBoard/AIPreviewCard";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FaUtensils,
  FaCar,
  FaShoppingBag,
  FaHome,
  FaFilm,
  FaMoneyBillWave,
  FaTrash,
  FaPen,
} from "react-icons/fa";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",

    type: "Expense",

    limit: "",

    icon: "FaMoneyBillWave",
  });
  const iconMap = {
    FaUtensils,

    FaCar,

    FaShoppingBag,

    FaHome,

    FaFilm,

    FaMoneyBillWave,
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories");

      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // EDIT
      if (editingId) {
        await axiosInstance.put(`/categories/${editingId}`, formData);
      }

      // CREATE
      else {
        await axiosInstance.post("/categories", formData);
      }

      // REFRESH
      fetchCategories();

      toast.success("Category added successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
      });

      // RESET
      setEditingId(null);

      setFormData({
        title: "",

        type: "Expense",

        limit: "",

        icon: "FaMoneyBillWave",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteCategory = async (id) => {
    try {
      await axiosInstance.delete(`/categories/${id}`);

      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (category) => {
    setEditingId(category._id);

    setFormData({
      title: category.title,

      type: category.type,

      limit: category.limit,

      icon: category.icon,
    });
  };
  return (
    <>
      <ToastContainer />
      <DashboardLayout title={"Categories"}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-4 space-y-6">
            {/* Add Category Card */}
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h2 className="text-2xl font-semibold mb-8">Add New Category</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category Name
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Food / Transport / Bills"
                    className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-[#5b3df5]"
                  />
                </div>

                {/* Category Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category Type
                  </label>

                  <select
                    name="type"
                    onChange={handleChange}
                    value={formData.type}
                    className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-[#5b3df5]"
                  >
                    <option>Expense </option>
                    <option>Income </option>
                    <option>Budgets</option>
                  </select>
                </div>

                {/* Monthly Limit */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Monthly Limit (Optional)
                  </label>

                  <input
                    type="number"
                    name="limit"
                    value={formData.limit}
                    onChange={handleChange}
                    placeholder="Enter monthly budget limit"
                    className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-[#5b3df5]"
                  />
                </div>

                {/* Icon */}
                <div>
                  <label className="block text-sm font-medium mb-2">Icon</label>

                  <select
                    name="icon"
                    onChange={handleChange}
                    value={formData.icon}
                    className="w-full border border-gray-200 dark:border-gray-800 dark:bg-[#111827] rounded-xl px-4 py-4 outline-none focus:border-[#5b3df5]"
                  >
                    <option value="FaMoneyBillWave">FaMoneyBillWave</option>
                    <option value="FaUtensils">FaUtensils</option>
                    <option value="FaCar">FaCar</option>
                    <option value="FaShoppingBag">FaShoppingBag</option>
                    <option value="FaHome">FaHome</option>
                    <option value="FaFilm">FaFilm</option>
                  </select>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="w-full bg-[#5b3df5] text-white py-4 rounded-xl font-medium hover:opacity-90 transition"
                >
                  Save Category
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold">Manage Categories</h2>

                <p className="text-gray-500 font-medium">
                  {categories.length} Categories
                </p>
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {categories.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:shadow-sm transition"
                  >
                    {/* Top */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#f4f1ff] text-[#5b3df5] flex items-center justify-center text-lg">
                        {React.createElement(iconMap[item.icon])}
                      </div>

                      <div className="flex items-center gap-4 text-gray-400">
                        <FaPen
                          onClick={() => handleEdit(item)}
                          className="cursor-pointer hover:text-[#5b3df5]"
                        />

                        <FaTrash
                          onClick={() => deleteCategory(item._id)}
                          className="cursor-pointer hover:text-red-500"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>

                    <div className="space-y-2 text-gray-500 text-sm">
                      <p>Type: {item.type}</p>

                      <p>Monthly Limit: {item.limit}</p>
                    </div>
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

export default Categories;
