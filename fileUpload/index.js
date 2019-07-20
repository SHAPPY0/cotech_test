'use strict';
const csv = require('csvtojson');
const orderModel = require('../models/orderModel');

module.exports = (app)=>{
    const KEYS = {
        "Region": "region",
        "Country": "country",
        "Item Type":  "item_type",
        "Sales Channel": "sales_channel",
        "Order Priority": "order_priority",
        "Order Date":  "order_date",
        "Order ID":  "order_id",
        "Ship Date":  "ship_date",
        "Units Sold": "units_sold",
        "Unit Price": "unit_price",
        "Unit Cost":   "unit_cost",
        "Total Revenue": "total_revenue",
        "Total Cost": "total_cost",
        "Total Profit": "total_profit"    
        };

    function checkAuthorization(req,res,next){ 
        if(!req.headers.authorization){
            return res.send({'success':false, 'msg':'Not authorized, Please login'});
        }else{
            let token = req.headers.authorization.split('Bearer ');
            if(token[1].length<100) return res.send({'success':false, 'msg':'Invalid token'});
            else next();
        }
        
    }

    function readCsvFile(){
        let self = this;
        return new Promise((resolve, reject)=>{
            const filePath = '10000_Sales_Records.csv'; 

        csv().fromFile(filePath)
            .then(function(rows){ 
                    self['rows'] = rows;
                    resolve();
            });
        });
    }

    function normalizeDataFormat(){
        let self = this;
        return new Promise((resolve, reject)=>{
            if(self.rows.length){
                self.rows.forEach(function(obj){
                    for(let k in obj){
                        obj[KEYS[k]] = obj[k];
                        delete obj[k];
                    }
                });
                return resolve();

            }else return reject();
            
        });
    }

    function insertDataInDb(){
        let self = this;
        return new Promise((resolve, reject)=>{
            if(!self.rows.length) return reject();
            self.recordsInserted = 0;
            let c = 0;
            (function saveData(){
                if(c > self.rows.length-1){
                   return resolve(self.recordsInserted);
                }
                let newRecord = new orderModel(self.rows[c]);
                newRecord.save((err, data)=>{
                    if(err){
                        console.log('Err '+err);
                        c++;
                        saveData();
                    } else{
                        self.recordsInserted = parseInt(self.recordsInserted) +1;
                        c++;
                        saveData();
                    }
                })
                
            })();
        })
    }

    //Read CSV and insert data into db
    app.get('/api/readCsv',(req,res,next)=>{
        let options = {};
        readCsvFile.call(options)
            .then(normalizeDataFormat.bind(options))
            .then(insertDataInDb.bind(options))
            .then((result)=>{
                return res.send({'success':true, 'msg':result+' Rows Inserted'});
            }).catch((err)=>{
                return res.send({'success':false, 'msg':'Error Occured '+err});
            });
    });

    //fetch rows with pagination 
    app.get('/api/fetchRows/:offset/:limit', checkAuthorization, (req,res,next)=>{
        let offset = req.params.offset;
        let limit = req.params.limit;
        let filter = {'country':req.query.country,'region':req.query.region} 
        let findQ = {};
        for(let k in filter){
            if(filter[k]) findQ[k] = filter[k];
        };
        let query = orderModel.find(findQ).skip(parseInt(offset)).limit(parseInt(limit));
        query.exec((err, result)=>{
            if(err)  return res.send({'success':false, 'msg':'Error Occured '+err});
            else  return res.send({'success':true, 'data':result});
        })

    })



}