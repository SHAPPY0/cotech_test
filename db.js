'use strict';

var mongoooseInst = require('mongoose').Mongoose;
var mongoose = new mongoooseInst();
var Schema = mongoose.Schema;

var uri = 'mongodb://127.0.0.1:27017/cotech_test';

mongoose.connect(uri, {promiseLibrary: global.Promise,poolSize: 10,useNewUrlParser: true });

module.exports = {
	mongoose:mongoose,
	Schema :Schema
}