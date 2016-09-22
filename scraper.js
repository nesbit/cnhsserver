var request = require("request");
var parser = require('xml2json');
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app.listen(port);
console.log('Server started! At http://localhost: ' + port);



app.get('/calendar/', function(req, res) {
request({
    uri: "http://www.cardinalnewman.org/calendar/page_602.rss",
}, function(error, response, body) {
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

// ===================================

app.get('/android/:query', function(req, res) {
  var connection = mysql.createConnection({
  host     : 'sp6xl8zoyvbumaa2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user     : 'oi7hss5h1e0qnfb7',
  password : 'hpsj2fsktv68mi1d',
  database : 'j2rymydc2j3ul9jp'
});
var connection2 = mysql.createConnection({
  host     : 'sp6xl8zoyvbumaa2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user     : 'oi7hss5h1e0qnfb7',
  password : 'hpsj2fsktv68mi1d',
  database : 'j2rymydc2j3ul9jp'
});
  console.log(req.params.query);
 // .."INSERT INTO `registrationID` (`id`) VALUES ('" + req.params.query +"')"
  
  connection.query("SELECT id from `registrationID` WHERE id = '" + req.params.query + "'", function(err, rows, fields) {
//connection.end();
console.log(rows);
console.log(rows.length);
//rows = JSON.parse(rows);
   // if(rows.id == )
/*
if (rows.length == 0) {
    
connection2.query("INSERT INTO `registrationID` (`id`) VALUES ('" + req.params.query +"')", function(err1, rows1, fields1) {
console.log(rows1);


  if (!err) {
    console.log('Added: ', rows1);
  } else {
    console.log('Error while performing Query.');
  } 
  });
    
    
}
*/

  if (!err) {
    console.log('The solution is: ', rows);
    if (rows.length == 0) {
        console.log("DNE");
    connection2.query("INSERT INTO `registrationID` (`id`) VALUES ('" + req.params.query +"')", function(err1, rows1, fields1) {
console.log(rows1);


  if (!err) {
    console.log('Added: ', rows1);
  } else {
    console.log('Error while performing Query.');
  } 
  });
    }
    
    
  } else {
    console.log('Error while performing Query.');
  } 
  });
});
