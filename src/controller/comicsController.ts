import { Request, Response, NextFunction } from 'express';
import ComicModel from '../model/comicModel'

export const getComics = async (req: Request, res: Response) => {
    const comics = await ComicModel.findAll()
    res.send(comics)
}

export const getComicbook = async (req: Request, res: Response) => {
    try {
        const comic = await ComicModel.findOne({ where: { id: req.params.id } });

        if (!comic) {
            return res.status(404).send('Comicbook not found');
        }

        res.send(comic);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error during search request');
    }
}