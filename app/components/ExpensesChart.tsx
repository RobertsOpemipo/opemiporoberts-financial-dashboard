"use client";

import { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ExpensesChart = ({ financials }) => {
    const calculateAverage = (data) => {
        const total = data.reduce((acc, curr) => acc + curr, 0);
        return data.length ? total / data.length : 0; 
    };

    const expensesData = financials.map(item => item.expenses || 0);
    const averageExpenses = calculateAverage(expensesData);

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
                        fill: false, // No fill
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

            const drawAverageLine = () => {
                const averageLine = {
                    id: 'averageLine',
                    beforeDraw: (chart) => {
                        const { ctx, chartArea: { bottom, left, right, height } } = chart;

                        ctx.save();
                        ctx.strokeStyle = 'rgba(75, 192, 192, 1)';
                        ctx.lineWidth = 2;
                        const avgY = bottom - (averageExpenses / Math.max(...expensesData) * height);
                        ctx.beginPath();
                        ctx.moveTo(left, avgY);
                        ctx.lineTo(right, avgY);
                        ctx.stroke();
                        ctx.restore();

                        ctx.fillStyle = 'rgba(75, 192, 192, 1)';
                        ctx.font = '12px Arial';
                        ctx.fillText(`Avg: $${averageExpenses.toFixed(2)}`, right - 100, avgY - 10);
                    }
                };

                Chart.register(averageLine);
                chartInstance.update();
            };

            drawAverageLine();

            return () => {
                chartInstance.destroy();
            };
        } catch (error) {
            alert('An error occurred while rendering the chart: ' + error.message);
        }
    }, [financials, averageExpenses]);

    return <canvas id="expensesChart"></canvas>;
};

export default ExpensesChart;