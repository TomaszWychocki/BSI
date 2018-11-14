var express = require('express');
var app = express();
var router = express.Router();
const port = 80;

app.use(express.static(__dirname + '/public'));

router.get('/', function(req, res, next)
{
    res.sendFile('index.html');
});

app.use('/', router);

app.listen(port, () => console.log(`Server started on port ${port}!`));