import "./App.css";
import { Routes, Route } from "react-router";
import LandingPage from "./Pages/LandingPage";
import DashBoard from "./Pages/DashBoard";
import Setting from "./Pages/Setting";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Income from "./Pages/Income";
import Expense from "./Pages/Expense";
import Categories from "./Pages/Categories";
import Budgets from "./Pages/Budgets";
import AIAdvisor from "./Pages/AIAdvisor";
import Reports from "./Pages/Reports";
import AIChat from "./Pages/AI-Chat";
import Settings from "./Pages/Setting";
import ExpenseAll from "./Pages/ExpenseAll";
import IncomeHistory from "./Pages/incomeAll";
import Transactions from "./Pages/Transactions";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode");

    if (darkMode === "true") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dashboard" element={<DashBoard />}></Route>
        <Route path="/income" element={<Income />}></Route>
        <Route path="/income-all" element={<IncomeHistory />}></Route>
        <Route path="/expenses" element={<Expense />}></Route>
        <Route path="/transactions" element={<Transactions />}></Route>
        <Route path="/expenses-all" element={<ExpenseAll />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
        <Route path="/budgets" element={<Budgets />}></Route>
        <Route path="/reports" element={<Reports />}></Route>
        <Route path="/ai-advisor" element={<AIAdvisor />}></Route>
        <Route path="/ai-chat" element={<AIChat />}></Route>
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
