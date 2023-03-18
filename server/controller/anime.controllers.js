const Anime = require('../model/anime.models')

module.exports = {

    allAnime: async (req, res) => {
        try {
            const allAnime = await Anime.find()
            res.json(allAnime)
        }
        catch(err){
            res.status(500).json(err)
        }
    },

    watchList: async (req, res) => {
        console.log('watchList');
        try {
            const newAnime = await Anime.create(req.body)
            console.log('watchList')
            res.json(newAnime)
        }
        catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    editAnime: async (req, res) => {
        console.log('editAnime')
        try {
            const updatedAnime = await Anime.findOneAndUpdate({ _id: req.params.id }, req.body , { new: true, runValidators: true } )
            res.json(updatedAnime)
        }
        catch(err) {
            res.status(500).json(err)
        }
    },

    getOneAnime: async (req, res) => {
        try {
            const oneAnime = await Anime.findById ({ _id: req.params.id })
            res.json(oneAnime)
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    deleteAnime: async (req, res) => {
        console.log('deleteAnime')
        try{
            const response = await Anime.deleteOne({_id: req.params.id})
            res.json(response)
        }
        catch(err){
            res.status(500).json(err)
        }
    }
}