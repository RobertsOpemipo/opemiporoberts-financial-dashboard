"use client";

import { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const RevenueChart = ({ financials }) => {
    const calculateAverage = (data) => {
        const total = data.reduce((acc, curr) => acc + curr, 0);
        return data.length ? total / data.length : 0; // Check if data is not empty
    };

    const revenueData = financials.map(item => item.revenue || 0); 
    const averageRevenue = calculateAverage(revenueData);

    // Debugging logs
    console.log('Revenue Data:', revenueData);
    console.log('Average Revenue:', averageRevenue);

    useEffect(() => {
        const ctx = document.getElementById('revenueChart').getContext('2d');

        const labels = financials.map(item => {
            const dateValue = new Date(item.date);
            return isNaN(dateValue) ? 'Invalid Date' : dateValue.toISOString().split('T')[0];
        });

        const chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Monthly Revenue',
                    data: revenueData,
                    backgroundColor: 'rgba(75, 192, 192, 0)', // No fill
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false, // Disable filling under the line
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Revenue ($)'
                        },
                        ticks: {
                            callback: (value) => `$${value}` // Add dollar sign to y-axis labels
                        }
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

        // Draw average line
        const drawAverageLine = () => {
            const averageLine = {
                id: 'averageLine',
                beforeDraw: (chart) => {
                    const { ctx, chartArea: { top, bottom, left, right, height } } = chart;
                    ctx.save();
                    ctx.strokeStyle = 'rgba(255, 99, 132, 1)'; // Average line color
                    ctx.lineWidth = 2;

                    // Calculate average Y position
                    const maxRevenue = Math.max(...revenueData);
                    const avgY = maxRevenue ? bottom - (averageRevenue / maxRevenue * height) : bottom; // Handle zero max

                    ctx.beginPath();
                    ctx.moveTo(left, avgY);
                    ctx.lineTo(right, avgY);
                    ctx.stroke();
                    ctx.restore();

                    // Draw average revenue label
                    ctx.fillStyle = 'rgba(255, 99, 132, 1)';
                    ctx.font = '12px Arial';
                    ctx.fillText(`Avg: $${averageRevenue.toFixed(2)}`, right - 100, avgY - 10); // Adjust position as needed
                }
            };

            Chart.register(averageLine);
            chartInstance.update(); // Ensure the chart updates to draw the average line
        };

        drawAverageLine();

        return () => {
            chartInstance.destroy();
        };
    }, [financials, averageRevenue]);

    return <canvas id="revenueChart"></canvas>;
};

export default RevenueChart;