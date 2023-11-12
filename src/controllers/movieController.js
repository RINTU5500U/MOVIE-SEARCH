const movieModel = require('../models/movieModel')
const jwt = require('jsonwebtoken')

module.exports = {
    uploadMovie : async (req, res) => {
        try {
            req.body.userId = req.params.userId
            let saveData = await movieModel.create(req.body)
            return res.status(201).send({ status: true, msg: "Movie uploaded successfully", Data: saveData })
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    },

    updateMovie : async (req, res) => {
        try {
            let {userId, movieId} = req.params
            let data = req.body
            let {genre, name, releaseYear, actors, director, technicians} = data
            if (Object.keys(data).length < 1) {
                return res.status(400).send({ status: false, message: "Please enter data whatever you want to update in this movie" })
            }

            let updateData = {
                $push: {genre: genre},
                name,
                releaseYear,
                $push: {actors: actors},
                $push: {director: director},
                technicians,
                updatedAt: new Date().toLocaleString()
            }
            let saveData = await movieModel.updateOne({userId: userId, _id: movieId}, updateData ,{new: true})
            if (!saveData) {
                return res.status(404).send({ status: false, msg: "Movie not found" })
            }
            return res.status(200).send({ status: true, message: "Movie updated successfully", Data: saveData })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    getPurticularMovie : async (req, res) => {
        try {
            let movieId = req.params.movieId
            let movie = await movieModel.findById(movieId)
            return res.status(200).send({ status: false, Movie: movie})
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    fetchAllMovies : async (req, res) => {
        try {
            let skip;
            const limit = 5
            if (req.query) {
                skip = req.query
            } else {
                skip = 1
            }
            let movies = await movieModel.find().skip(skip).limit(limit)
            return res.status(200).send({ status: false, Movie: movies})
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    fetchMoviesByFilter : async (req, res) => {
        try {
            let {genre, name, releaseYear, ratings, actors, director, technicians} = req.query
            let query = {}
            if (actors) {
                query.actors = { $all: actors.split(',') };
            }
            if (director) {
                query.director = director;
            }
            if (releaseYear) {
                query.releaseYear = releaseYear;
            }
            if (name) {
                query.name = name;
            }
            if (technicians) {
                query.technicians = { $all: technicians.split(',') };
            }
            if (minRating) {
                query.ratings = { $gte: parseInt(minRating) };
            }
            if (minYear) {
                query.releaseYear = { $gte: parseInt(minYear) };
            }
            if (genre) {
                query.genre = { $all: genre.split(',') };
            }
            let skip;
            const limit = 5
            if (req.params) {
                skip = req.params
            } else {
                skip = 1
            }
            let filterMovies = await movieModel.find(query).skip(skip).limit(limit)
            return res.status(200).send({ status: true, Movie: filterMovies})
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    removeActorFromMovie : async (req, res) => {
        try {
            let movie = await movieModel.updateOne(
                { userId: req.params.userId ,_id: req.paramsmovieId},
                { $pull: { actors: { $in: req.query.actor } } }
            )
            return res.status(200).send({ status: true, msg: 'Actor removed successfully', Movie: movie})
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },
}