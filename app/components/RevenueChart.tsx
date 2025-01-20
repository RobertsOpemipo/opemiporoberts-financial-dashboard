/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const RevenueChart = ({ financials }) => {
    

    const revenueData = financials.map((item: { revenue: any; }) => item.revenue || 0); 
    




    useEffect(() => {
        const ctx = document.getElementById('revenueChart').getContext('2d');

        const labels = financials.map((item: { date: string | number | Date; }) => {
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
                    backgroundColor: 'rgba(75, 192, 192, 0)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false, 
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
                            callback: (value) => `$${value}` 
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



        return () => {
            chartInstance.destroy();
        };
    }, [financials]);

    return <canvas id="revenueChart"></canvas>;
};

export default RevenueChart;