var mysql = require('../javascripts/mysql');
var ibmAssistant = require("../javascripts/ibm-assistant");
var naturalLanguage = require('../javascripts/google-natural-language');


module.exports =
    {
        execute: function (message) {
            return new Promise(function (resolve, reject) {
                ibmAssistant.getAssistantInfo(message).then((result) => {
                    var intent = "";
                    var json_result;
                    var message_output;

                    if (result.intents.length > 0) {
                        intent = result.intents[0].intent;
                    }
                    
                    if (intent == "Information") {
                        // Call analyze keyword
                        naturalLanguage.getAnalyzeText(message).then((resultAnalyze) => { 
                            // Call mysql
                            mysql.getURL(resultAnalyze).then((result) => {  
                                var object = {};
                                if (result == "") {
                                    object.message = "I didn't understand. You can try rephrasing.";
                                } else {
                                    object.message = "Link : ";
                                }
                                
                                object.url = [];

                                result.forEach(element => {
                                    object.url.push({
                                        name: element.CB_CONTENT_KEYWORD,
                                        url: element.CB_CONTENT_URL
                                    });
                                });
                                return resolve(object);
                            });
                        });
                    } else if (intent == "Confirm") {
                        if (message == "OK") {
                            message_output = "Confirm OK. Thanks you for confirm.";
                            json_result = { message: message_output, url: [] };
                            return resolve(json_result);
                        } else {
                            message_output = "Confirm NG. Thanks you, do you want to find other information?";
                            json_result = { message: message_output, url: [] };
                            return resolve(json_result);
                        }
                    } else {
                        message_output = result.output.text;
                        json_result = { message: message_output, url: [] };
                        return resolve(json_result);
                    }
                });
            });
        }
    }