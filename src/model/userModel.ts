import db from './db';
import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';

const sequelize = db.init();

class User extends Model {
    public id!: number;
    public email!: string;
    public username!: string;
    public password!: string;
    public token!: string;

    public comparePassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }

    public encryptPassword(password: string): string {
        return bcrypt.hashSync(password, 10);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isEmail: true,
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'users',
        hooks: {
            beforeCreate: (user) => {
                user.email = user.email.trim().toLowerCase();
                user.username = user.username.trim().toLowerCase();
                user.password = user.encryptPassword(user.password);
            },
        },
    }
);

export default User;