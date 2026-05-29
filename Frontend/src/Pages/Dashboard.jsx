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

  // FETCH CARDS
  const fetchCards = async () => {
    const response = await axiosInstance.get("/dashboard/cards");

    setCards(response.data);
  };

  // FETCH TRANSACTIONS
  const fetchTransactions = async () => {
    const response = await axiosInstance.get("/dashboard/recent-transactions");

    setTransactions(response.data);
  };

  // FETCH CHART
  const fetchCategories = async () => {
    const response = await axiosInstance.get("/dashboard/expense-categories");

    setCategories(response.data);
  };

  // FETCH TRENDS
  const fetchTrends = async () => {
    const response = await axiosInstance.get("/dashboard/monthly-trends");

    setTrends(response.data);
  };

  useEffect(() => {
    fetchCards();

    fetchTransactions();

    fetchCategories();

    fetchTrends();
  }, []);
  return (
    <>
      <DashboardLayout title={"Dashboard"}>
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
