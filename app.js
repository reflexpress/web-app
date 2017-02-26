var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var jsonfile = require('jsonfile');

var app = express();
var file = './public/config.json';

var buttonConfig = {
    'uuid': 'Your button\'s UUID',
    'buttonName': 'Your button\'s name',
    'recipient': 'Your friend\'s Telegram username', 
    'shortPress': [],
    'longPress': [],
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true;
}));

var router = express.Router();

app.use(express.static(path.join(__dirname, 'public')));
var routes = function() {
    router.get('/',
    function(req, res) {
        res.sendFile('./public/index.html');
    });

    router.post('/',
    function(req, res) {
        getConfig();
    });
    return router;
};

app.use('/',routes());

app.listen(3000, function () {
    console.log('Listening');
});

function getConfig(file) {
    if (!jsonfile.readFile(file)) {
        jsonfile.writeFile(file, buttonConfig, function(err) {
            console.log(err);
        })};
    var name = req.body.name;
    var uuid = req.body.uuid;
    var recipient = req.body.recipient;
    var long = req.body.long.replace("; ", ";").split(";");
    var short = req.body.short.replace("; ", ";").split(";");

    var newButtonConfig = {
        'uuid': uuid,
        'buttonName': name,
        'recipient': recipient,
        'shortPress': short,
        'longPress': long,
    };
    jsonfile.writeFile(file, newButtonConfig, function(err) {
        console.log(err);
    });
};

