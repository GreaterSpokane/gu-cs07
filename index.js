//  Initialize .env files 
require('dotenv').config();

var session = require('express-session');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var app = express();

//  Database setup
const DB_CLUSTER = process.env.DB_CLUSTER;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CONFIG = process.env.DB_CONFIG
const COLLECTION = "indicators";
const URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/${COLLECTION}${DB_CONFIG}`;

//  Database connection logic
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var conn = mongoose.connection;
conn.on('connected', () => {
    console.log('Database connected successfully');
});
conn.on('disconnected', () => {
    console.log('Database disconnected successfully');
});
conn.on('error', console.error.bind(console, 'Connection error\n'));

//  View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));
app.use(session({
    secret: process.env.USER_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        // Session expires after 5 min of inactivity.
        expires: 300000
    }
}));

//  Routers
var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var laborForceRouter = require('./routes/laborForce');
var laborParticipationRouter = require('./routes/laborParticipation')
var medianHousingRouter = require('./routes/housing');
var employedRouter = require("./routes/employed");
var unemployedRouter = require('./routes/unemployed');
var naturalChangeRouter = require("./routes/naturalChange");
var netDomesticMigrationRouter = require('./routes/netDomesticMigration');
var housingAffordabilityRouter = require('./routes/housingAffordability');
var testEndpointsRouter = require('./routes/testEndpoints');
var authRouter = require('./routes/auth');

// API Endpoints
app.use(indexRouter);
app.use(dashboardRouter);
app.use(laborForceRouter);
app.use(laborParticipationRouter);
app.use(medianHousingRouter);
app.use(unemployedRouter);
app.use(naturalChangeRouter);
app.use(employedRouter);
app.use(netDomesticMigrationRouter);
app.use(housingAffordabilityRouter);
app.use(testEndpointsRouter);
app.use(authRouter);

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;