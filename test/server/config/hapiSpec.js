'use strict';
process.env.NODE_ENV = 'test';

var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;

var server = require('../../../server/');


describe('hapi server', function () {

  it('returns 200 on root', function (done) {
    server.inject({url: '/', method: 'GET'}, function (response) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});
