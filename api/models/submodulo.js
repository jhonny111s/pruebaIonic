var connection = require('../connection');

function Submodulo() {
  this.getAll = function(id, res) {
    connection.acquire(function(err, con) {
       con.input('idmodulo', id);
      con.query('select * from submodulo idmodulo= @idmodulo', function(err, result) {
        res.send(result);
      });
    });
  };

   this.get = function(idmodulo, res) {

    console.log(idmodulo);

    connection.acquire(function(err, con) {
       con.input('idmodulo', idmodulo);
      con.query('select * from submodulo where idmodulo= @idmodulo',  function(err, result) {
        res.send(result);
      });
    });
  };

  this.create = function(todo, res) {
    console.log(todo);
    connection.acquire(function(err, con) {
       con.input('nombre', todo.nombre);
       con.input('idmodulo', todo.idmodulo);
      con.query('insert into submodulo set (nombre, idmodulo) values (@nombre, @idmodulo)', function(err, result, value) {
        if (err) {
          res.send({status: 1, message: 'TODO creation failed'});
        } else {
          res.send({status: 0, message: 'TODO created successfully'});
        }
      });
    });
  };

  this.update = function(todo, res) {
    connection.acquire(function(err, con) {
       con.input('id', todo.id);
       con.input('idmodulo', todo.idmodulo);
       con.input('nombre', todo.nombre);
      con.query('update submodulo set nombre= @nombre, idmodulo= @idmodulo where id = @id', function(err, result, value) {
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
      con.query('delete from submodulo where id = @id', function(err, result) {
        if (err) {
          res.send({status: 1, message: 'Failed to delete'});
        } else {
          res.send({status: 0, message: 'Deleted successfully'});
        }
      });
    });
  };
}

module.exports = new Submodulo();
