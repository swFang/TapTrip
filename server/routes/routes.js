const express = require('express');
const translate = require('../utils/cityToAngles');
const Flatted = require('flatted');

module.exports = (app) => {
    app.get('/', (req,res) => {
        res.send({hi:'there'});
    });

    app.use (express.json());

    app.post('/translate', (req, res) => {
        translate(req.body.city);
        res.send('received');
        
    });
};