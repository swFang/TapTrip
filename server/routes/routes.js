const express = require('express');
const generateItinerary = require('../services/generateItinerary');

module.exports = (app) => {
    app.get('/', (req,res) => {
        res.send({hi:'there'});
    });

    app.use (express.json());

    app.post('/generateItinerary', (req, res) => {
        //translate(req.body.city);
        console.log('got req');
        console.log(req.body.city);
        generateItinerary(req.body.city)
        res.send('received');
        
    });
};