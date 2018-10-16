    var bodyParser = require('body-parser');
    var urlencodedParser = bodyParser.urlencoded({extended:false});
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/mydb';
    module.exports = (function(app){
      app.get('/', function(req,res){
        res.render('home');
      });
      app.get('/register',function(req,res){
        res.render('register');
      });
      app.get('/login',function(req,res){
        res.render('login');
      });
    // Login TO DB==================================================================
      app.post('/demo',urlencodedParser,function(req,res){
        console.log(req);
        console.log("name:",req.body.name);
        console.log("pass:",req.body.pass);
       MongoClient.connect(url,{useNewUrlParser :true} ,function(err, db) {
       var dbo=db.db("student");
       dbo.collection('project').findOne({ name: req.body.name,pass:req.body.pass}, function(err, user) {
        console.log(user);
                if(user==null){
                   console.log("login Invalid");
                }
               else if (user.name === req.body.name && user.pass === req.body.pass){
                res.render('completeprofile',{profileData:user});
              }else{
                console.log("user name and password invalid");
              }

       });
     });
    });
    //register to DB================================================================
    app.post('/regiterToDb',urlencodedParser,function(req,res){
     var obj = JSON.stringify(req.body);
     var jsonObj = JSON.parse(obj);
     console.log("request name:",req.body.name);
     console.log("request name:",req.body.pass);
     console.log(obj);
     if(req.body.name=="" || req.body.pass==""){
      console.log("please Enter ur Email and password");
     }
     else{
         res.render('profile',{loginData:req.body});
       }
      });
    //register profile to MongoDB================================================================
      app.post('/completeprofile',urlencodedParser,function(req,res){
       var obj = JSON.stringify(req.body);
       console.log("Final reg Data : "+obj);
       var jsonObj = JSON.parse(obj);
       if(req.body.email=="" || req.body.phone==""){
          alert("please Enter UR Email and Phone");
       }else{
          var jsonObj = JSON.parse(obj);
          console.log(jsonObj);
       }
       
          MongoClient.connect(url,{useNewUrlParser : true}, function(err, db) {
            var dbo=db.db("student");
          dbo.collection("project").insertOne(jsonObj, function(err, res) {
         if (err) throw err;
         // if(jsonObj.email=="" && jsonObj.phone==""){
         console.log("1 document inserted");
         db.close();
          });
        //  if (jsonObj.email==""){
        //     console.log("please enter valid Email");
        //  }
        //  else if(jsonObj.phone==""){
        //   console.log("please enter valid Phone");
        //  if(jsonObj.email=="" && jsonObj.phone==""){
        //    console.log("please enter valid Email and Phone");
        //    db.close();
        // }
        // else{
        //              res.render('completeprofile',{profileData:req.body});
        //   // console.log("profile Invalid");
        res.render('completeprofile',{profileData:req.body});
        });
           
        // }
          // res.render('completeprofile',{profileData:req.body});
        });
          // else{
          //   console.log("profile Invalid");
          // }
        // });
    });
