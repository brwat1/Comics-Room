import { Request, Response, NextFunction } from 'express';
import ComicModel from '../model/comicModel'
import dotenv from 'dotenv';
import {DataTypes, Sequelize} from "sequelize";
import { Op } from 'sequelize';
import axios from 'axios';
import crypto from "crypto";

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
    } catch (e) {
        console.error(e);
        res.status(500).send('Error during search request');
    }
}

export const getComicbookByTitle = async (req: Request, res: Response) => {
    try {
        const comics = await ComicModel.findAll({
            where: {
                title: {
                    [Op.like]: `%${req.params.id}%`,
                },
            },
            logging: console.log,
        });

        if (!comics) {
            return res.status(404).send('Comicbook not found');
        }

        res.send(comics);
    } catch (e) {
        console.error(e);
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
        dotenv.config();
        const albumsArray: any[] = [];
        const crypto = require('crypto');
        const timestampInSeconds = Math.floor(new Date().getTime() / 1000);
        const privateKey = process.env.MARVEL_KEY_PRIVATE;
        const publicKey = process.env.MARVEL_KEY_PUBLIC;

        if (!privateKey || !publicKey) {
            throw new Error('MARVEL_KEY_PRIVATE or MARVEL_KEY_PUBLIC is not defined in the environment.');
        }
        const hash = crypto.createHash('md5').update(timestampInSeconds + privateKey + publicKey).digest('hex');

        const comics = await fetch(`https://gateway.marvel.com:443/v1/public/comics?apikey=${publicKey}&ts=${timestampInSeconds}&hash=${hash}&noVariants=true&formatType=comic&orderBy=title`);
        const jsonData = await comics.json();
        const comicsData = jsonData.data["results"];

        for (const comic of comicsData) {
            let creatorsDisplay = '';

            if (comic && comic.creators['available'] > 0) {
                const creatorsResponse = await fetch(`https://gateway.marvel.com:443/v1/public/comics/${comic.id}/creators?apikey=${publicKey}&ts=${timestampInSeconds}&hash=${hash}`);
                const creators = await creatorsResponse.json();
                const creatorsData = creators.data["results"];

                creatorsData.forEach((creator: any) => {
                    creatorsDisplay = creatorsDisplay + ', ' + creator.fullName;
                });
                creatorsDisplay = creatorsDisplay.slice(2);
            }

            let cover = comic.images[0].path + '.' + comic.images[0].extension;
            let collections = '';
            comicsData[0].collections.forEach((collection: any) => {
                collections = collections + ' | ' + collection.name;
            });
            collections = collections.slice(3);
            const mappedAlbum = {
                id: comic.id,
                author: creatorsDisplay,
                volume: comic.issueNumber,
                title: comic.title,
                series: comic.series.name,
                collection: collections,
                publisher: 'Marvel',
                release_date: comic.dates[0].date,
                page_count: comic.pageCount,
                isbn: comic.isbn,
                cover: cover
            };
            albumsArray.push(mappedAlbum);
        }

        return ComicModel.bulkCreate(albumsArray, {
            updateOnDuplicate: ['id'],
        })
            .then(() => {
                res.send("Well inserted");
            })
            .catch((error) => {
                res.status(500).send("Error while inserting");
                console.error(error);
            });
    } catch (e) {
        console.error(e);
        res.status(500).send('Error while creating comics');
    }
}