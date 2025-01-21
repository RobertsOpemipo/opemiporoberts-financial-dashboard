"use client";

import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title);

// Define the structure of the financial data
interface FinancialData {
    customer_count: string | number;
    profit: string | number;
}

// Props type for the chart component
interface ProfitVsCustomerCountChartProps {
    financials: FinancialData[];
}

const ProfitVsCustomerCountChart: React.FC<ProfitVsCustomerCountChartProps> = ({ financials }) => {
    const data = financials.map(item => ({
        x: parseFloat(String(item.customer_count)) || 0,
        y: parseFloat(String(item.profit)) || 0,
    }));

    const chartData = {
        datasets: [
            {
                label: 'Profit vs Customer Count',
                data,
                backgroundColor: 'rgba(75, 192, 192, 1)',
                pointRadius: 5,
                pointHoverRadius: 7,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
            },
            title: {
                display: true,
                text: 'Profit vs Customer Count',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Customer Count',
                },
                beginAtZero: true,
            },
            y: {
                title: {
                    display: true,
                    text: 'Profit',
                },
                beginAtZero: true,
                ticks: {
                    callback: function (tickValue: string | number) {
                        // Ensure tickValue is coerced into a number for formatting
                        const value = typeof tickValue === 'string' ? parseFloat(tickValue) : tickValue;
                        return `$${value}`;
                    },
                    max: 5000,
                },
            },
        },
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                <Scatter data={chartData} options={options} />
            </div>
        </div>
    );
};

export default ProfitVsCustomerCountChart;
