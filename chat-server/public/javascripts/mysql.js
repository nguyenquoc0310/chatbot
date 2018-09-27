var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "chatbot"
});

con.connect(function (err) {
  if (err) throw err;
});

module.exports =
  {
    getURL: function (keyword) {
      return new Promise(function (resolve, reject) {
        if (keyword.length == 1) {
          con.query("SELECT * FROM chatbot.cb_content_manage WHERE JSON_EXTRACT(CB_CONTENT_KEYWORD_EXTRACT, '$.*') LIKE '%" + keyword[0] + "%'", function (err, result) {
            if (err) throw err;
            return resolve(result);
          });
        } else {
          var query_sql = "SELECT * FROM ((SELECT * FROM chatbot.cb_content_manage WHERE JSON_EXTRACT(CB_CONTENT_KEYWORD_EXTRACT, '$.*') LIKE '%" + keyword[0] + "%') AS S" + 0 + "";
          var sql_on = " ON ";
          for (var i = 1; i < keyword.length; i++) {
            query_sql += " INNER JOIN ";
            query_sql += "(SELECT * FROM chatbot.cb_content_manage WHERE JSON_EXTRACT(CB_CONTENT_KEYWORD_EXTRACT, '$.*') LIKE '%" + keyword[i] + "%') AS S" + i + "";
            sql_on += " S" + (i - 1) + ".CB_CONTENT_URL = S" + i + ".CB_CONTENT_URL AND ";
          }

          query_sql += sql_on.substring(0, sql_on.length - 4) + ")";

          con.query(query_sql, function (err, result) {
            if (err) throw err;
            return resolve(result);
          });
        }
      });
    }
  }