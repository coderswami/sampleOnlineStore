/* jshint unused:false */
'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var orderModel = require('./order.model');

// Clear all orders
function cleanup(done) {
	orderModel.model.remove().exec().then(function () { done();	});
}

describe('/api/orders', function () {

	var order;

	// reset order before each test
	beforeEach(function () {
		order = {
			name: 'Dog',
			info: 'Hello, this is dog.',
			active: true
		};
	});

	// Clear orders before each test
	beforeEach(cleanup);

	// Clear orders after each test
	afterEach(cleanup);

	describe('GET', function () {

		it('should respond with JSON array', function (done) {
			request(app)
				.get('/api/orders')
				.set('Accept', 'application/json')
				.expect(200)
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					res.body.should.be.instanceof(Array);
					done();
				});
		});

		it('should respond with an error for a malformed order id parameter', function (done) {
			request(app)
				.get('/api/orders/malformedid')
				.set('Accept', 'application/json')
				.expect(400)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should respond with an not found error for a not existing order id', function (done) {
			request(app)
				.get('/api/orders/cccccccccccccccccccccccc')
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should return a order for its id', function (done) {
			orderModel.model(order).save(function (err, doc) {
				request(app)
					.get('/api/orders/' + doc._id)
					.set('Accept', 'application/json')
					.expect(200)
					.expect('Content-Type', /json/)
					.end(function (err, res) {
						if (err) {
							return done(err);
						}
						res.body.should.be.an.Object.and.have.properties(order);
						res.body._id.should.exist;
						done();
					});
			});
		});

	});

	describe('POST', function () {

		it('should create a new order and respond with 201 and the created order', function (done) {
			request(app)
				.post('/api/orders')
				.set('Accept', 'application/json')
				.send(order)
				.expect(201)
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					res.body.should.be.an.Object.and.have.properties(order);
					res.body._id.should.exist;
					done();
				});
		});

	});

	describe('PUT', function () {

		it('should return an error if attempting a put without an id', function (done) {
			request(app)
				.put('/api/orders')
				.set('Accept', 'application/json')
				.send(order)
				.expect(404)
				.end(done);
		});

		it('should respond with an not found error for a not existing order id', function (done) {
			request(app)
				.put('/api/orders/cccccccccccccccccccccccc')
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should update a order and respond with the updated order', function (done) {
			request(app)
				.post('/api/orders')
				.set('Accept', 'application/json')
				.send(order)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					order.name = 'Cat';
					// check if id is stripped on update
					order._id = 'malformed id string';
					request(app)
						.put('/api/orders/' + res.body._id)
						.set('Accept', 'application/json')
						.send(order)
						.expect(200)
						.expect('Content-Type', /json/)
						.end(function (err, res) {
							if (err) {
								return done(err);
							}
							res.body.should.be.an.Object.and.have.property('name', order.name);
							done();
						});
				});
		});

	});

	describe('DELETE', function () {

		it('should return an error if attempting a delete without an id', function (done) {
			request(app)
				.delete('/api/orders')
				.set('Accept', 'application/json')
				.expect(404)
				.end(done);
		});

		it('should respond with an not found error for a not existing order id', function (done) {
			request(app)
				.delete('/api/orders/cccccccccccccccccccccccc')
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should delete a order and respond with 204', function (done) {
			request(app)
				.post('/api/orders')
				.set('Accept', 'application/json')
				.send(order)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					request(app)
						.delete('/api/orders/' + res.body._id)
						.set('Accept', 'application/json')
						.expect(204)
						.end(done);
				});
		});
	});
});
