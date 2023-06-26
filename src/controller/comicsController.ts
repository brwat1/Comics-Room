import { Request, Response, NextFunction } from 'express';
import { ComicsModel } from '../model/comicModel'

export const getComics = async (req: Request, res: Response) => {
    const comics = await ComicsModel.find({})
    res.send(comics)
}

export const getComicbook = async (req: Request, res: Response) => {
    const comicbook = await ComicsModel.find({ _id: req.params.id })
    res.send(comicbook[0])
}