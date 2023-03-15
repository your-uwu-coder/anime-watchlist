const UserController = require('../controller/user.controller');

module.exports = (app) => {
    app.post('/api/register', UserController.registerUser)
    app.post('/api/login', UserController.login)
}