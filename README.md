# Policy Management Dashboard

A simple Policy Management Dashboard built with **React**, **Tailwind CSS**, and **Material Tailwind**.  
This project demonstrates a basic CRUD-like interface with filtering, sorting, pagination, and a responsive UI.

---

## ✅ Features

- Policy listing table
- Filters:
  - Search by policy ID or holder name (debounced)
  - Filter by policy status (Active / Pending / Expired)
  - Date range filter (From / To)
  - Reset filters
- Sorting:
  - Sort by Premium
  - Sort by Start Date
- Pagination (10 items per page)
- Responsive UI
- Loader + Empty state
- Reusable components

---

## 🧱 Tech Stack

- React
- Tailwind CSS
- Material Tailwind
- Hooks-based state management 
- Mock data for policies 

---

## 📁 Project Structure

src/
├─ components/
│ ├─ Dashboard.jsx
│ ├─ Filters.jsx
│ ├─ PolicyTable.jsx
│ ├─ Loader.jsx
│ ├─ Layout.jsx
├─ data/
│ └─ policies.js
├─ hooks/
│ └─ useDebounce.js
├─ dashboard_img/
│ └─ dashboard-img
├─ App.jsx
├─ index.js


---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install

To run the app

npm start
