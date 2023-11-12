const express = require("express")
const router = express.Router()

const {createUser, login, updateUser} = require('../controllers/userController')
const {uploadMovie, updateMovie, getPurticularMovie, fetchAllMovies, fetchMoviesByFilter, removeActorFromMovie } = require('../controllers/movieController')
const {authentication, authorization, adminAuthorization} = require('../middlewares/auth')

router.post('/createUser', createUser)
router.post('/login', login)
router.put('/updateUser/:userId', authentication, authorization, updateUser)

router.post('/uploadMovie/:userId', authentication, adminAuthorization, uploadMovie)
router.put('/user/:userId/updateMovie/:movieId', authentication, adminAuthorization, authorization, updateMovie)
router.get('/getPurticularMovie/:movieId', authentication, getPurticularMovie)
router.get('/fetchAllMovies',authentication, fetchAllMovies)
router.get('/fetchMoviesByFilter', authentication, fetchMoviesByFilter)
router.delete('/removeActorFromMovie', authentication, adminAuthorization, authorization, removeActorFromMovie)

router.all("/*", function (req, res) { 
    return res.status(400).send({ status: false, message: "invalid http request" });
});

module.exports = router