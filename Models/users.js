const db = require('../db')

const users = {
    getAll(variable,callback){
        db.all("Select * from users", [], callback);
    },

    login(username, password, callback) {
    const query = `SELECT * FROM view_users_pss WHERE user_name = ? AND pssw = ?`;
    db.get(query, [username, password], (err, row) => {
      if (err) return callback(err);
      if (row) {
        callback(null, row); // Usuario encontrado
      } else {
        callback(null, null); // Usuario no encontrado
      }
    });
  }

};


module.exports = users;