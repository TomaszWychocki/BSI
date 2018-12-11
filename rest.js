var express = require('express');
var app = express();
var https = require('https');
var fs = require('fs');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

const port = 3000;
let value = 0;

var User = [
    {
        id: 1,
        username: "Tomasz",
        password: "haslo"
    },
    {
        id: 2,
        username: "admin",
        password: "password"
    }
]

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

passport.use(new BasicStrategy(
    function(username, password, done) 
    {
        let user = User.find(u => 
            u.username === username && u.password === password
        );

        if (!user) 
            return done(null, false);
        else
            return done(null, user);
    }
));

app.get('/basic', passport.authenticate('basic', {session: false}), function(request, response)
{
    response.json({"value": value});
});

app.post('/basic', passport.authenticate('basic', {session: false}), function(request, response)
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