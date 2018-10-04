var express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');


const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const blogs = require('./routes/api/blogs');
const friends = require('./routes/api/friends');
const emails = require('./routes/api/emails');

var app = express();

var server = app.listen(7000);
var io = module.exports.io = require('socket.io').listen(server);

const socketManager = require('./SocketManager')

io.on('connection', socketManager);


io.sockets.on('connection', (socket) => {
    console.log('Client conected on port: %s', socket.id);

    socket.on("chat-message", (msg) => {
        console.log('New message ' + msg);
        socket.emit("chat-message-new", msg);
    });

});
server.listen(7000);

// Body Parser middlewere
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));


// Passport Middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/blog', blogs);
app.use('/api/friends', friends);
app.use('/api/emails', emails);



// CHAT ROUTES
// ***********
app.post('/api/chats/getMessage', (req, res, next) => {
    // console.log(req.body)
    io.emit('sendMessage', req.body
        .then(res= res.json(res))
        .catch(err => res.json(err)));
    console.log(req.body)
})

// Server static assets if in production
// if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('../../build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
// }


// const port = process.env.PORT || 7000;
// app.listen(port, () => {
//     `Server running on port ${port}`
// });
