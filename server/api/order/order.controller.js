/**
 * Module for the controller definition of the order api.
 * The OrderController is handling /api/orders requests.
 * @module {order:controller~OrderController} order:controller
 * @requires {@link ParamController}
 */
'use strict';

var OrderAPI = require('../../datasources/orderDS');
var async = require('async');

module.exports = OrderController;

//var ParamController = require('../../lib/controllers/param.controller');

/**
 * The Order model instance
 * @type {order:model~Order}
 */
//var Order = require('./order.model').model;

/**
 * OrderController constructor
 * @classdesc Controller that handles /api/orders route requests
 * for the order api.
 * Uses the 'orderId' parameter and the 'orderParam' request property
 * to operate with the [main order API Model]{@link order:model~Order} model.
 * @constructor
 * @inherits ParamController
 * @see order:model~Order
 */
function OrderController(router) {
	//ParamController.call(this, Order,  router);

	// modify select only properties
	// this.select = ['-__v'];

	// omit properties on update
	// this.omit = ['hashedPassword'];

	// property to return (maybe a virtual getter of the model)
	// this.defaultReturn = 'profile';
}

// define properties for the OrderController here
OrderController.prototype = {

	/**
	 * Set our own constructor property for instanceof checks
	 * @private
	 */
	constructor: OrderController,

	index : function(req,res){
		console.log('In index method');
	},

	getCartOrder : function(req,res){
		var cookie = req.params.cookie;
		async.waterfall([
			function(callback){
				OrderAPI.getCartOrder(cookie,null,function(err, response, body){
					console.log(body);
					callback(null, body);
				});
			},
			function(order, callback){
				if(order != undefined || order != null) {
					OrderAPI.getOrderItemsByOrder(order.id, null, function (err, response, body) {
						console.log(body);
						order.items = body;
						callback(null, order);
					});
				}else {
					callback(null, order);
				}
			}
		], function(err, results){
			if (err) console.error(err.message);
			console.log(results);
			res.json(results);
		});
	},

	createOrder: function(req,res){
		OrderAPI.createOrder(req.body,null,function(err, response, body){
			console.log(body);
			res.json(body);
		});
	},

	saveOrderItem: function(req,res){
		OrderAPI.saveOrderItem(req.body,null,function(err, response, body){
			console.log(body);
			res.json(body);
		});
	},

	createPayment: function(req,res){
		var orderId = req.params.id;
		OrderAPI.createPayment(orderId,req.body,null,function(err, response, body){
			console.log(body);
			res.json(body);
		});
	},

	createShipment: function(req,res){
		var orderId = req.params.id;
		OrderAPI.createShipment(orderId,req.body,null,function(err, response, body){
			console.log(body);
			res.json(body);
		});
	}

};

// inherit from ParamController
//OrderController.prototype = Object.create(ParamController.prototype);

