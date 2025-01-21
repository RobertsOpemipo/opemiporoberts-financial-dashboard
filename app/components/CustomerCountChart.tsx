"use client";

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TooltipItem } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface FinancialData {
    date: string;
    customer_count?: number;
}

interface CustomerCountChartProps {
    financials: FinancialData[];
}

const CustomerCountChart: React.FC<CustomerCountChartProps> = ({ financials }) => {
    if (!financials || financials.length === 0) {
        return (
            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-bold">Customer Count Over Time</h2>
                <p>No data available</p>
            </div>
        );
    }

    const customerCounts = financials.map((item) => item.customer_count ?? 0);

    const chartData = {
        labels: financials.map((item) => new Date(item.date).toLocaleDateString()),
        datasets: [
            {
                label: 'Customer Count',
                data: customerCounts,
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'x' as const,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Customer Count Over Time',
            },
            tooltip: {
                callbacks: {
                    label: (context: TooltipItem<'bar'>) => `Count: ${context.raw}`,
                },
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
                    text: 'Customer Count',
                },
                beginAtZero: true,
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

export default CustomerCountChart;
