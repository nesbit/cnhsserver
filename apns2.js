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
  host     : 'sp6xl8zoyvbumaa2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user     : 'oi7hss5h1e0qnfb7',
  password : 'hpsj2fsktv68mi1d',
  database : 'j2rymydc2j3ul9jp'
});








cron.schedule("* * * * *", function(){







request({
  uri: "https://spreadsheets.google.com/feeds/list/1QR7Vha2sW8nKjudbnkJMXAXkNPn8LULqq47Td8jrUKY/od6/public/values?alt=json",
}, function(error, response, body) {
  //console.log(body);
    contents = JSON.parse(body);
    //console.log("New Text!!!");
    for(var i in contents.feed.entry) {
        var val = contents.feed.entry[i];
        var date = moment(val.gsx$timetosendnotification.$t, "MM-DD-YYYY HH:mm:ss");
        var now = moment().tz("America/Los_Angeles").format("MM-DD-YYYY HH:mm:ss");
        var diffe = date.diff(now, 'minutes');
        console.log("IOS" + +diffe);
      // =================
        if (diffe == 0) {
            console.log("IOS: Currently Sending!!!!");


        
            
// ===================
            mysqlConnection.query("SELECT * from `registrationIDIOS`", function(err, rows, fields) {
                tokens = [];
                for (var i in rows) {
                tokens.push(rows[i].id);
                }

                console.log("IOS: array updated");
                if (!err) {
                console.log('IOS: No err: ');
// =======================

var service = new apn.connection({ production: true });

service.on("connected", function() {
    console.log("IOS: Connected");
});

service.on("transmitted", function(notification, device) {
    console.log("IOS: Notification transmitted to:" + device.token.toString("hex"));
});

service.on("transmissionError", function(errCode, notification, device) {
    console.error("IOS: Notification caused error: " + errCode + " for device ", device, notification);
    if (errCode === 8) {
        console.log("IOS: A error code of 8 indicates that the device token is invalid. This could be for a number of reasons - are you using the correct environment? i.e. Production vs. Sandbox");
    }
});

service.on("timeout", function () {
    console.log("IOS: Connection Timeout");
});

service.on("disconnected", function() {
    console.log("IOS: Disconnected from APNS");
});

service.on("socketError", console.error);


// If you plan on sending identical paylods to many devices you can do something like this.
function pushNotificationToMany() {
    console.log("IOS: Sending the same notification each of the devices with one call to pushNotification.");
    var note = new apn.notification();
    note.body = val.gsx$alert.$t;
  //note.setAlertText(val.gsx$alert.$t);
    note.badge = 1;
    note.sound = "chime.caf";

    service.pushNotification(note, tokens);
}

pushNotificationToMany();
  
// =======================  
            } else {
                console.log('IOS: Error while performing Query.' + err);
            } 
            });
      
        } else {
            console.log("IOS: Response" + response.statusCode);
        }
    }
    });
});
