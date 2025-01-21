"use client";

import { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface FinancialData {
    date: string;
    profit: string; 
}

interface ProfitChartProps {
    financials: FinancialData[];
}

const ProfitChart: React.FC<ProfitChartProps> = ({ financials }) => {
    const profitData = financials.map(item => {
        const parsedProfit = parseFloat(item.profit);
        return isNaN(parsedProfit) ? 0 : parsedProfit;
    });

    useEffect(() => {
        const canvas = document.getElementById('profitChart') as HTMLCanvasElement | null;

        if (!canvas) {
            console.warn('Canvas element not found for profit chart');
            return;
        }

        const ctx = canvas.getContext('2d');

        if (!ctx) {
            console.warn('Failed to get 2D context for profit chart');
            return;
        }

        
        const labels = financials.map(item => {
            const dateValue = new Date(item.date);
            return isNaN(dateValue.getTime()) ? 'Invalid Date' : dateValue.toISOString().split('T')[0];
        });

        const chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Monthly Profit',
                        data: profitData,
                        borderColor: 'rgba(0, 123, 255, 1)',
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
                            text: 'Profit ($)',
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
        return <p className="text-center">No profit data available.</p>;
    }

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px' }}>
            <canvas id="profitChart"></canvas>
        </div>
    );
};

export default ProfitChart;
