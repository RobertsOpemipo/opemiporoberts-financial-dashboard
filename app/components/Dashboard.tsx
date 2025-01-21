"use client";

import { useEffect, useState } from 'react';
import ExpensesChart from './ExpensesChart';
import RevenueChart from './RevenueChart';
import ProfitChart from './ProfitChart';
import CustomerCountChart from './CustomerCountChart';
import RevenueVsExpensesChart from './RevenueVsExpensesChart';
import ProfitVsCustomerCountChart from './ProfitVsCustomerCountChart';
import CsvUpload from './CsvUpload'; 

const Dashboard = () => {
    const [financials, setFinancials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Ensure error state is typed as string or null

    useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('/api/financials');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFinancials(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);  
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };
    fetchData();
}, []);


    const totalRevenue = financials.reduce((acc, curr) => acc + parseFloat(curr.revenue) || 0, 0);
    const totalExpenses = financials.reduce((acc, curr) => acc + parseFloat(curr.expenses) || 0, 0);
    const profit = totalRevenue - totalExpenses;

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    const handleCsvUpload = (data: any[]) => {
        const updatedFinancials = data.map((row) => ({
            date: row.date,
            revenue: parseFloat(row.revenue) || 0,
            expenses: parseFloat(row.expenses) || 0,
            profit: parseFloat(row.profit) || 0,
            customer_count: parseInt(row.customer_count, 10) || 0,
        }));
        setFinancials((prev) => [...prev, ...updatedFinancials]);
    };

    return (
        <div className="flex flex-col h-screen">
            <header className="flex justify-between items-center p-4 bg-white-800 text-black shadow-md fixed w-full z-10">
                <h1 className="lg:text-3xl text-md font-bold">Financial Dashboard</h1>
                <div className="flex items-center">
                    <img src="images/profile.jpg" alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Sign Out
                    </button>
                </div>
            </header>

            <div className="p-4 mt-20 flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="text-white shadow-md rounded-lg p-8 bg-green-500 flex flex-col items-center justify-center h-full">
                        <h2 className="lg:text-3xl text-xl font-bold text-center pb-3">Total Revenue</h2>
                        <p className="text-2xl text-center font-bold">${totalRevenue.toFixed(2)}</p>
                    </div>
                    <div className="bg-red-500 shadow-md rounded-lg text-white p-8 flex flex-col items-center justify-center h-full">
                        <h2 className="lg:text-3xl text-xl font-bold text-center pb-3">Total Expenses</h2>
                        <p className="text-2xl text-center font-bold">${totalExpenses.toFixed(2)}</p>
                    </div>
                    <div className="bg-blue-500 shadow-md text-white rounded-lg p-8 flex flex-col items-center justify-center h-full">
                        <h2 className="lg:text-3xl text-xl font-bold text-center pb-3">Profit</h2>
                        <p className="text-2xl text-center font-bold">${profit.toFixed(2)}</p>
                    </div>
                </div>

                <div className="mt-8">
                    <CsvUpload onUpload={handleCsvUpload} />
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-bold">Monthly Revenue</h2>
                        <RevenueChart financials={financials} />
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-bold">Monthly Expenses</h2>
                        <ExpensesChart financials={financials} />
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-bold">Monthly Profit</h2>
                        <ProfitChart financials={financials}  />
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-bold">Customer Count over Time</h2>
                        <CustomerCountChart financials={financials} />
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-bold">Revenue and Expenses Analysis</h2>
                        <RevenueVsExpensesChart financials={financials} />
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-xl font-bold">Profit vs. Customer Count</h2>
                        <ProfitVsCustomerCountChart financials={financials} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
