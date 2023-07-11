import express, {Request, Response} from 'express';
import { catchErrors } from '../helper/errorsHandler';
// import passport from 'passport';
import {
    getComics,
    getComicbook,
    createComics,
    synchronizeComics
} from '../controller/comicsController';

import {
    createUser,
    deleteUser,
    updateUser
} from '../controller/usersController';

const router = express.Router();

//get APIs
router.get('/api/comics', catchErrors(getComics));
router.get('/api/comic/:id', catchErrors(getComicbook));
router.get('/test', catchErrors(synchronizeComics));

//post APIs
router.post('/api/signup', catchErrors(createUser));
router.post('/api/login', catchErrors(login));
router.post('/api/comics/add', catchErrors(createComics));
// router.post(
//     '/api/signup',
//     passport.authenticate('signup', { session: false }),
//     async (req: Request, res: Response, next) => {
//     res.json({
//         message: 'Signed up',
//         user: req.user
//     })
// });

//delete APIs
router.delete('/api/account/delete', catchErrors(deleteUser));

//patch APIs
router.patch('/api/account/update', catchErrors(updateUser));


export default router