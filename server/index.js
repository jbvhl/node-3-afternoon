require('dotenv').config();
const express = require('express');
const {json} = require('body-parser');
const session = require('express-session');

const checkForSession = require('./middlewares/checkForSession');

const swagCtrl = require('./controllers/swag_controller');
const authCtrl = require('./controllers/auth_controller');
const cartCtrl = require('./controllers/cart_controller');
const searchCtrl = require('./controllers/search_controller');

const {SERVER_PORT, SESSION_SECRET} = process.env

const app = express();

app.use(json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

app.get('/api/swag', swagCtrl.read);
app.get('/api/user', authCtrl.getUser);
app.get('/api/search', searchCtrl.search);

app.post('/api/login', authCtrl.login);
app.post('/api/register', authCtrl.register);
app.post('/api/signout', authCtrl.signout);
app.post('/api/cart', cartCtrl.add);
app.post('/api/cart/checkout', cartCtrl.checkout);

app.delete('/api/cart', cartCtrl.delete);

const port = SERVER_PORT || 3000;
app.listen(port, () => {
    console.log(`We live in that ${port}`)
});

