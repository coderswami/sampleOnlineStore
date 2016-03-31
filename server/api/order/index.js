/**
 * Module for handling order requests.
 * Initializing the [OrderController]{@link order:controller~OrderController}
 * and configuring the express router to handle the order api
 * for /api/orders routes. All Routes are registered after the
 * [request parameters]{@link order:parameters} have been
 * added to the router instance.
 * Exports the configured express router for the order api routes
 * @module {express.Router} order
 * @requires {@link module:middleware}
 * @requires {@link order:controller~OrderController}
 */
'use strict';

var router = require('express').Router();
var middleware = require('../../lib/middleware');
var OrderController = require('./order.controller');
// Export the configured express router for the order api routes
module.exports = router;

/**
 * The api controller
 * @type {order:controller~OrderController}
 */
var controller = new OrderController(router);

// register order route parameters, uncomment if needed
// var registerOrderParameters = require('./order.params');
// registerOrderParameters(router);

// register order routes
router.route('/')
	.get(controller.index)
	.post(controller.createOrder);

router.route('/type/cart/:cookie')
	.get(controller.getCartOrder);

router.route('/item')
	.put(controller.saveOrderItem);

router.route('/:id/payment')
	.post(controller.createPayment);

router.route('/:id/shipment')
	.post(controller.createShipment);
