// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function (req, res) {
    res.render("index");
})
// post route for adding a user
app.post('/result', function (req, res) {
    console.log("POST DATA", req.body);
    // This is where we would add the user to the database
    // Then redirect to the root route
    var form_data = {
        'name': req.body['user_name'],
        'location': req.body['dojo_loc'],
        'language': req.body['fav_lang'],
        'comment': req.body['comment']
    };
    res.render('result', {form_data: form_data});
})

// tell the express app to listen on port 8000
const server = app.listen(8000, function () {
    console.log("listening on port 8000");
});

//socket.io stuff
const io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //3
    socket.on('posting_form', function (data) {
        console.log('got something');
        var msg = 'You emitted the following information to the server: ';
        var msg_rand = 'Your lucky number emitted by the server is';
        var rand_num = Math.floor(Math.random() * 1000) + 1;
        console.log(msg + ' ' + data.msg + '\n' + msg_rand + ' ' + rand_num);
        socket.emit('updated_message', { msg: msg + ' ' + data.msg + '\n' + msg_rand + ' ' + rand_num });
    });

});