//Used For Random String Generation
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

//Express Prep
var app = require('express')();
var express = require('express'); 
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8080;

app.use("/shop", express.static(__dirname + '/'));

app.get('/shop', function(req, res){
  res.sendFile(__dirname + '/');
});

//mySQL Prep 
var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'shop'
});

var listings;

con.connect(function(err) {
    if (err) throw err;
    console.log("mysql has connected.");

    con.query("SELECT * FROM listings", function (err, result, fields) {
        console.log("called");
        if (err) throw err;
        listings = result;
    });
  
});


io.on('connection', function(socket){

  io.emit('listings', listings);


});


http.listen(port, function(){
  console.log('listening on *:' + port);
});

