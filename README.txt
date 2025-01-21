# Financial Dashboard Application

## Description
The Financial Dashboard Application is a web-based tool designed to help users track and manage their financial metrics easily. Users can visualize key financial data, such as revenue, expenses, and profit, through interactive charts. The application also allows for CSV file uploads to import financial data, providing a seamless user experience.

## Features
- **Data Visualization**: 
  - Total Revenue
  - Total Expenses
  - Total Profit
  - Monthly Revenue Chart
  - Monthly Expenses Chart
  - Monthly Profit Chart
  - Customer Count over Time Chart
  - Revenue vs. Expenses Analysis Chart
  - Profit vs. Customer Count Chart
- **CSV Upload**: Users can upload CSV files to import financial data directly into the application.
- **Responsive Design**: Optimized for both mobile and desktop devices.

## Components
### Frontend Components
- **Dashboard**: The main component that aggregates financial data and displays various metrics and charts.
- **CsvUpload**: Component that facilitates the upload of CSV files to import financial data.
- **ExpensesChart**: Displays a chart of monthly expenses.
- **RevenueChart**: Displays a chart of monthly revenue.
- **ProfitChart**: Displays a chart of monthly profit.
- **CustomerCountChart**: Shows customer counts over time.
- **RevenueVsExpensesChart**: Analyzes and compares total revenue against total expenses.
- **ProfitVsCustomerCountChart**: Compares profit with customer counts.

### Technologies Used
- **Frontend**: 
  - React (for building user interfaces)
  - JavaScript
  - HTML
  - CSS
- **Backend**: 
  - Node.js (for server-side logic)
  - Express.js (for creating the API)
- **Database**: MySQL
- **Data Visualization**: Chart.js for rendering interactive charts.
- **Authentication**: NextAuth for managing user sessions.

## Prerequisites
- Node.js (v14 or later)
- npm (v6 or later) or Yarn
- MySQL (v7 or later)

## CSV Upload

To upload a CSV file, follow these steps:
1. Click on the "+" button on the dashboard.
2. Select the CSV file from your local machine.
3. Make sure that the CSV file has a date format of (yyyy-mm-dd)
