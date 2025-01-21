"use client";

import { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface FinancialData {
    date: string;
    profit: string;  // Profit is passed as a string to handle CSV import, for example
}

interface ProfitChartProps {
    financials: FinancialData[];
}

const ProfitChart: React.FC<ProfitChartProps> = ({ financials }) => {
    const profitData = financials.map(item => {
        // Parsing profit and handling potential errors with default value of 0
        const parsedProfit = parseFloat(item.profit);
        return isNaN(parsedProfit) ? 0 : parsedProfit;
    });

    useEffect(() => {
        const renderChart = () => {
            try {
                const canvas = document.getElementById('profitChart') as HTMLCanvasElement | null;

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

                return chartInstance;
            } catch (error) {
                console.error('An error occurred while rendering the chart:', error);
            }
        };

        const chartInstance = renderChart();

        // Cleanup on component unmount or when `financials` changes
        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [financials]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px' }}>
            <canvas id="profitChart" style={{ width: '100%', height: '100%' }}></canvas>
        </div>
    );
};

export default ProfitChart;
