'use strict';

// ----- Functions ----- //

// Sends an error message.
exports.err = function err (socket, message) {
	socket.emit('err', message);
};

// Sends a message about client disconnected to all other users.
exports.clientDisconnect = function clientDisconnect (socket, name) {
	socket.broadcast.emit('client-disconnect', name);
};

// Sends a message telling the client to display the category view.
exports.categoryView = function categoryView (socket, categories) {
	socket.emit('category-view', categories);
};

// Sends a message explaining that the game has failed to start.
exports.beginFail = function beginFail (socket, reason) {
	socket.emit('begin-fail', reason);
};

// Sends message to current socket and others stating that user has been added.
exports.userAccepted = function userAccepted (socket, users, previous) {

	socket.emit('client-accepted', previous);
	socket.broadcast.emit('new-user', users);

};

// Sends a warning that there is already a host in the game.
exports.hostExists = function hostExists (socket) {
	socket.emit('host-exists');
};

// Sends the command to begin a series of questions in a certain category.
exports.showCategory = function showCategory (socket, category) {
	socket.emit('show-category', category);
};

// Sends command to display the current scores.
exports.scoresView = function scoresView (socket, scores) {
	socket.emit('scores-view', scores);
};

// Sends a question to the users.
exports.questionView = function questionView (socket, question) {
	socket.emit('question-view', question);
};

// Broadcasts a message that a player has submitted an answer.
exports.answerSubmitted = function answerSubmitted (socket, name, users) {
	socket.broadcast.emit('answer-submitted', users);
};

// Sends command to display answers and list of answers.
exports.answersView = function answersView (socket, answers) {
	socket.emit('answers-view', answers);
};

// Sends through the winners.
exports.winners = function winners (socket, users) {
	socket.emit('winners', users);
};
