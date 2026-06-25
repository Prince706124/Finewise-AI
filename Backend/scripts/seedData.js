import mongoose from "mongoose";
import dotenv from "dotenv";

import Income from "../Models/Income.js";
import Expense from "../Models/Expense.js";

dotenv.config({
  path: "./.env",
});

console.log(process.env.MONGO_URL);

await mongoose.connect(process.env.MONGO_URL);

const USER_ID = new mongoose.Types.ObjectId("6a159d8c9310c2852289f21a");
const incomeSources = [
  "Salary",
  "Freelancing",
  "Business",
  "Investment",
  "Bonus",
];

const expenseCategories = [
  "Food",
  "Transport",
  "Shopping",
  "Rent",
  "Entertainment",
  "Healthcare",
  "Education",
  "Travel",
];

const paymentMethods = ["Cash", "UPI", "Credit Card", "Debit Card"];
function randomAmount(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate() {
  const start = new Date(2024, 0, 1).getTime();
  const end = new Date().getTime();

  return new Date(start + Math.random() * (end - start));
}
const incomes = [];
const expenses = [];

for (let i = 0; i < 1000; i++) {
  incomes.push({
    user: USER_ID,
    source: randomItem(incomeSources),
    amount: randomAmount(1000, 100000),
    date: randomDate(),
    paymentMethod: randomItem(paymentMethods),
    notes: "Generated Data",
  });

  expenses.push({
    user: USER_ID,
    title: randomItem([
      "Restaurant",
      "Groceries",
      "Uber",
      "Amazon",
      "Electricity Bill",
      "Movie",
      "Medical",
      "College Fees",
    ]),
    category: randomItem(expenseCategories),
    amount: randomAmount(50, 10000),
    date: randomDate(),
    paymentMethod: randomItem(paymentMethods),
    notes: "Generated Data",
  });
}
try {
  console.log("Inserting Income...");
  console.log("Income Records:", incomes.length);
  console.log("Expense Records:", expenses.length);

  await Income.insertMany(incomes);

  console.log("Inserting Expenses...");

  await Expense.insertMany(expenses);

  console.log("✅ Data Inserted Successfully");

  process.exit();
} catch (error) {
  console.error(error);

  process.exit(1);
}
