import { Request, Response, NextFunction } from 'express';
import { Scraper } from "bedetheque-scraper";
import ComicModel from '../model/comicModel'
import {DataTypes} from "sequelize";

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

export const createComics = async (req: Request, res: Response) => {
    try {
        //@TODO remplacer les comics statiques par ceux scrapped
        const { comics } = req.body;
        const books = [
            { isbn: 11671817281 ,author: 'J. M. Straczynski', volume: 1, title: 'Spider-man', series: 'Amazing Spider-man', collection: '100% Marvel', publisher: 'Panini Comics', release_date: '11/03/2022', content: 'The Amazing Spider-man (2016) #1-5', page_count: 112 },
            { isbn: 11677781983, author: 'Bryan M. Bendis', volume: 2, title: 'Daredevil', series: 'Daredevil', collection: 'Marvel Deluxe', publisher: 'Panini Comics', release_date: '16/02/2020', content: 'Daredevil (2011) #1-10', page_count: 350 },
        ];

        return res.send(await ComicModel.bulkCreate(books, {
            updateOnDuplicate: ['isbn'],
        }));
    } catch (e) {
        console.error(e);
        res.status(500).send('Error while creating comics');
    }
}

export const synchronizeComics = async (req: Request, res: Response) => {
    try {
        // const albumsArray = [];
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0'.split('');
        let count = 0;//
        for (const letter of letters) {
            const seriesUrls = await Scraper.getSeriesUrlFromLetter(letter, true);
            if (seriesUrls) {
                for (const seriesUrl of seriesUrls) {
                    const {serie, albums} = await Scraper.getSerie(seriesUrl);
                    console.log(albums[0]);
                    count++;
                    if (count >= 1) {
                        return;
                    }//

                    // for (const album of albums) {
                    //     const mappedAlbum = {
                    //         isbn: album.isbn,
                    //         author: album.scenario,
                    //         volume: album.volume,
                    //         title: album.title,
                    //         series: album.serieTitle,
                    //         collection: album.collection,
                    //         publisher: album.editor,
                    //         release_date: new Date(album.date * 1000),
                    //         content: album.content,
                    //         page_count: album.nbrOfPages
                    //     };
                    //
                    //     albumsArray.push(mappedAlbum);
                    // }
                }
            }
        }

        // return res.send(await ComicModel.bulkCreate(albumsArray, {
        //     updateOnDuplicate: ['isbn'],
        // }));
    } catch (e) {
        console.error(e);
        res.status(500).send('Error while creating comics');
    }
}