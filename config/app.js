const express =  require('express');
const bodyParser = require('body-parser')
const router = require('../routes');
const cors = require('cors');

const app = express();

app.use( bodyParser.json() );

app.use( cors() );

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use( '/' , router );

module.exports = app;