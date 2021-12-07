const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser'); 
const path = require('path');
const fs = require('fs');

// own folder/file
const userRoutes = require('./routes/user');
const { SSL_OP_ALL } = require('constants');

// ssl setup
const hostname = 'engineerbuddies.com';
const httpPort = 80;
const httpsPort = 443;
const httpsOptions = {
     cert: fs.readFileSync('./ssl/engineerbuddies.crt'),
     ca: fs.readFileSync('./ssl/engineerbuddies.ca-bundle'),
     key: fs.readFileSync('./ssl/engineerbuddies.key')
};

// applications objects
const app = express();


// reroute port 80
app.use((req, res, next) => {
    if (req.protocol === 'http') {
        console.log("not secure ");
        const httpsUrl = "https://" + req.headers.host + req.url;
        // console.log(httpsUrl);
        return res.redirect(301,httpsUrl);
    } else {
       next();
    }
});

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
// httpServer.listen(httpPort, function() {
//    console.log('rerouting request to https')
// });
// const httpServer = http.createServer(app);
const httpsServer = https.createServer(httpsOptions,app);
httpsServer.listen(httpsPort,function() {
    console.log('starting up web server for engineeringbuddies.com')
});
