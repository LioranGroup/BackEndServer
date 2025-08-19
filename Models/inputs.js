const db = require('../db')

const inputs = 
{
    getAll(callback){
        db.all("Select * from inputs", [], callback);
    },

    getById(id, callback) {
        db.get("SELECT * FROM inputs WHERE input_id = ?", [id], callback);
    },

    deleteById(id, callback) {
        db.run("DELETE FROM inputs WHERE input_id = ?", [id], function(err) {
            if (err) return callback(err);
            callback(null, { message: "Insumo eliminado", id: this.lastID });})

    },

    newInput(Item, Qty, meassure, min,  callback) {
        const findInput = "SELECT * FROM inputs WHERE LOWER(TRIM(input_name)) = LOWER(TRIM(?));";

        console.log("Item:", Item, "Qty:", Qty, "meassure:", meassure, "min:", min);
        db.get(findInput, [Item], (err, row) => {
            if (err) return callback(err);
            if (row) {
                callback(null, { message: "Insumo existente", id: row.input_id });
                // console.log("Insumo existente:", row.input_name.toLowerCase().trim());
            }
            else{
                db.run("INSERT INTO inputs (input_name, qty, meassure, min) VALUES (?, ?, ?, ?)", [Item, Qty, meassure, min], function(err) {
                    if (err) {
                        return callback(err);
                    }
                callback(null, { message: "Nuevo insumo agregado", id: this.lastID });
            })}
            
        });
    }
}



module.exports = inputs;