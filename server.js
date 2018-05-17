const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const RestHelper = require('./app/helpers/rest-helper');
const debug = require('debug')('Express4');

// require('./app/models/db');
//require('./app/helpers/passport');

const routesAPI = require('./app/routers/index');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), function ()  {
    console.log("Serving Escolando...");
});

app.use('/api', routesAPI);

app.get('/', function (req, res) { res.render('index'); });
app.get('*', function (req, res) { res.sendfile('./public/index.html'); });

module.exports = app;