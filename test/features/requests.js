process.env.NODE_ENV="test";

var app = require('../../app');
var Browser = require('zombie');
var http = require('http');
var models = require("../../models")

describe('log in', function() {

  before(function(){
    server = http.createServer(app).listen(3000);
    browser = new Browser({ site: 'http://localhost:3000'});
  });

  before(function(){
    models.sequelize.sync({force:true})
  });


  after(function(done) {
    server.close(done);
  });

});