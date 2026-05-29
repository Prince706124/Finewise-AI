import React, { useEffect, useState } from "react";

import DashboardLayout from "../Components/Layouts/DashboardLayout";

import axiosInstance from "../api/axiosInstance";

function Settings() {
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [passwordLoading, setPasswordLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",

    email: "",

    incomeGoal: "",

    savingsTarget: "",

    currency: "INR",

    darkMode: false,

    monthlyReminder: true,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",

    newPassword: "",

    confirmPassword: "",
  });

  // FETCH SETTINGS
  const fetchSettings = async () => {
    try {
      const response = await axiosInstance.get("/settings");

      const user = response.data;

      setFormData({
        name: user.name || "",

        email: user.email || "",

        incomeGoal: user.incomeGoal || "",

        savingsTarget: user.savingsTarget || "",

        currency: user.currency || "INR",

        darkMode: user.darkMode || false,

        monthlyReminder: user.monthlyReminder ?? true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SAVE SETTINGS
  const saveSettings = async () => {
    try {
      setSaving(true);

      await axiosInstance.put("/settings", formData);

      alert("Settings updated successfully");
      if (formData.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      localStorage.setItem("darkMode", formData.darkMode);
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  // CHANGE PASSWORD
  const changePassword = async () => {
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      return alert("Please fill all password fields");
    }
    if (passwordData.newPassword.length < 6) {
      return alert("Password must be at least 6 characters");
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setPasswordLoading(true);

      await axiosInstance.put("/settings/change-password", {
        currentPassword: passwordData.currentPassword,

        newPassword: passwordData.newPassword,
      });

      alert("Password updated");

      setPasswordData({
        currentPassword: "",

        newPassword: "",

        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title={"Settings"}>
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-10 text-center">
          Loading Settings...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={"Settings"}>
      <div className="space-y-6">
        {/* PROFILE */}

        <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-8">Profile Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NAME */}

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200 block mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-[#5b3df5]"
              />
            </div>

            {/* EMAIL */}

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200 block mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full bg-gray-50 dark:bg-[#1f1f1f] border border-gray-200 rounded-xl px-4 py-4 outline-none"
              />
            </div>

            {/* INCOME GOAL */}

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200 block mb-2">
                Monthly Income Goal
              </label>

              <input
                type="number"
                name="incomeGoal"
                value={formData.incomeGoal}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-[#5b3df5]"
              />
            </div>

            {/* SAVINGS TARGET */}

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200 block mb-2">
                Monthly Savings Target
              </label>

              <input
                type="number"
                name="savingsTarget"
                value={formData.savingsTarget}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-[#5b3df5]"
              />
            </div>
          </div>
        </div>

        {/* PREFERENCES */}

        <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-8">Preferences</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CURRENCY */}

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200 block mb-2">
                Currency
              </label>

              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-[#5b3df5]"
              >
                <option value="INR">INR (₹)</option>

                <option value="USD">USD ($)</option>

                <option value="EUR">EUR (€)</option>
              </select>
            </div>

            {/* THEME */}

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200 block mb-2">
                Theme
              </label>

              <select
                name="darkMode"
                value={formData.darkMode ? "dark" : "light"}
                onChange={(e) => {
                  const isDark = e.target.value === "dark";

                  setFormData((prev) => ({
                    ...prev,
                    darkMode: isDark,
                  }));

                  // LIVE THEME SWITCH
                  if (isDark) {
                    document.documentElement.classList.add("dark");
                  } else {
                    document.documentElement.classList.remove("dark");
                  }
                }}
                className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-[#5b3df5]"
              >
                <option value="light">Light Mode</option>

                <option value="dark">Dark Mode</option>
              </select>
            </div>

            {/* NOTIFICATIONS */}

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200 block mb-2">
                Monthly Notification
              </label>

              <select
                value={formData.monthlyReminder ? "enabled" : "disabled"}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    monthlyReminder: e.target.value === "enabled",
                  }))
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-4 outline-none focus:border-[#5b3df5]"
              >
                <option value="enabled">Enabled</option>

                <option value="disabled">Disabled</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECURITY */}

        <div className="bg-white dark:bg-[#111827] text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-8">Security</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="password"
              placeholder="Current Password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  currentPassword: e.target.value,
                }))
              }
              className="w-full border border-gray-200 text-gray-500 dark:text-gray-400 rounded-xl px-4 py-4 outline-none focus:border-[#5b3df5]"
            />

            <input
              type="password"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
              className="w-full border border-gray-200 text-gray-500 dark:text-gray-400 rounded-xl px-4 py-4 outline-none focus:border-[#5b3df5]"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className="w-full border border-gray-200 text-gray-500 dark:text-gray-400 rounded-xl px-4 py-4 outline-none focus:border-[#5b3df5]"
            />
          </div>

          {/* BUTTONS */}

          <div className="mt-8 flex gap-4">
            <button
              onClick={saveSettings}
              disabled={saving}
              className="px-8 py-3 bg-[#5b3df5] text-white rounded-2xl font-medium hover:bg-[#7769fc] transition"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>

            <button
              onClick={changePassword}
              disabled={passwordLoading}
              className="px-8 py-3 border border-[#5b3df5] text-[#5b3df5] rounded-2xl font-medium hover:bg-[#f4f1ff] transition"
            >
              {passwordLoading ? "Updating..." : "Change Password"}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Settings;
