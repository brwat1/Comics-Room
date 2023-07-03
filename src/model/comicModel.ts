import db from './db';
import { DataTypes, Model } from 'sequelize';

const sequelize = db.init();

class Comic extends Model {
    public isbn!: string;
    public author!: number;
    public volume!: number;
    public title!: string;
    public series!: number;
    public collection!: number;
    public publisher!: number;
    public release_date!: number;
    public content!: number;
    public page_count!: number;
}

Comic.init(
    {
        isbn: {
            type: DataTypes.STRING(255),
            primaryKey: true,
        },
        author: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        volume: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        series: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        collection: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        publisher: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        release_date: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        content: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        page_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'comics',
        modelName: 'Comic',
    }
);

export default Comic;