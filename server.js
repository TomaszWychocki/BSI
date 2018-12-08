var express = require('express');
var app = express();
var https = require('https');
var http = require('http');
var fs = require('fs');
var router = express.Router();
const port = 443;

app.use(function(req, res, next) 
{
    if (req.secure) 
    {
        next();
    } 
    else 
    {
        res.redirect('https://' + req.headers.host + req.url);
    }
});

app.use(express.static(__dirname + '/public'));

router.get('/', function(req, res, next)
{
    res.sendFile('index.html');
});

app.use('/', router);

http.createServer(app).listen(80);

https.createServer(
{
    key: fs.readFileSync('sec/twychocki.net.key'),
    cert: fs.readFileSync('sec/twychocki.net.crt')
}, app)
.listen(port, () => console.log(`Server started on port ${port}!`));
