var connection = require('../connection');

function Submodulo() {
  this.getAll = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from submodulo', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

   this.get = function(idmodulo, res) {
    console.log(id);
    connection.acquire(function(err, con) {
      con.query('select * from submodulo where idmodulo= ?', [idmodulo],  function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.create = function(todo, res) {
    console.log(todo);
    connection.acquire(function(err, con) {
      con.query('insert into submodulo set ?', todo, function(err, result) {
        con.release();
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
      con.query('update submodulo set ? where id = ?', [todo, todo.id], function(err, result) {
        con.release();
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
      con.query('delete from submodulo where id = ?', [id], function(err, result) {
        con.release();
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
