/* eslint-env mocha */
var app = require('../server');
var request = require('supertest');
var chai = require('chai').expect;

describe('CALCULATOR', function() {
  it('should respond with an object', function(done) {
    request(app)
      .post('/calc')
      .send({
        income: 60000
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        var result = res.body;
        chai(result).to.be.an('object');
        //chai(result.totalTax).to.be.an('number');
        done();
      });
  });

  it('should have net, personalAllowance, and totalTax properties', function(done) {
    request(app)
      .post('/calc')
      .send({
        income: 60000
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        var result = res.body;
        chai(result).to.have.own.property('net');
        chai(result).to.have.own.property('personalAllowance');
        chai(result).to.have.own.property('totalTax');
        done();
      });
  });

  it('should have basic, higher, and additional properties if income > 150000', function(done) {
    request(app)
      .post('/calc')
      .send({
        income: 160000
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        var result = res.body;
        chai(result).to.have.all.keys('net', 'personalAllowance', 'totalTax', 'basic', 'higher', 'additional');
        done();
      });
  });

  it('should not have any of basic, higher, or additional properties if income <= 11500', function(done) {
    request(app)
      .post('/calc')
      .send({
        income: 10000
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        var result = res.body;
        chai(result).to.not.have.any.keys('basic', 'higher', 'additional');
        done();
      });
  });
});
