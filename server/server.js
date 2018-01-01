// old way to do it - the bad one
//console.log(__dirname + '/../public'):
// /Users/pkubera/playgr/node-chat-app/server/../public
// trafiamy do public, ale wchodzimy niepotrzebnie do server i wychodzimy - bez sensu

// the new way using path join()
// dzięki tej biblioteczce nasz path pominie wejście i wyjście z /server:
//console.log(publicPath);
// /Users/pkubera/playgr/node-chat-app/public
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//register an event listener and provide a callback - what to do when an event will happen
io.on('connection', socket => {
	// socket.emit from Admin text Welcome to the chat app
	// socket.broadcast.emit from Admin text New user joined
	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to the chat app',
		createdAt: new Date().getTime()
	});
	
	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'New user joined',
		createdAt: new Date().getTime()
	});

	socket.on('createMessage', message => {
		console.log('createMessage', message);

		// emit message to every connected user
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});

		// broadcast the message to everyone except me itself
		/*socket.broadcast.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});*/
	});

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});

});

server.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});

