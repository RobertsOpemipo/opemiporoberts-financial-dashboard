"use client";

import { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ProfitChart = ({ financials }) => {
    const calculateAverage = (data) => {
        const total = data.reduce((acc, curr) => acc + curr, 0);
        return data.length ? total / data.length : 0; 
    };

    const profitData = financials.map(item => item.profit || 0);
    const averageProfit = calculateAverage(profitData);

    useEffect(() => {
        try {
            const ctx = document.getElementById('profitChart').getContext('2d');

            const labels = financials.map(item => {
                const dateValue = new Date(item.date);
                return isNaN(dateValue.getTime()) ? 'Invalid Date' : dateValue.toISOString().split('T')[0];
            });

            const chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Monthly Profit',
                        data: profitData,
                        borderColor: 'rgba(0, 0, 255, 1)',
                        borderWidth: 2,
                        fill: false, 
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // Allow the chart to fill the container
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
                        ctx.strokeStyle = 'rgba(0, 0, 255, 1)';
                        ctx.lineWidth = 2;
                        const avgY = bottom - (averageProfit / Math.max(...profitData) * height);
                        ctx.beginPath();
                        ctx.moveTo(left, avgY);
                        ctx.lineTo(right, avgY);
                        ctx.stroke();
                        ctx.restore();

                        ctx.fillStyle = 'rgba(0, 0, 255, 1)';
                        ctx.font = '12px Arial';
                        ctx.fillText(`Avg: $${averageProfit.toFixed(2)}`, right - 100, avgY - 10);
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
    }, [financials, averageProfit]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px' }}>
            <canvas id="profitChart" style={{ width: '100%', height: '100%' }}></canvas>
        </div>
    );
};

export default ProfitChart;