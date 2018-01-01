// io() opens a web socket - a connection to web server
var socket = io();

socket.on('connect', () => {
	console.log('Connected to server');

	socket.emit('createMessage', {
		from: 'Paolo',
		text: 'Hey, guys, nice to meet you all!'
	});

});

socket.on('disconnect', () => {
	console.log('Disconnected from server');
});

socket.on('newMessage', message => {
	console.log('New message', message);
});
