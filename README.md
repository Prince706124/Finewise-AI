# FinWise AI 💰🤖

An AI-powered Personal Finance Management Platform built using the MERN Stack (MongoDB, Express.js, React.js, Node.js) with Gemini AI integration. FinWise AI helps users track income, manage expenses, create budgets, analyze spending habits, and receive personalized AI-powered financial insights.

---

## 🚀 Features

### 🔐 Authentication & Security

* User Registration and Login
* JWT Authentication
* Protected Routes
* Password Change Functionality
* Secure API Access

### 📊 Dashboard Analytics

* Total Income Overview
* Total Expense Overview
* Current Balance Calculation
* Monthly Growth Indicators
* Expense Distribution Charts
* Recent Transactions Section

### 💵 Income Management

* Add Income Sources
* Edit Income Records
* Delete Income Records
* Income History Tracking

### 💸 Expense Management

* Add Expenses
* Edit Expenses
* Delete Expenses
* Expense Categorization
* Expense History Tracking

### 🏷️ Categories Management

* Create Custom Categories
* Update Categories
* Delete Categories
* Icon Support for Categories

### 🎯 Budget Management

* Set Monthly Budgets
* Category-wise Budget Planning
* Budget Usage Tracking
* Budget Exceeded Warnings
* Remaining Budget Calculation

### 📈 Reports & Insights

* Monthly Financial Summary
* Savings Percentage Analysis
* Highest Spending Category Detection
* Financial Observations
* AI-Generated Recommendations

### 🤖 AI Advisor

* Personalized Financial Insights
* Spending Analysis
* Budget Analysis
* Saving Recommendations
* Financial Health Overview

### 💬 AI Financial Chat

* Interactive Financial Assistant
* Personalized Advice Based on User Data
* Budgeting Guidance
* Expense Reduction Suggestions
* Savings Improvement Recommendations

### ⚙️ Settings

* Profile Management
* Income Goals
* Savings Targets
* Currency Preferences
* Dark Mode Support
* Monthly Reminder Settings

### 🌙 Dark Mode

* Light/Dark Theme Toggle
* Persistent User Preferences
* Improved User Experience

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Recharts
* React Router
* Axios
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt.js

### AI Integration

* Google Gemini API

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 📂 Project Structure

```bash
FineWise-AI
│
├── Frontend
│   ├── src
│   │   ├── Components
│   │   ├── Pages
│   │   ├── Context
│   │   ├── Routes
│   │   ├── Utils
│   │   └── api
│
├── Backend
│   ├── Controllers
│   ├── Models
│   ├── Routes
│   ├── Middleware
│   ├── Services
│   ├── Config
│   └── server.js
│
└── README.md
```

---

## ⚡ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/finwise-ai.git
cd finwise-ai
```

### Backend Setup

```bash
cd Backend

npm install
```

Create `.env`

```env
PORT=5000

MONGO_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

Start Backend

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd Frontend

npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Start Frontend

```bash
npm run dev
```

---

## 🔑 Environment Variables

### Backend

```env
PORT=
MONGO_URL=
JWT_SECRET=
GEMINI_API_KEY=
```

### Frontend

```env
VITE_API_URL=
```

---

## 📸 Screenshots

Add screenshots of:

* Login Page
* Dashboard
* Income Management
* Expense Management
* Budgets
* Reports
* AI Advisor
* AI Chat
* Settings Page

---

## 🎯 Future Improvements

* PDF Report Export
* Email Financial Reports
* Receipt OCR Scanner
* Recurring Transactions
* Voice-Based AI Advisor
* Predictive Expense Analysis
* AI Budget Forecasting
* Multi-Currency Support


## ⭐ If you like this project

Give this repository a star and feel free to contribute.
