const AnimeController = require ('../controller/anime.controllers')
const {authenticate} = require('../config/jwt.config')

module.exports = app => {
    app.get('/api/allAnime', authenticate, AnimeController.allAnime)
    app.get('/api/oneAnime/:id', authenticate, AnimeController.getOneAnime)
    app.post('/api/watchlist', authenticate, AnimeController.watchList)
    app.put('/api/edit/:id', authenticate, AnimeController.editAnime)
    app.delete('/api/deleteOne/:id', authenticate, AnimeController.deleteAnime)
}