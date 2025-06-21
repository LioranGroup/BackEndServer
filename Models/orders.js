const db = require('../db')

const orders = {
    getAll(callback){
        db.all("Select * from orders", [], callback);
    }
    
    ,

    getById(id,callback){
        const query = "Select * from orders where order_id = ?";
        db.get(query , [id],(err, row) => {
      if (err) return callback(err);
      if (row) {
        callback(null, row); // Usuario encontrado
      } else {
        callback(null, "The order doesn't exist"); // Usuario no encontrado
      }
    })}
    
    }



module.exports = orders;