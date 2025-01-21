"use client";

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions, ChartData, TickOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface FinancialData {
    date: string;
    revenue: number;
    expenses: number;
    profit?: number;
    customer_count?: number;
}

interface RevenueVsExpensesChartProps {
    financials: FinancialData[];
}

const RevenueVsExpensesChart: React.FC<RevenueVsExpensesChartProps> = ({ financials }) => {
    if (!financials || financials.length === 0) {
        return (
            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-bold">Monthly Revenue vs. Expenses</h2>
                <p>No data available</p>
            </div>
        );
    }

    const chartData: ChartData<'bar'> = {
        labels: financials.map(item => new Date(item.date).toLocaleDateString()),
        datasets: [
            {
                label: 'Revenue',
                data: financials.map(item => item.revenue),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Expenses',
                data: financials.map(item => item.expenses),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Profit',
                data: financials.map(item => item.revenue - item.expenses),
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Revenue vs. Expenses',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount ($)',
                },
                beginAtZero: true,
                ticks: {
                    
                    max: Math.max(...financials.map(item => Math.max(item.revenue, item.expenses, 0))) || 10000,
                } as unknown as TickOptions, 
            },
        },
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default RevenueVsExpensesChart;
