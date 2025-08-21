const db = require('../db');

const menu = 
{
    getAll(callback){
        db.all("Select * from menu", [], callback);
    },
    getById(id, callback) {
        db.get("SELECT * FROM menu WHERE dish_id = ?", [id], callback);
    }
};

module.exports = menu;