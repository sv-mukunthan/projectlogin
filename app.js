    var express = require('express');
    var app = express();
    var loginController = require('./controller/loginController');

    var cons = require('consolidate');

  var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
// app.engine('html', cons.swig);
app.set('view engine', 'ejs');
    // app.set('view engine','html');
    app.use(express.static('./js'));
    loginController(app);
    app.listen(3000);
    console.log("lestening on port!:3000");


 // var path=__dirname+'/views/';