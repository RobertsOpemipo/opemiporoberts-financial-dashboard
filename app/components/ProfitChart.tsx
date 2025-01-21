"use client";

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { format } from 'date-fns';

Chart.register(...registerables);

interface FinancialData {
    date: string;
    profit: number;
}

interface ProfitChartProps {
    financials: FinancialData[];
}

const ProfitChart: React.FC<ProfitChartProps> = ({ financials }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const labels = financials.map(item => {
            try {
                return format(new Date(item.date), 'yyyy-MM-dd');
            } catch {
                return 'Invalid Date';
            }
        });

        const profitData = financials.map(item => item.profit || 0);

        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
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
                            callback: value => `$${value}`,
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
            chartRef.current?.destroy();
        };
    }, [financials]);

    if (financials.length === 0) {
        return <p className="text-center">No profit data available.</p>;
    }

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px' }}>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default ProfitChart;
