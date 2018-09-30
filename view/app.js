//Used For Random String Generation
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

//Requiring Modules 
var app = require('express')();
var express = require('express'); 
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var multer = require('multer');

//Import Routes
const product = require('./routes/product.route'); 
const user = require('./routes/user.route');

//Set up mongoose connnection 
const mongoose = require('mongoose');
var dev_db_url = 'mongodb://colinmcg:Ilovejesus!1@ds113853.mlab.com:13853/productstutorial';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise; 
var db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection error:')); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products',product); 
app.use('/users',user); 

//Port Setup
var port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log('Server is up and running on port number ' + port);
});  

app.use("/", express.static(__dirname + '/'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/');
});




//Image Uploading
// Set The Storage Engine
/*
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
*/


// Check File Type
/*
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}
*/




/*
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('index', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('index', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('index', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});
*/

// Init Upload
const upload = multer({
  limits:{fileSize: 100000000},
}).single('myImage');

app.post('/upload',  upload.single('avatar'), (req, res) => {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    console.log('file received');
    return res.send({
      success: true
    })
  }
});