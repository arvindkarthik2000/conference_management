// lib/db.js
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost', // Update with your MySQL host
  user: 'root', // Update with your MySQL username
  password: '1234', // Update with your MySQL password
  database: 'conference_db', // Update with your MySQL database name
});

export default db;
