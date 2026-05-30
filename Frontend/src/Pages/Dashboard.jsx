import React from "react";
import DashboardLayout from "../Components/Layouts/DashboardLayout";
import SummarCards from "../Components/DashBoard/SummarCards";
import ExpenseChart from "../Components/DashBoard/ExpenseChart";
import RecentTransactions from "../Components/DashBoard/RecentTransctions";
import AIPreviewCard from "../Components/DashBoard/AiPreviewCard";
import axiosInstance from "../api/axiosInstance";
import { useEffect } from "react";
import { useState } from "react";

function DashBoard() {
  const [cards, setCards] = useState(null);

  const [transactions, setTransactions] = useState([]);

  const [categories, setCategories] = useState([]);

  const [trends, setTrends] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  // FETCH CARDS
  const fetchCards = async () => {
    try {
      const response = await axiosInstance.get(
        `/dashboard/cards?month=${selectedMonth}`,
      );
      console.log("Cards response:", response.data);
      setCards(response.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
      setCards(null);
    }
  };

  // FETCH TRANSACTIONS
  const fetchTransactions = async () => {
    try {
      const response = await axiosInstance.get(
        "/dashboard/recent-transactions",
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    }
  };

  // FETCH CHART
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/dashboard/expense-categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  // FETCH TRENDS
  const fetchTrends = async () => {
    try {
      const response = await axiosInstance.get("/dashboard/monthly-trends");
      setTrends(response.data);
    } catch (error) {
      console.error("Error fetching trends:", error);
      setTrends([]);
    }
  };

  useEffect(() => {
    fetchCards();

    fetchTransactions();

    fetchCategories();

    fetchTrends();
  }, [selectedMonth]);
  return (
    <>
      <DashboardLayout
        title={"Dashboard"}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      >
        <SummarCards summary={cards}></SummarCards>

        <div className="grid lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-4">
            <ExpenseChart categories={categories}></ExpenseChart>
          </div>
          <div className="lg:col-span-4">
            <RecentTransactions transactions={transactions} />
          </div>
          <div className="lg:col-span-4">
            <AIPreviewCard />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

export default DashBoard;
