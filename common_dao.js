var db_conn = require('./db_conn');

var dao = {
  query: function(sql, params) {
    return new Promise(function(resolve, reject) {
      var connection = db_conn.getConnection();
      connection.query(sql, params, function(err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
        connection.end();
      });
    });
  },
  escape: function(value){
    var connection = db_conn.getConnection();
    return connection.escape(value);
  }
};

module.exports = dao;
