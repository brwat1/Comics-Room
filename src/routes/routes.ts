import express from 'express'
import { catchErrors } from '../helper/errorsHandler'
import {
    getComics,
    getComicbook
} from '../controllers/comicsController'

import {
    createUser
    // updateRoom
} from '../controllers/usersController'

const router = express.Router()

//get APIs
router.get('/api/comics', catchErrors(getComics))
router.get('/api/comic/:id', catchErrors(getComicbook))

//post APIs
router.post('/api/rooms', catchErrors(createUser))

//delete APIs
// router.delete('/api/rooms/:id', catchErrors(deleteRoom))
// router.patch('/api/rooms/:id', catchErrors(updateRoom))


export default router
