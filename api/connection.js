
var sql = require('mssql');

function Connection() {

var config = null;

this.init = function() {

  this.config = {
    user:'sa',
    password: 'opa1.',
    server:'POPA8\\SQL2012',
    database:'pruebaopa',
    port:1433
  };



};

 
this.acquire = function(callback){

var conn = new sql.Connection(this.config);
   
conn.connect(function(err, connection) {
  var req = new sql.Request(conn);
  callback(err, req);
});
//conn.close();
};

};


module.exports = new Connection();