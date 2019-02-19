const swag = require('../models/swag');

module.exports = {
    add: (req, res, next) => {
        const {id} = req.query;
        let {cart} = req.session.user;
        const idx = cart.findIndex(swag => swag.id === id);

        if (idx === -1) {
            const selected = swag.find(swag => swag.id === id);

            cart.push(selected);
            req.session.user.total += selected.price;
        }
        res.status(200).send(req.session.user);
    },

    delete: (req, res, next) => {
        const {id} = req.query;
        const {cart} = req.session.user;
        const selected = swag.find(swag => swag.id === id);

        if (selected) {
            const i = cart.findIndex(swag => swag.id === id);
            cart.splice(i, 1);
            req.session.user.total -= selected.price;
        }
        res.statu(200).send(req.session.user);
    },

    checkout: (req, res, next) => {
        const {user} = req.session;

        user.cart = [];
        user.total = 0;

        res.status(200).send(req.session.user);
    }
}