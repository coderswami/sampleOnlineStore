(function () {
	'use strict';

	/**
	 * Introduce the sampleOnlineStoreApp.order.list module
	 * and configure it.
	 * @requires ui.router
	 * @requires ngMaterial
	 * @requires sampleOnlineStoreApp.socket
	 * @requires sampleOnlineStoreApp.mainMenu,
	 * @requires sampleOnlineStoreApp.toggleComponent,
	 * @requires sampleOnlineStoreApp.order.list.detail
	 * @requires sampleOnlineStoreApp.order.list.edit
	 * @requires sampleOnlineStoreApp.order.list.items
	 */

	angular
		.module('sampleOnlineStoreApp.order.list', [
			'ngMaterial',
			'ui.router',
			'sampleOnlineStoreApp.mainMenu',
			'sampleOnlineStoreApp.toggleComponent',
			'sampleOnlineStoreApp.order.list.detail',
			'sampleOnlineStoreApp.order.list.edit',
			'sampleOnlineStoreApp.order.list.items'
		])
		.config(configOrderListRoutes);

	// inject configOrderListRoutes dependencies
	configOrderListRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the order.list state with the list template fpr the
	 * 'main' view paired with the OrderListController as 'list'.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configOrderListRoutes($stateProvider, mainMenuProvider) {
		// The list state configuration
		var listState = {
			name: 'order.list',
			parent: 'order',
			url: '/list',
			// resolve: {
			// 	orders:  resolveOrders
			// },
			views: {

				// target the unnamed view in the order state
				'@order': {
					templateUrl: 'app/orders/list/list.html',
					controller: 'OrderListController',
					controllerAs: 'list'
				},

				// target the content view in the order.list state
				'content@order.list': {
					templateUrl: 'app/orders/list/items/items.html',
					controller: 'OrderItemsController',
					controllerAs: 'items'
				}
			}
		};

		$stateProvider.state(listState);

		// mainMenuProvider.addSubMenuItem('order.main', {
		// 	name: 'Orders List',
		// 	state: listState.name
		// });
	}

	// inject resolveOrders dependencies
	resolveOrders.$inject = ['Order'];

	/**
	 * Resolve dependencies for the order.list state
	 *
	 * @params {Order} Order - The service to query orders
	 * @returns {Promise} A promise that, when fullfilled, returns an array of orders
	 */
	function resolveOrders(Order) {
		return Order.query().$promise;
	}

})();
