import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

class db {
    static init() {
        const host = process.env.DB_HOST as string;
        const database = process.env.DB_NAME as string;
        const user = process.env.DB_USER as string;
        const password = process.env.DB_PASSWORD as string;

        return new Sequelize(database, user, password, {
            host: host,
            dialect: 'mysql',
            logging: false
        });
    }
}

export default db;