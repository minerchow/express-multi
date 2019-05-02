
const homeController = require('../controller/home');
const homeRoute = function (app) {
	app.get('/', homeController.index)
	app.get('/home',homeController.index)
}

module.exports = homeRoute
