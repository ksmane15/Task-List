var express= require('express');
var path= require('path');
var mongoose= require('mongoose');
var bodyParser= require('body-parser');

//Routes
var index=require('./routes/index');
var tasks=require('./routes/tasks');
//Model
var Task= require('./models/tasks');
mongoose.connect('mongodb://localhost/TasksList');
var app= express();

var port=3000;
//view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

//static folder
app.use(express.static(path.join(__dirname,'client')));
app.use(express.static(path.join(__dirname,'client/dist')));


//body parser middleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/',index);
app.use('/api',tasks);

app.listen(port,function(){
    console.log('Server started on port '+port);
});
