var express = require('express');
var app = express();
var https = require('https');
var http = require('http');
var fs = require('fs');
var router = express.Router();
const axios = require('axios');

const port = 443;
const restServer = "https://twychocki.net:3000";

const httpsAgent = new https.Agent(
{
    rejectUnauthorized: false,
    cert: fs.readFileSync('sec/twychocki.net.crt')
});

const httpsAnxios = axios.create({ httpsAgent });

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

app.use(express.json());

router.get('/', function(req, res, next)
{
    res.sendFile('index.html');
});

router.get('/rest', function(request, response)
{
    httpsAnxios.get(restServer)
    .then(function(res)
    {
        response.send(res.data);
    });
});

router.post('/rest', function(request, response)
{
    let data = {
        value: request.body.value
    };

    httpsAnxios.post(restServer, data)
    .then(function(res)
    {
        response.send(res.data);
    });
});

app.use('/', router);

http.createServer(app).listen(80);

https.createServer(
{
    key: fs.readFileSync('sec/twychocki.org.key'),
    cert: fs.readFileSync('sec/twychocki.org.crt')
}, app)
.listen(port, () => console.log(`Server started on port ${port}!`));
