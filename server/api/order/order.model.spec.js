/* jshint unused:false */
'use strict';

var should = require('should');

var order = require('./order.model');
var orderDefinition = order.definition;
var orderSchema= order.schema;
var Order = order.model;

var orderData = [
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

// Clear all orders
function cleanup(done) {
	Order.remove().exec().then(function () { done();	});
}

describe('Order Model', function () {

	// Clear orders before testing
	before(cleanup);

	// Clear orders after testing
	after(cleanup);

// Check test conditions for order tests
	it('should start with no orders', function (done) {
		Order.find({}, function (err, orders) {
			orders.should.have.length(0);
			done(err);
		});
	});

	describe('basic crud operations', function () {

		var orderModel = new Order(orderData[0]);

		// Clear orders after running this suite
		after(cleanup);

		it('should insert a new order', function (done) {
			orderModel.save(function (err, order) {
				order.should.have.properties(orderModel);
				done(err);
			});
		});

		it('should insert a list of orders', function (done) {
			Order.create(orderData, function (err, order) {
				// slice err argument
				Array.prototype.slice.call(arguments, 1)
					.should.have.lengthOf(orderData.length);
				done(err);
			});
		});


		it('should find a order by _id property', function (done) {
			Order.findById(orderModel._id, function (err, order) {
				order.should.have.properties(orderData[0]);
				done(err);
			});
		});

		it('should update a order', function (done) {
			orderModel.name = 'foo';
			orderModel.save(function (err) { done(err);	});
		});

		it('should remove a order', function (done) {
			orderModel.remove(function (err) { done(err); });
		});
	}); // crud
});
