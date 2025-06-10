const db = require('../db')

const orders = {
    getAll(variable,callback){
        db.all("Select * from orders", [], callback);
    }
    
    /*/,

    getById(order_id,callback){
        const query = "Select * from orders where order_id = ?";
        db.get(query [order_id], callback);
    }
 */

};


module.exports = orders;