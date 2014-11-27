'use strict';

var Lab = require('lab');

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var expect = Lab.expect;

require('../../utils/mongoUtils.js')(beforeEach);

var User = require('../../../server/models/User.js');


describe('user model', function () {
  it('should create a new User', function (done) {
    User.create({twitterId: 'test'}, function (err, created) {
      expect(err).to.equal(null);
      expect(created.twitterId).to.equal('test');
      done();
    });
  });
});
