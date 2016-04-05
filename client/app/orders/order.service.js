(function () {
	'use strict';

	/**
	 * Introduce the sampleOnlineStoreApp.order.service module.
	 * Register the order resource as Order, register the
	 * service as OrderService.
	 *
	 * @requires {sampleOnlineStoreApp.resource}
	 */
	angular
		.module('sampleOnlineStoreApp.order.service', ['sampleOnlineStoreApp.resource'])
		.factory('Order', Order)
		.service('OrderService', OrderService);

	// add Order dependencies to inject
	Order.$inject = ['Resource'];

	/**
	 * Order resource constructor
	 */
	function Order($resource) {
		// factory members
		var apiURL = '/api/orders';

		var methods = {
			getCart: {
				method: 'GET',
				params: {'id': 'type', 'controller': 'cart'}
			},
			createCart: {
				method: 'POST'
			},
			saveOrderItem: {
				method: 'PUT',
				params: {'id': 'item'}
			},
			removeOrderItem: {
				method: 'DELETE',
				params: {'id': 'item'}
			},
			createPayment: {
				method: 'POST',
				params: {'controller': 'payment'}
			},
			createShipment: {
				method: 'POST',
				params: {'controller': 'shipment'}
			}
		};
		// public API
		return $resource(apiURL + '/:id/:controller/:id2/:controller2', {}, methods);
	}

	// add OrderService dependencies to inject
	OrderService.$inject = ['Order'];

	/**
	 * OrderService constructor
	 * AngularJS will instantiate a singleton by calling "new" on this function
	 *
	 * @param {$resource} Order The resource provided by sampleOnlineStoreApp.order.resource
	 * @returns {Object} The service definition for the OrderService service
	 */
	function OrderService(Order) {

		return {
			create: create,
			update: update,
			remove: remove
		};

		/**
		 * Save a new order
		 *
		 * @param  {Object}   order - orderData
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function create(order, callback) {
			var cb = callback || angular.noop;

			return Order.create(order,
				function (order) {
					return cb(order);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}

		/**
		 * Remove a order
		 *
		 * @param  {Object}   order - orderData
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function remove(order, callback) {
			var cb = callback || angular.noop;

			return Order.remove({id: order._id},
				function (order) {
					return cb(order);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}

		/**
		 * Create a new order
		 *
		 * @param  {Object}   order - orderData
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function update(order, callback) {
			var cb = callback || angular.noop;

			return Order.update(order,
				function (order) {
					return cb(order);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}
	};
})();
