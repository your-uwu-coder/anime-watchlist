const AnimeController = require ('../controller/anime.controllers')

module.exports = app => {
    app.get('/api/allAnime', AnimeController.allAnime)
    app.get('/api/oneAnime/:id', AnimeController.getOneAnime)
    app.post('/api/watchlist', AnimeController.watchList)
    app.put('/api/edit/:id', AnimeController.editAnime)
    app.delete('/api/deleteOne/:id', AnimeController.deleteAnime)
}