var connection = require('../connection');

function Modulo() {
  this.getAll = function(res) {
    console.log('get ALL');
    connection.acquire(function(err, con) {
     con.query('select * from modulo').then(function (result) {
       console.log("result");
        res.send(result);
     },
     function(err){
        console.log("err");
         res.send(err);
     });

    });
     

  };

   this.get = function(id, res) {
    console.log(id);
    connection.acquire(function(err, con) {
      con.input('id', id);
      con.query('select * from modulo where id= @id',  function(err, result) {
        res.send(result);
      });
    });
  };

  this.create = function(todo, res) {
    console.log(todo);
    connection.acquire(function(err, con) {
      con.input('nombre', todo.nombre);
      con.input('codmodulo', todo.codmodulo);
      con.query('insert into modulo (nombre, codmodulo) values (@nombre, @codmodulo)', function(err, result, value) {
        if (err) {
         res.send(err);
        } else {
          res.send(result);
        }
      });
      
    });
  };

  this.update = function(todo, res) {
    console.log(todo);
    connection.acquire(function(err, con) {
      con.input('nombre', todo.nombre);
      con.input('codmodulo', todo.codmodulo);
      con.input('id', todo.id);
      con.query('update modulo set nombre= @nombre, codmodulo= @codmodulo where id = @id', function(err, result, value) {
        if (err) {
          res.send({status: 1, message: 'TODO update failed'});
        } else {
          res.send({status: 0, message: 'TODO updated successfully'});
        }
      });
    });
  };

  this.delete = function(id, res) {
    connection.acquire(function(err, con) {
      con.input('id', id);
      con.query('delete from modulo where id = @id', function(err, result, value) {
        if (err) {
          res.send({status: 1, message: 'Failed to delete'});
        } else {
          res.send({status: 0, message: 'Deleted successfully'});
        }
      });
    });
  };
}

module.exports = new Modulo();
