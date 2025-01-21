"use client";

import React, { useRef } from "react";

type CsvUploadProps = {
    onUpload: (data: {
        date: string;
        revenue: number;
        expenses: number;
        profit: number;
        customer_count: number;
    }[]) => void;
};

const CsvUpload: React.FC<CsvUploadProps> = ({ onUpload }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                const rows = text.split("\n").map((row) =>
                    row.split(",").map((cell) => cell.trim())
                );

                const headers = ["date", "revenue", "expenses", "profit", "customer_count"];
                const data = rows
                    .slice(1)
                    .filter((row) => row.length === headers.length && row[0] !== "")
                    .map((row) => {
                        return {
                            date: row[0],
                            revenue: parseFloat(row[1]) || 0,
                            expenses: parseFloat(row[2]) || 0,
                            profit: parseFloat(row[3]) || 0,
                            customer_count: parseInt(row[4], 10) || 0,
                        };
                    });

                const filteredData = data.filter(
                    (row) =>
                        !isNaN(row.revenue) &&
                        !isNaN(row.expenses) &&
                        !isNaN(row.profit) &&
                        !isNaN(row.customer_count)
                );

                onUpload(filteredData);
            };
            reader.readAsText(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
            <button
                onClick={handleButtonClick}
                className="fixed bottom-5 right-5 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                aria-label="Upload CSV"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                    />
                </svg>
            </button>
        </>
    );
};

export default CsvUpload;
