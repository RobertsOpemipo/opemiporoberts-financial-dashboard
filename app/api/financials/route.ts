import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT || '3306', 10), 
};

export async function GET() {
    let connection;

    try {
        connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM financial_data');

        if (Array.isArray(rows) && rows.length === 0) {
            return NextResponse.json({ message: 'No data found' }, { status: 404 });
        }

        return NextResponse.json(rows);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error during database operation:', {
                message: error.message,
                stack: error.stack,
            });

            return NextResponse.json(
                { error: 'An error occurred while retrieving data.', details: error.message },
                { status: 500 }
            );
        }

        console.error('Unknown error:', JSON.stringify(error));
        return NextResponse.json(
            { error: 'An unknown error occurred.' },
            { status: 500 }
        );
    } finally {
        if (connection) {
            try {
                await connection.end();
            } catch (closeError) {
                if (closeError instanceof Error) {
                    console.error('Error closing the database connection:', {
                        message: closeError.message,
                        stack: closeError.stack,
                    });
                } else {
                    console.error(
                        'Unknown error occurred while closing the connection:',
                        JSON.stringify(closeError)
                    );
                }
            }
        }
    }
}
