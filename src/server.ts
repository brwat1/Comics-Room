import express from 'express';
import mysql from 'mysql';
import routes from './routes/routes';
import dotenv from 'dotenv';

dotenv.config()
const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log(`Server running on: $' ${port}`)
})