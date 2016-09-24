var gcm = require('node-gcm');
var request = require('request');
var mysql = require('mysql');
//var $ = require('jQuery');
var http = require('http');
var cron = require('node-cron');
var moment = require('moment-timezone');
var contents;
var idFor = "";
var arrReg = [];

process.env.TZ = "America/Los_Angeles";

var connection = mysql.createConnection({
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
    console.log("Android: New Text!!!");
    for(var i in contents.feed.entry) {
        var val = contents.feed.entry[i];
        var date = moment(val.gsx$timetosendnotification.$t, "MM-DD-YYYY HH:mm:ss");
        //var now = moment().tz("America/Los_Angeles").format("MM-DD-YYYY HH:mm:ss");
        //CHANGED
        var now = moment().format("MM-DD-YYYY HH:mm:ss");
        //END CHANGED
        var diffe = date.diff(now, 'minutes');
        console.log("Android: " + diffe);
      // =================
        if (diffe == 0) {
            console.log("Android: Currently Sending!!!!");


        var message = new gcm.Message({
                    data: { 
                    key1: 'msg1' ,
                    sound : "default",
                    vibrate: "default"
                    },
                    notification: {
                        title: contents.feed.entry[i].gsx$alert.$t,
                        icon: "ic_launcher",
                        body: val.gsx$description.$t,
                        sound:"default"
                    }
                });
            console.log("Android: Sending " + val.gsx$alert.$t)

            connection.query("SELECT * from `registrationID`", function(err, rows, fields) {
                arrReg = [];
                for (var i in rows) {
                arrReg.push(rows[i].id);
                }

                console.log("Android: array updated");
                if (!err) {
                console.log('Android: No err: ');
// =======================
  /*
                var message = new gcm.Message({
                    data: { 
                    key1: 'msg1' ,
                    sound : "default",
                    vibrate: "default"
                    },
                    notification: {
                        title: val.gsx$alert.$t,
                        icon: "ic_launcher",
                        body: val.gsx$description.$t,
                        sound:"default"
                    }
                });
      
      */
                var sender = new gcm.Sender('AIzaSyA3VVsV4HxiuLaRcDOvXVKqRWZXPeARi8U');
                var regTokens = arrReg;
                console.log("Android: reg "+arrReg);
        //var regTokens = ['cZcd5OfAU6A:APA91bGiCCD1EToCsgo3BYa6SNRPMKNhdmlt3DMbHuouAbTjxLB-4t1l0gffDt9sHIPIaRTJhYJt68tPRRCTkfwC8OqQCMvuRTxMsFmxJQQRtWxfH9P9BTVmSnaSdCk07COxFA8l-s25'];
                
                
                sender.send(message, { registrationTokens: regTokens }, function (err, response) {
                    if(err) 
                        console.error("Android: sender error: "+err);
                    else
                        console.log("Android: \n " + response);
                });
  
// =======================  
            } else {
                console.log('Android: Error while performing Query.' + err);
            } 
            });
      
        } else {
            console.log("Android: Response" + response.statusCode);
        }
    }
    });
});
