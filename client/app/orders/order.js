(function () {
	'use strict';

	/**
	 * Introduce the sampleOnlineStoreApp.order module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires ngResource
	 * @requires sampleOnlineStoreApp.order.main
	 * @requires sampleOnlineStoreApp.order.list
	 * @requires sampleOnlineStoreApp.order.create
	 */
	angular
		.module('sampleOnlineStoreApp.order', [
			'ngResource',
			'ui.router',
			'sampleOnlineStoreApp.order.main',
			'sampleOnlineStoreApp.order.list',
			'sampleOnlineStoreApp.order.create'
		])
		.config(configOrderRoutes);

	// inject configOrderRoutes dependencies
	configOrderRoutes.$inject = ['$urlRouterProvider', '$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the abstract order state with the order template
	 * paired with the OrderController as 'index'.
	 * The injectable 'orders' is resolved as a list of all orders
	 * and can be injected in all sub controllers.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configOrderRoutes($urlRouterProvider, $stateProvider) {
		// The order state configuration
		var orderState = {
			name: 'order',
			parent: 'main',
			url: 'orders',
			abstract: true,
			views: {
				'@main': {
					templateUrl: 'app/orders/order.html',
					controller: 'OrderController',
					controllerAs: 'index'
				}
			}
		};

		$urlRouterProvider.when('orders', '/orders/');
		$stateProvider.state(orderState);
	}

})();
