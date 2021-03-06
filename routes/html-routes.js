//var path = require('path');
var Liquor = require("../models/liquor.js");
var mixedDrinks = require("../models/mixedDrink.js");
//var liquorData = require("../models/liquored.js");
var Mixer = require("../models/mixer.js");


module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('index');
    });


    app.get('/liquors/home', function(req, res) {
        res.render('partials/liquor/liquor2');
    });

    app.get('/liquors/survey', function(req, res) {
        res.render('partials/liquor/survey');
    });

    app.get('/liquors/all', function(req, res) {
        Liquor.findAll({})
            .then(function(dbLiquor) {
                res.render('partials/liquor/liquor-list', { liquor: dbLiquor });
            });

    });

    /* Liquors */
    app.get('/liquors/add', function(req, res) {
        Liquor.findAll({})
            .then(function(dbLiquor) {
                res.render('partials/liquor/liquor-add', { liquor: dbLiquor });
            });

    });

    app.get('/liquors/:liquor_id', function(req, res) {
        Liquor.findOne({
                where: {
                    liquor_id: req.body.liquor_id
                }
            })
            .then(function(dbLiquor) {
                res.render('liquor-individual', { liquor: dbLiquor });
            });
    });


    /* Mixed Drinks */

    app.get('/mixed-drinks/all', function(req, res) {
        Liquor.findAll({})
            .then(function(dbLiquor) {
                Mixer.findAll({})
                    .then(function(dbMixer) {
                        res.render('partials/mixed-drinks/mixed-block', { liquor: dbLiquor, mixer: dbMixer });
                        //console.log(dbLiquor);
                        console.log(dbMixer);
                    });

            });
    });

    app.get('/mixed-drinks/:id', function(req, res) {
        mixedDrinks.findOne({
                where: {
                    mixed_id: req.body.mixed_id
                }
            })
            .then(function(dbMixedDrinks) {
                res.render('mixed-drink-individual', { mixedDrinks: dbMixedDrinks });
            });
    });


    app.get('/mixed/all', function(req, res) {
        mixedDrinks.findAll({})
            .then(function(dbMixedDrinks) {
                res.render('partials/mixed-drinks/mixed-list', { mixedDrinks: dbMixedDrinks });
            });

    });

    app.get('/mixers/all', function(req, res) {
        Mixer.findAll({})
            .then(function(dbMixer) {
                res.render('partials/mixed-drinks/mixer-list', { mixer: dbMixer });
            });

    });

    app.get('/mixers/add', function(req, res) {
        Mixer.findAll({})
            .then(function(dbMixer) {
                res.render('partials/mixed-drinks/mixer-add', { mixer: dbMixer });
            });

    });

}; // end of exports