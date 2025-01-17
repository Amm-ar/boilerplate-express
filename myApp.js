require("dotenv").config()
let express = require('express');
let app = express();
let bodyParser = require("body-parser");

console.log("Hello World");

app.use(function(req, res, next){
    console.log(req.method+" "+req.path+" - "+req.ip);
    next();
});

console.log(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/public', express.static(__dirname+"/public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname+"/views/index.html");
});

app.get("/json", function(req, res){
    if (process.env.MESSAGE_STYLE == "uppercase"){
        res.json({"message": "HELLO JSON"});
    }
    else{
        res.json({"message": "Hello json"});
    }
});

app.get("/now", function(req, res, next){
    req.time = new Date().toString();
    next();
},
function(req, res){
    res.send({"time": req.time});
});

app.get("/:word/echo", function(req, res){
    res.send({"echo": req.params.word});
});

app.route('/name').get(function(req, res){
    res.json({"name": req.query.first+" "+req.query.last});
}).post(function(req, res){
    console.log(req.body);
    res.json({"name": req.body.first+" "+req.body.last});
});


module.exports = app;
