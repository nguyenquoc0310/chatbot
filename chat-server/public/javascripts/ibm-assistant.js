var watson = require('watson-developer-cloud');

var username = 'e24b9eaa-ee55-45bb-8183-cb33cc4eb331';
var password = 'CglS0TQv7AJM';

var assistant = new watson.AssistantV1({
  username: username,
  password: password,
  version: '2018-07-10'
});

module.exports =
  {
    // Example : 'menu'
    getAssistantInfo: function (message) {
      return new Promise(function (resolve, reject) {
        assistant.message({
          workspace_id: '9480da89-31ec-42aa-bdbc-f525a3d7ffbc',
          input: { 'text': message }
        }, function (err, response) {
          if (err) {
            reject(err);
            console.log('error:', err);
          } else {
            var obj = JSON.parse(JSON.stringify(response, null, 2));
            resolve(obj);
          }
        });
      });
    }
  }