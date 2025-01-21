"use client";

import { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface FinancialData {
    date: string;
    expenses: number;
}

interface ExpensesChartProps {
    financials: FinancialData[];
}

const ExpensesChart: React.FC<ExpensesChartProps> = ({ financials }) => {
    useEffect(() => {
        const canvas = document.getElementById('expensesChart') as HTMLCanvasElement;

        if (!canvas) {
            console.error('Canvas element not found for expenses chart');
            return;
        }

        const ctx = canvas.getContext('2d');

        if (!ctx) {
            console.error('Failed to get 2D context for expenses chart');
            return;
        }

        // Prepare labels and data
        const labels = financials.map((item) => {
            const dateValue = new Date(item.date);
            return !isNaN(dateValue.getTime())
                ? dateValue.toISOString().split('T')[0]
                : 'Invalid Date';
        });

        const expensesData = financials.map((item) => item.expenses || 0);

        const chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Monthly Expenses',
                        data: expensesData,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2,
                        fill: false,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Expenses ($)',
                        },
                        ticks: {
                            callback: (value) => `$${value}`,
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Date',
                        },
                    },
                },
            },
        });

        // Cleanup on unmount
        return () => {
            chartInstance.destroy();
        };
    }, [financials]);

    // Fallback for empty data
    if (financials.length === 0) {
        return <p className="text-center">No expense data available.</p>;
    }

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px' }}>
            <canvas id="expensesChart"></canvas>
        </div>
    );
};

export default ExpensesChart;
