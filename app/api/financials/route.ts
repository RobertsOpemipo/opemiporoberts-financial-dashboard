import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'financial_dashboard',
};

export async function GET(req: Request) {
    let connection;

    try {
        connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM financial_data');


        if (rows.length === 0) {
            return NextResponse.json({ message: 'No data found' }, { status: 404 });
        }

        return NextResponse.json(rows);
    } catch (error) {
        console.error('Database connection error:', error);
        return NextResponse.json({ error: 'Database connection failed', details: error.message }, { status: 500 });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}