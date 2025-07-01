const db = require('../db')

const inputs = 
{
    getAll(callback){
        db.all("Select * from inputs", [], callback);
    }
}


module.exports = inputs;