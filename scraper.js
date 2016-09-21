var request = require("request");
var parser = require('xml2json');
var express = require('express');
var app = express();


app.listen(8080);
console.log('Server started! At http://localhost: 8080');


request({
    uri: "http://www.cardinalnewman.org/calendar/page_602.rss",
}, function(error, response, body) {
app.get('/calendar/', function(req, res) {
  var user_id = req.param('callback');
  /*var token = req.param('token');
  var geo = req.param('geo');  */
  var xml = body;
        var options = {
            sanitize: false
        };
        var json = parser.toJson(xml, options);
        //console.log(json);
        console.log(JSON.stringify(req.url));
        //res.writeHead(200, {'Content-Type': 'application/javascript'});
        res.send(user_id + "(" + json + ")");
       // res.send( "(" + json + ")");
    });
});
