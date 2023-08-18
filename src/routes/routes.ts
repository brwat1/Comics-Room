import express, {Request, Response} from 'express';
import { catchErrors } from '../helper/errorsHandler';
import {
    getComics,
    getComicbook,
    createComics,
    synchronizeComics
} from '../controller/comicsController';

import {
    getUser,
    createUser,
    deleteUser,
    updateUser,
    login
} from '../controller/usersController';

const auth = require('../helper/auth');

const router = express.Router();

//get APIs
router.get('/api/comics', catchErrors(getComics));
router.get('/api/comic/:id', catchErrors(getComicbook));
router.get('/test', catchErrors(synchronizeComics));//rename
router.get('/api/user', auth, catchErrors(getUser));

//post APIs
router.post('/api/signup', catchErrors(createUser));
router.post('/api/login', catchErrors(login));
router.post('/api/comics/add', auth, catchErrors(createComics));

//delete APIs
router.delete('/api/account/delete', auth, catchErrors(deleteUser));

//patch APIs
router.patch('/api/account/update', auth, catchErrors(updateUser));


export default router