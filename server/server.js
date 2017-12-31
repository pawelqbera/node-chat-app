// old way to do it - the bad one
//console.log(__dirname + '/../public'):
// /Users/pkubera/playgr/node-chat-app/server/../public
// trafiamy do public, ale wchodzimy niepotrzebnie do server i wychodzimy - bez sensu

// the new way using path join()
// dzięki tej biblioteczce nasz path pominie wejście i wyjście z /server:
//console.log(publicPath);
// /Users/pkubera/playgr/node-chat-app/public
const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

app.use(express.static(publicPath));

app.listen(3000, () => {
	console.log(`Server is up on port ${port}`);
});

