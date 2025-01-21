"use client";

import { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ExpensesChart = ({ financials }) => {
    

    const expensesData = financials.map(item => item.expenses || 0);

    useEffect(() => {
        try {
            const ctx = document.getElementById('expensesChart').getContext('2d');

            const labels = financials.map(item => {
                const dateValue = new Date(item.date);
                return isNaN(dateValue) ? 'Invalid Date' : dateValue.toISOString().split('T')[0];
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
            alert('An error occurred while rendering the chart: ' + error.message);
        }
    }, [financials]);

    return <canvas id="expensesChart"></canvas>;
};

export default ExpensesChart;