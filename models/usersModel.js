'use strict';

const db = require('../db');

let usersSchema = new db.Schema({
    userid:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
}); 

module.exports = db.mongoose.model('users', usersSchema);
