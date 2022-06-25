const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();

const db = require('./config/db');

//connect to db
db.connect();

const port = 3000;
const route = require('./routes');

app.use(express.static(path.join(__dirname, '/public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());
//HTTP logger
app.use(morgan('combined'));
//method override
app.use(methodOverride('_method'));
//Template engine
app.engine(
    '.hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resource/views'));

//Route initial
route(app);

app.listen(port, () => console.log(' anh hoa dep trai'));
