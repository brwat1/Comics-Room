import express from 'express'
import { catchErrors } from '../helper/errorsHandler'
import {
    getComics,
    getComicbook
} from '../controller/comicsController'

import {
    createUser,
    deleteUser,
    updateUser
} from '../controller/usersController'

const router = express.Router()

//get APIs
router.get('/api/comics', catchErrors(getComics))
router.get('/api/comic/:id', catchErrors(getComicbook))

//post APIs
router.post('/api/signup', catchErrors(createUser))

//delete APIs
router.delete('/api/account/delete', catchErrors(deleteUser))

//patch APIs
router.patch('/api/account/update', catchErrors(updateUser))


export default router
