'use strict';

const db = require('../db');

let orderSchema = new db.Schema({
    region:{
        type:String
    },
    country:{
        type:String
    },
    item_type:{
        type:String
    }, 
    sales_channel:{
        type:String
    },
    order_priority:{
        type:String
    },
    order_date:{
        type:String
    },
    order_id:{
        type:Number
    },
    ship_date:{
        type:String
    },
    units_sold:{
        type:Number
    },
    unit_price:{
        type:Number
    },
    unit_cost:{
        type:Number
    },
    total_revenue:{
        type:Number
    },
    total_cost:{
        type:Number
    },
    total_profit:{
        type:Number
    } 
}); 

module.exports = db.mongoose.model('orders', orderSchema);
