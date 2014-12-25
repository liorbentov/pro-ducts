var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var server = require('http').Server(app);
var io = require('socket.io')(server);

var board = require('./board');
var boardSocket;

var API_PATH = '/api/';

var playersSockets = [];
var games = [];
var currTurn=0;

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../public"));

app.get('/', function(req, res){
	res.redirect('index.html');
});

app.get('*', function(req, res){
	res.redirect('/#' + req.originalUrl);
});

app.post(API_PATH + 'games', function(req, res){
	games.push(req.body.name);
});

server.listen(4444);

io.sockets.on('connection', function(socket) {
 	socket.on('hostGame', function(boardName) {
 		boardSocket = socket;
 	});
 	
 	socket.on('joinGame', function(username) {
 		socket.username = username;
 		playersSockets.push({name: username, socket: socket});
 		boardSocket.emit('playerJoined', username);
 		console.log(username + " joined game");
 	});

 	socket.on('startGame', function() {
		board.initBoard(playersSockets);
 	});

 	socket.on('serverTakeCard', function() {
 		playersSockets[currTurn].socket.emit('clientTakeCard', [board.drawTile()]);
 	});

 	socket.on('stageCards', function(tiles) {
 		boardSocket.emit('boardStageCards',tiles);
 	});
 	
 	socket.on('disconnect', function() {
    	var username = socket.username;
	});
});