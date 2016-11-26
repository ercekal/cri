var express = require('express');
var router = express.Router();
var models = require("../models");

router.get('/', function(req, res, next) {
  models.Sport.findAll({}).then(function(sports) {
    res.render('index', { title: 'Sport Friend Finder', sports: sports, flash: req.flash('logout') });
  });
});

// must be deleted after MVP
router.get("/addsportsstatuses", function(req, res, next) {
  models.Sport.findOrCreate({where: {name: "Earthquake"}}).then(function() {});
  models.Sport.findOrCreate({where: {name: "Flood"}}).then(function() {});
  models.Sport.findOrCreate({where: {name: "Tornado"}}).then(function() {});
  models.Sport.findOrCreate({where: {name: "Tsunami"}}).then(function() {});
  models.Sport.findOrCreate({where: {name: "Landslide"}}).then(function() {});
  models.Sport.findOrCreate({where: {name: "Storm"}}).then(function() {});
  models.Sport.findOrCreate({where: {name: "Fire"}}).then(function() {});
  models.Sport.findOrCreate({where: {name: "Epidemic"}}).then(function() {});
  models.Status.findOrCreate({where: {name: "Open"}}).then(function() {});
  models.Status.findOrCreate({where: {name: "Accepted"}}).then(function() {});
  models.Status.findOrCreate({where: {name: "Rejected"}}).then(function() {});
  res.redirect('/');
})

module.exports = router;
