"use client";

import { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface FinancialData {
    date: string;
    expenses: string;
}

interface ExpensesChartProps {
    financials: FinancialData[];
}

const ExpensesChart: React.FC<ExpensesChartProps> = ({ financials }) => {
    const expensesData = financials.map(item => parseFloat(item.expenses) || 0);

    useEffect(() => {
        try {
            const ctx = document.getElementById('expensesChart')?.getContext('2d');

            if (!ctx) {
                throw new Error('Chart context not found');
            }

            const labels = financials.map(item => {
                const dateValue = new Date(item.date);
                return isNaN(dateValue.getTime()) ? 'Invalid Date' : dateValue.toISOString().split('T')[0];
            });

            const chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Monthly Expenses',
                        data: expensesData,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2,
                        fill: false,
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        }
                    }
                }
            });

            return () => {
                chartInstance.destroy();
            };
        } catch (error) {
            console.error('An error occurred while rendering the chart:', error);
        }
    }, [financials]);

    return <canvas id="expensesChart"></canvas>;
};

export default ExpensesChart;