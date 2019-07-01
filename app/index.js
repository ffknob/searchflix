const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv').config();

const indexRoutes = require('./routes/index');
const indicesRoutes = require('./routes/indices');
const searchRoutes = require('./routes/search');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.use('/', indexRoutes);
app.use('/indices', indicesRoutes);
app.use('/search', searchRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT), () => console.log(`Server running on port ${PORT}`);
