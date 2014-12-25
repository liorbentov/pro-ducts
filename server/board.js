var tileDeck = [];
var tilesColors = ["black", "blue", "red", "yellow"];
var board = [];
var boardPlayers = [];
var currPlayer;

exports.initBoard = function (players) {
	boardPlayers = players;
	for (var deckCount = 0; deckCount < 2; deckCount++) {
		for (var deckColor = 0; deckColor < 4; deckColor++) {
			for (var tileCount = 1; tileCount <= 13; tileCount++) {
				tileDeck.push({number: tileCount, color: tilesColors[deckColor]});
			}
		}
	}

	tileDeck.push({number: 0, color: tilesColors[0]});
	tileDeck.push({number: 0, color: tilesColors[2]});

	shuffleDeck(tileDeck);
	dealTiles(tileDeck);

	// console.log(validateBoard([[{number: 2, color: "blue"}, {number: 2, color: "red"}, {number: 2, color: "yellow"}],
	// 						   [{number: 11, color: "blue"}, {number: 0, color: "blue"}, {number: 13, color: "blue"}]]));
}

function shuffleDeck(deck) {
	for (var n = deck.length, k, x; 1 < n;) {
		k = Math.floor(Math.random() * n--);
		x = deck[n];
		deck[n] = deck[k];
		deck[k] = x;
	}
}

function dealTiles(deck) {
	for (var currPlayer = 0; currPlayer < boardPlayers.length; currPlayer++) {
		var currPlayerTiles = [];

		for (var tilesCount = 0; tilesCount < 14; tilesCount++) {
			var currTile = deck.pop();
			currPlayerTiles.push(currTile);
		}

		boardPlayers[currPlayer].socket.emit('clientTakeCard', currPlayerTiles);
	}
}

exports.drawTile = function(){
	var tilePop = tileDeck.pop();
	return tilePop;
}

function validateBoard(board) {
	for (var currSetIndex = 0; currSetIndex < board.length; currSetIndex++) {
		var currSet = board[currSetIndex];

		if (currSet.length >= 3) {
			if (!(validateAllSameSet(currSet) || validateAscendingSet(currSet) || validateDescendingSet(currSet))) {
				return false;
			}
		} else {
			return false;
		}
	}

	return true;
}

function validateAllSameSet(tileSet) {
	var tile = 0;
	var colors = {};

	for (var currTileIndex = 0; currTileIndex < tileSet.length; currTileIndex++) {
		var currTile = tileSet[currTileIndex];
		
		if (currTile.number != 0) {
			if (tile == 0) {
				tile = currTile.number;
				colors[currTile.color] = true;
			} else {
				if ((tile != currTile.number) || (colors[currTile.color])) {
					return false;
				}
			}
		}
	}

	return true;
}

function validateAscendingSet(tileSet) {
	var tile = null;
	var position = 0;
	
	while (!tile) {
		var currTile = tileSet[position]

		if (currTile.number != 0) {
			tile = currTile;
		} else {
			position++;
		}
	}

	for (var currTileIndex = 0; currTileIndex < tileSet.length; currTileIndex++) {
		var currTile = tileSet[currTileIndex];

		if (currTile.number != 0) {
			if ((tile.number != currTile.number + position - currTileIndex) || (tile.color != currTile.color)) {
				return false;
			}
		}		
	}

	return true;
}

function validateDescendingSet(tileSet) {
	var clone = tileSet.slice(0);

	return (validateAscendingSet(clone.reverse()));
}
