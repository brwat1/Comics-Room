import { Request, Response, NextFunction } from 'express';
import UserModel  from '../model/userModel';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const user = await UserModel.create({ email, username, password });
        res.status(201).json(user);
    } catch (e) {
        console.error('Error when creating user :', e);
        res.status(500).json({ message: 'An error has occurred when creating account' });
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email ) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const user = await UserModel.findOne({ where: { email: email } });
        res.status(201).json(user);
    } catch (e) {
        console.error('Error when fetching user :', e);
        res.status(500).json({ message: 'An error has occurred when fetching account' });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { email, username, oldPassword, newPassword } = req.body;
        const user = await UserModel.findOne({ where: { email: email } });

        if (user) {
            user.username = username;

            if (!user.comparePassword(oldPassword)) {
                return res.status(500).json({message: 'Theres a problem with the password'});
            }

            user.password = user.encryptPassword(newPassword);
            await user.save();

            return res.json(user);
        }

        return res.status(404).json({ message: 'User not found' });
    } catch (e) {
        console.error('Error when updating user :', e);
        res.status(500).json({ message: 'An error has occurred when updating account' });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ where: { email: email } });

        if (user) {
            await user.destroy();
            return res.json({ message: 'User deleted', status: 1 });
        }

        return res.status(404).json({message: 'User not found'})
    } catch (e) {
        console.error('Error when deleting user :', e);
        res.status(500).json({ message: 'An error has occurred when deleting account' });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Wrong data' });
        }

        const user = await UserModel.findOne({ where: { email: email } });

        if (user) {
            if (!user.comparePassword(password)) {
                return res.status(401).json({ message: 'Invalid data' });
            }

            const token = await generateToken(user.email);

            return res.status(200).json({ token: token });
        }

        return res.status(404).json({ message: 'Theres a problem fetching user' });
    } catch (e) {
        console.error('Connection error :', e);
        res.status(500).json({ message: 'An error occurred' });
    }
};

const generateToken = async function(this: any, userId: string) {
    return jwt.sign(userId, process.env.SECRET!);
};