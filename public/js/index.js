// io() opens a web socket - a connection to web server
var socket = io();

socket.on('connect', () => {
	console.log('Connected to server');

	socket.emit('createEmail', {
		to: 'johnny@example.com',
		text: 'Hey, its great time!',
		createdAt: 321,
	});

});

socket.on('disconnect', () => {
	console.log('Disconnected from server');
});

socket.on('newEmail', email => {
	console.log('New email', email);
});
