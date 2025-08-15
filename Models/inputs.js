const db = require('../db')

const inputs = 
{
    getAll(callback){
        db.all("Select * from inputs", [], callback);
    },

    getById(id, callback) {
        db.get("SELECT * FROM inputs WHERE input_id = ?", [id], callback);
    },

    newInput(Item, Qty, meassure, min,  callback) {
        const findInput = "SELECT * FROM inputs WHERE input_name = ?";
        db.get(findInput, [Item], (err, row) => {
            if (err) return callback(err);
            if (row & row.input_name === Item) {
                callback(null, { message: "Insumo existente", id: row.input_id });
            }else{db.run("INSERT INTO inputs (input_name, qty, meassure, min) VALUES (?, ?, ?, ?)", [Item, Qty, meassure, min], function(err) {
                if (err) {
                    return callback(err);
                }
                callback(null, { message: "Nuevo insumo agregado", id: this.lastID });
            })}
            
        });
    }
}



module.exports = inputs;