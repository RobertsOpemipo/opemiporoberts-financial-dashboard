"use client";

import { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface FinancialData {
    date: string | Date;
    revenue: number;
}

interface RevenueChartProps {
    financials: FinancialData[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ financials }) => {
    
    const revenueData = financials.map((item) => item.revenue || 0);

    useEffect(() => {
        const canvas = document.getElementById('revenueChart') as HTMLCanvasElement | null;

        if (!canvas) {
            console.error('Canvas element not found');
            return;
        }

        const ctx = canvas.getContext('2d');

        if (!ctx) {
            console.error('Chart context not found');
            return;
        }

        
        const labels = financials.map((item) => {
            const date = new Date(item.date);
            return !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : 'Invalid Date';
        });

        
        const chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Monthly Revenue',
                        data: revenueData,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
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
                            text: 'Revenue ($)',
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

        
        return () => {
            chartInstance.destroy();
        };
    }, [financials]);

    
    if (financials.length === 0) {
        return <p className="text-center">No financial data available.</p>;
    }

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px' }}>
            <canvas id="revenueChart"></canvas>
        </div>
    );
};

export default RevenueChart;
