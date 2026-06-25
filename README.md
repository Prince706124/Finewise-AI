# FinWise AI

> **AI-Powered Personal Finance Management Platform**

FinWise AI is a production-ready full-stack personal finance management platform that enables users to manage income, expenses, budgets, and financial reports while receiving AI-powered financial insights. The application is optimized for scalability using MongoDB Aggregation Pipelines, Redis caching, database indexing, and concurrent query execution.

---

# Live Demo

**Frontend:** https://finewise-ai.vercel.app

**Backend API:** https://finewise-ai.onrender.com

---

# Key Highlights

* AI-powered financial assistant using Google Gemini
* JWT cookie-based authentication
* MongoDB Aggregation Pipelines
* Redis Cache (Cache-Aside Pattern)
* Compound Database Indexing
* Server-side Pagination
* Lean Queries & Field Projection
* Parallel Database Queries using Promise.all
* Helmet Security Middleware
* Response Compression
* API Rate Limiting
* Dockerized Redis
* Performance Benchmarking with Autocannon

---

# Features

## Authentication

* User Registration & Login
* JWT Cookie Authentication
* Protected Routes
* Secure Password Hashing
* Authorization Middleware

---

## Income & Expense Management

* Create, Update and Delete Income
* Create, Update and Delete Expenses
* Transaction History
* Category Management
* Monthly Financial Tracking

---

## Budget Management

* Monthly Budgets
* Category-wise Budget Limits
* Overspending Alerts
* Savings Tracking

---

## Analytics Dashboard

* Monthly Income
* Monthly Expenses
* Savings Analysis
* Growth Statistics
* Expense Distribution Charts
* Recent Transactions
* Category Analytics

---

## AI Features

* AI Financial Advisor
* Personalized Spending Analysis
* Budget Recommendations
* Financial Health Insights
* Conversational AI Chat

---

# Backend Optimizations

## Database

* Compound Indexes for frequently queried collections
* MongoDB Aggregation Pipelines for dashboard analytics
* Lean Queries to reduce memory overhead
* Field Projection to minimize data transfer
* Promise.all for concurrent database execution

---

## Performance

* Redis Cache (Cache-Aside Strategy)
* Cache Invalidation on Income/Expense Updates
* Response Compression
* Performance Profiling
* Load Testing using Autocannon

### Performance Improvements

| API       | Before  | After   |
| --------- | ------- | ------- |
| Dashboard | ~819 ms | ~114 ms |
| Income    | ~450 ms | ~115 ms |
| Expense   | ~450 ms | ~110 ms |

Dashboard latency was reduced by approximately **86%** after applying indexing, aggregation pipelines, concurrent execution, lean queries and Redis caching.

---

## Security

* Helmet Security Headers
* API Rate Limiting
* JWT Cookie Authentication
* Password Hashing with bcrypt

---

# Screenshots

*(Keep your existing screenshots section here.)*

---

# Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* Recharts
* React Router DOM
* React Icons

---

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Redis
* JWT
* bcrypt
* Helmet
* Compression
* Express Rate Limit

---

## AI

* Google Gemini API

---

## DevOps

* Docker
* Render
* Vercel

---

# Architecture

```text
                    React + Vite
                          │
                          ▼
               Express.js + Node.js
                          │
          ┌───────────────┴───────────────┐
          ▼                               ▼
      Redis Cache                 MongoDB Atlas
(Cache Aside Pattern)                  │
          │                            │
          └──────────────┬─────────────┘
                         ▼
                Aggregation Pipeline
                         │
                         ▼
                  JSON API Response
                         │
                         ▼
                 Google Gemini API
```

---

# Performance Optimizations

* Compound MongoDB Indexes
* Aggregation Pipelines
* Promise.all
* Lean Queries
* Field Projection
* Server-side Pagination
* Redis Cache
* Cache Invalidation
* Response Compression
* Helmet Security
* API Rate Limiting

---

# Installation

*(Keep your installation section.)*

---

# Environment Variables

### Backend

```env
PORT=
MONGO_URL=
JWT_SECRET=
REDIS_URL=
GEMINI_API_KEY=
FRONTEND_URL=
NODE_ENV=
```

### Frontend

```env
VITE_API_URL=
```

---

# Deployment

Frontend: **Vercel**

Backend: **Render**

Database: **MongoDB Atlas**

Cache: **Render Key Value (Redis)**

---

# Future Enhancements

* OCR Receipt Scanner
* Recurring Transactions
* Predictive Expense Forecasting
* PDF Financial Reports
* Email Reports
* Multi-Currency Support

---

# Author

Prince Raj

B.Tech, IIT Kharagpur

---

# License

This project is intended for educational and portfolio purposes.
