import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config()

const host = process.env.DB_HOST
const database = process.env.DB_NAME
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD

const connection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
});

// Établir la connexion à la base de données
connection.connect((error) => {
    if (error) {
        console.error('Erreur de connexion à la base de données :', error);
        return;
    }

    console.log('Database link established.');

    const createSchemaQuery = `CREATE SCHEMA IF NOT EXISTS ` + database;
    connection.query(createSchemaQuery, (error, results) => {
        if (error) {
            console.error('Error occured while creating the schema :', error);
        } else {
            console.log('Schema created');
        }

        connection.end();
    });
});