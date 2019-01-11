'use strict';

var express = require('express');
var cors = require('cors');


// require and use "multer"...
var multer = require('multer');
var app = express();
var upload = multer( {dest: './assets/'} )

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post("/api/fileanalyse", upload.single('upfile'), (req,res)=>{
  var filename = '';
  if (req.file){
   console.log(req.file);
    filename = req.file.originalname;
    //uploadStatus = 'File Uploaded successfully';
  } else {
    filename = "File Not Uploaded"
    //uploadStatus = 'File upload failed';
  }
  res.json({name: filename, type:req.file.mimetype, size: req.file.size});
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
