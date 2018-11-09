module.exports = {
    getConnection: function() {
      // Database connection area
      var mysql = require('mysql');
      var dbconfig = require(global.WEBROOT + '/config/database.js');
      return mysql.createConnection(dbconfig);;
    }
  };
  