"use client";

import { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface FinancialData {
    date: string | number | Date;
    revenue: number; // Adjust type if necessary
}

interface RevenueChartProps {
    financials: FinancialData[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ financials }) => {
    const revenueData = financials.map(item => item.revenue || 0);

    useEffect(() => {
        const canvas = document.getElementById('revenueChart') as HTMLCanvasElement | null;

        if (!canvas) {
            throw new Error('Chart context not found');
        }

        const ctx = canvas.getContext('2d');

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