/* jshint unused:false */
'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var catalogModel = require('./catalog.model');

// Clear all catalogs
function cleanup(done) {
	catalogModel.model.remove().exec().then(function () { done();	});
}

describe('/api/catalog', function () {

	var catalog;

	// reset catalog before each test
	beforeEach(function () {
		catalog = {
			name: 'Dog',
			info: 'Hello, this is dog.',
			active: true
		};
	});

	// Clear catalogs before each test
	beforeEach(cleanup);

	// Clear catalogs after each test
	afterEach(cleanup);

	describe('GET', function () {

		it('should respond with JSON array', function (done) {
			request(app)
				.get('/api/catalog')
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

		it('should respond with an error for a malformed catalog id parameter', function (done) {
			request(app)
				.get('/api/catalog/malformedid')
				.set('Accept', 'application/json')
				.expect(400)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should respond with an not found error for a not existing catalog id', function (done) {
			request(app)
				.get('/api/catalog/cccccccccccccccccccccccc')
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should return a catalog for its id', function (done) {
			catalogModel.model(catalog).save(function (err, doc) {
				request(app)
					.get('/api/catalog/' + doc._id)
					.set('Accept', 'application/json')
					.expect(200)
					.expect('Content-Type', /json/)
					.end(function (err, res) {
						if (err) {
							return done(err);
						}
						res.body.should.be.an.Object.and.have.properties(catalog);
						res.body._id.should.exist;
						done();
					});
			});
		});

	});

	describe('POST', function () {

		it('should create a new catalog and respond with 201 and the created catalog', function (done) {
			request(app)
				.post('/api/catalog')
				.set('Accept', 'application/json')
				.send(catalog)
				.expect(201)
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					res.body.should.be.an.Object.and.have.properties(catalog);
					res.body._id.should.exist;
					done();
				});
		});

	});

	describe('PUT', function () {

		it('should return an error if attempting a put without an id', function (done) {
			request(app)
				.put('/api/catalog')
				.set('Accept', 'application/json')
				.send(catalog)
				.expect(404)
				.end(done);
		});

		it('should respond with an not found error for a not existing catalog id', function (done) {
			request(app)
				.put('/api/catalog/cccccccccccccccccccccccc')
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should update a catalog and respond with the updated catalog', function (done) {
			request(app)
				.post('/api/catalog')
				.set('Accept', 'application/json')
				.send(catalog)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					catalog.name = 'Cat';
					// check if id is stripped on update
					catalog._id = 'malformed id string';
					request(app)
						.put('/api/catalog/' + res.body._id)
						.set('Accept', 'application/json')
						.send(catalog)
						.expect(200)
						.expect('Content-Type', /json/)
						.end(function (err, res) {
							if (err) {
								return done(err);
							}
							res.body.should.be.an.Object.and.have.property('name', catalog.name);
							done();
						});
				});
		});

	});

	describe('DELETE', function () {

		it('should return an error if attempting a delete without an id', function (done) {
			request(app)
				.delete('/api/catalog')
				.set('Accept', 'application/json')
				.expect(404)
				.end(done);
		});

		it('should respond with an not found error for a not existing catalog id', function (done) {
			request(app)
				.delete('/api/catalog/cccccccccccccccccccccccc')
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should delete a catalog and respond with 204', function (done) {
			request(app)
				.post('/api/catalog')
				.set('Accept', 'application/json')
				.send(catalog)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					request(app)
						.delete('/api/catalog/' + res.body._id)
						.set('Accept', 'application/json')
						.expect(204)
						.end(done);
				});
		});
	});
});
