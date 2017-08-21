'use strict';
var Alexa = require("alexa-sdk");
var sink = require("./sink_cat.js");

exports.handler = function(event, context, callback) {
var alexa = Alexa.handler(event, context);
alexa.registerHandlers(handlers);
alexa.execute();
};


var handlers = {
    'LaunchRequest': function () {
        this.emit('SinkCatResponse');
    },
    'CatLocator': function () {
        this.emit('SinkCatResponse');
    },
    'SinkCatResponse': function () {
        sink.getSinkInfo((data) => {
            var status = data.text.toLowerCase();
            var dateArr = data.created_at.split(" ");
            var shortDate = `${dateArr[0]} ${dateArr[1]} ${dateArr[2]}`;

            if(status.includes("yes") || data.entities.media[0].url !== undefined){
                this.emit(':tell', `Yes. A cat was found to be in the sink on ` + shortDate);
            }else if(status.includes("no")){
                this.emit(':tell', `No. The sink was found to be empty on ` + shortDate);
            }else{
                this.emit(':tell', 'I\'m not sure about anything anymore.');
            }
        });
        
    }}

        sink.getSinkInfo((data) => {
            var status = data.text.toLowerCase();
            var dateArr = data.created_at.split(" ");
            var shortDate = `${dateArr[0]} ${dateArr[1]} ${dateArr[2]} ${dateArr[5]}`;
            if(status.includes("yes")){
                console.log(`Yes. A cat was found to be in the sink on ` + shortDate);
            }else if(status.includes("no")){
                console.log(`No. The sink was found to be empty on ` + shortDate);
            }
        });