import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'financial_dashboard',
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
        console.error('Error during database operation:', {
            message: error.message,
            stack: error.stack,
        });

        return NextResponse.json(
            { error: 'An error occurred while retrieving data.', details: error.message },
            { status: 500 }
        );
    } finally {
        if (connection) {
            try {
                await connection.end();
            } catch (closeError) {
                console.error('Error closing the database connection:', closeError.message);
            }
        }
    }
}
