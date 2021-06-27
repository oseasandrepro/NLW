const express = require('express')
const QuestionControler = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

const route = express.Router();

route.get('/', (req, res) => res.render('index', {page: 'enter-room'}) )
route.get('/create-pass', (req, res) => res.render('index', {page: 'create-pass'}))

route.post('/create-room', RoomController.create)
route.get('/room/:room', RoomController.open)
route.post('/enterroom', RoomController.enter)


route.post('/question/create/:room', QuestionControler.create)
route.post('/question/:room/:question/:action', QuestionControler.index)


module.exports = route;