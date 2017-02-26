var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var jsonfile = require('jsonfile');

var app = express();
var output_file = 'public/config.json';

var buttonConfig = {
    'uuid': 'Your button\'s UUID',
    'buttonName': 'Your button\'s name',
    'recipient': 'Your friend\'s Telegram username',
    'shortPress': [],
    'longPress': [],
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

var router = express.Router();

app.use(express.static(path.join(__dirname, 'public')));
var routes = function() {
    router.get('/',
    function(req, res) {
        console.log("got");
        res.sendFile('public/index.html');
    });

    router.post('/',
    function(req, res) {
        getConfig(output_file, req);
        res.redirect('/');
    });
    return router;
};

app.use('/',routes());

app.listen(4999, function () {
    console.log('Listening on port 4999');
});

function getConfig(file, req) {
  jsonfile.readFile(file, function(err, obj) {
    if(err) {
      jsonfile.writeFile(file, buttonConfig, function(err) {
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
      });
    }
    else {
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
    }
  });
};
