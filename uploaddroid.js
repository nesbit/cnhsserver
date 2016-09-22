var express = require('express');
var app = express();
var mysql = require('mysql');
//var port = process.env.PORT || 8081;
//process.env.PORT = 8081;
var port = process.env.PORT || 8080;
//  https://gcmforcnhsapp-armadillodude.c9users.io:8081/hola
//app.listen(8081);

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
  
  /*
      $alreadyExists = mysqli_query($con,"SELECT id from `registrationID` WHERE id = '$title'");

    if (mysqli_num_rows($alreadyExists) == 0) {
        $q=mysqli_query($con,"INSERT INTO `registrationID` (`id`) VALUES ('$title')");
    if($q)
        echo "success" . $title;
    else
        echo "error";
    }
  */

//app.listen(port);
