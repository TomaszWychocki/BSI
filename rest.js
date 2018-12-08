var express = require('express');
var app = express();
var https = require('https');
var fs = require('fs');
const port = 3000;

let value = 0;

app.use(express.json());

app.use(function(req, res, next)
{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  
app.get('/', function(request, response)
{
    response.json({"value": value});
});

app.post('/', function(request, response)
{
    value = request.body.value;
    response.json({"value": value});
});

https.createServer(
{
    key: fs.readFileSync('sec/twychocki.net.key'),
    cert: fs.readFileSync('sec/twychocki.net.crt')
}, app)
.listen(port, () => console.log(`REST started on port ${port}!`));