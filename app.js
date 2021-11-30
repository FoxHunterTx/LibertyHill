const http = require('http');
const express = require('express');
const bodyParser = require('body-parser'); 
const path = require('path');

// own folder/file
const userRoutes = require('./routes/user');

// applications objects
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.get(bodyParser.urlencoded({extended:false}));
//use route / paths /provide read rights
app.use(express.static(path.join(__dirname,'public')));
app.use(userRoutes);

// 404 error page
app.use((req,res,next) => {
    //res.status(404).sendFile(path.join(__dirname,'views','404.html'));
    res.status(404).render('404',{pageTitle: 'Page Not Found',
    path: '/404' });
});


// main server - express build added console log
app.listen(8080, function() {
    console.log('Liberty Hill web server is up and running!')
});
