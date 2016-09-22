var gcm = require('node-gcm');
var request = require('request');
var mysql = require('mysql');
//var $ = require('jQuery');
var http = require('http');
var cron = require('node-cron');
var moment = require('moment-timezone');
var apn = require ('apn');

var contents;
var idFor = "";
var tokens = [];

var mysqlConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'armadillodude',
  password : '',
  database : 'deviceid'
});








cron.schedule("* * * * *", function(){







request({
  uri: "https://spreadsheets.google.com/feeds/list/1QR7Vha2sW8nKjudbnkJMXAXkNPn8LULqq47Td8jrUKY/od6/public/values?alt=json",
}, function(error, response, body) {
  //console.log(body);
    contents = JSON.parse(body);
    console.log("New Text!!!");
    for(var i in contents.feed.entry) {
        var val = contents.feed.entry[i];
        var date = moment(val.gsx$timetosendnotification.$t, "MM-DD-YYYY HH:mm:ss");
        var now = moment().tz("America/Los_Angeles").format("MM-DD-YYYY HH:mm:ss");
        var diffe = date.diff(now, 'minutes');
        console.log(diffe);
      // =================
        if (diffe == 0) {
            console.log("Currently Sending!!!!");


        
            
// ===================
            mysqlConnection.query("SELECT * from `registrationIDIOS`", function(err, rows, fields) {
                tokens = [];
                for (var i in rows) {
                tokens.push(rows[i].id);
                }

                console.log("array updated");
                if (!err) {
                console.log('No err: ');
// =======================

var service = new apn.connection({ production: true });

service.on("connected", function() {
    console.log("Connected");
});

service.on("transmitted", function(notification, device) {
    console.log("Notification transmitted to:" + device.token.toString("hex"));
});

service.on("transmissionError", function(errCode, notification, device) {
    console.error("Notification caused error: " + errCode + " for device ", device, notification);
    if (errCode === 8) {
        console.log("A error code of 8 indicates that the device token is invalid. This could be for a number of reasons - are you using the correct environment? i.e. Production vs. Sandbox");
    }
});

service.on("timeout", function () {
    console.log("Connection Timeout");
});

service.on("disconnected", function() {
    console.log("Disconnected from APNS");
});

service.on("socketError", console.error);


// If you plan on sending identical paylods to many devices you can do something like this.
function pushNotificationToMany() {
    console.log("Sending the same notification each of the devices with one call to pushNotification.");
    var note = new apn.notification();
    note.setAlertText(val.gsx$description.$t);
    note.badge = 1;
    //note.sound = "ping.aiff";

    service.pushNotification(note, tokens);
}

pushNotificationToMany();
  
// =======================  
            } else {
                console.log('Error while performing Query.' + err);
            } 
            });
      
        } else {
            console.log("Response" + response.statusCode);
        }
    }
    });
});
