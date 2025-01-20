"use client";

import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title);

const ProfitVsCustomerCountChart = ({ financials }) => {
    const data = financials.map(item => ({
        x: parseFloat(item.customer_count),
        y: parseFloat(item.profit),
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
                    callback: function(value) {
                        return '$' + value; 
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