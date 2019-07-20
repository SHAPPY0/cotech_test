'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app['PORT'] = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true ,limit: '100mb'}));   
app.use(bodyParser.json({limit: '100mb'}));

db.mongoose.connection.on('connected',  (err)=> {
    if(err) console.log('Error in Mongoose COnnecrion')
    else console.log('DB connected successfully');
});

require('./fileUpload')(app);
require('./user')(app);

app.listen(app['PORT'],()=>console.log('Server is started at '+ app['PORT']));