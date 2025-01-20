"use client";

import { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ProfitChart = ({ financials }) => {

    const profitData = financials.map(item => item.profit || 0);
    

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
                    maintainAspectRatio: false, 
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

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px' }}>
            <canvas id="profitChart" style={{ width: '100%', height: '100%' }}></canvas>
        </div>
    );
};

export default ProfitChart;