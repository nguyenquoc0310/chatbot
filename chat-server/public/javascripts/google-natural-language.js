
// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Creates a client
const client = new language.LanguageServiceClient();

var mysql = require('./mysql');

var keyword = [];

module.exports =
  {
    // Example : 'AWSに詳しいベンダーは？'
    getAnalyzeText(message) {
      return new Promise(function (resolve, reject) {
        const document = {
          content: message,
          type: 'PLAIN_TEXT'
        };

        client
          .analyzeEntities({ document: document })
          .then(results => {
            const entities = results[0].entities;
            var idx = 0;
            entities.forEach(entity => {
              keyword[idx++] = entity.name;
            });

            return resolve(keyword);
          })
          .catch(err => {
            console.error('ERROR:', err);
          });
      });
    }

  }
