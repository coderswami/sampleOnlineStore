/* jshint unused:false */
'use strict';

var should = require('should');

var catalog = require('./catalog.model');
var catalogDefinition = catalog.definition;
var catalogSchema= catalog.schema;
var Catalog = catalog.model;

var catalogData = [
	{
		name: 'Dog',
		info: 'Hello, this is dog.',
		active: true
	}, {
		name: 'Bugs Bunny',
		info: 'Famous Bunny.',
		active: true
	}, {
		name: 'Nyan Cat',
		info: 'No comment.',
		active: false
	}
];

// Clear all catalogs
function cleanup(done) {
	Catalog.remove().exec().then(function () { done();	});
}

describe('Catalog Model', function () {

	// Clear catalogs before testing
	before(cleanup);

	// Clear catalogs after testing
	after(cleanup);

// Check test conditions for catalog tests
	it('should start with no catalogs', function (done) {
		Catalog.find({}, function (err, catalogs) {
			catalogs.should.have.length(0);
			done(err);
		});
	});

	describe('basic crud operations', function () {

		var catalogModel = new Catalog(catalogData[0]);

		// Clear catalogs after running this suite
		after(cleanup);

		it('should insert a new catalog', function (done) {
			catalogModel.save(function (err, catalog) {
				catalog.should.have.properties(catalogModel);
				done(err);
			});
		});

		it('should insert a list of catalogs', function (done) {
			Catalog.create(catalogData, function (err, catalog) {
				// slice err argument
				Array.prototype.slice.call(arguments, 1)
					.should.have.lengthOf(catalogData.length);
				done(err);
			});
		});


		it('should find a catalog by _id property', function (done) {
			Catalog.findById(catalogModel._id, function (err, catalog) {
				catalog.should.have.properties(catalogData[0]);
				done(err);
			});
		});

		it('should update a catalog', function (done) {
			catalogModel.name = 'foo';
			catalogModel.save(function (err) { done(err);	});
		});

		it('should remove a catalog', function (done) {
			catalogModel.remove(function (err) { done(err); });
		});
	}); // crud
});
