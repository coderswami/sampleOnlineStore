(function () {
	'use strict';

	/**
	 * Introduce the sampleOnlineStoreApp.order.list.detail submodule
	 * and configure it.
	 *
   * @requires ui.router
	 * @requires angularMoment
	 */

	angular
		.module('sampleOnlineStoreApp.order.list.detail', [
			'ui.router',
			'angularMoment'
		])
		.config(configureOrderListDetail);

	// inject configOrderRoutes dependencies
	configureOrderListDetail.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the 'order.detail' state with the detail template
	 * paired with the OrderDetailController as 'detail' for the
	 * 'sidenav' sub view.
	 * 'order' is resolved as the order with the id found in
	 * the state parameters.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configureOrderListDetail($stateProvider) {
		// The detail state configuration
		var detailState = {
			name: 'order.list.detail',
			parent: 'order.list',
			url: '/:orderId/detail',
			//onEnter: onEnterOrderListDetail,
			views: {
				'content@order.list': {
					templateUrl: 'app/orders/list/detail/detail.html',
					controller: 'OrderDetailController',
					controllerAs: 'detail',
					resolve: {
						order: resolveOrder
					}
				}
			}
		};

		$stateProvider.state(detailState);
	}

	// inject onOrderListDetailEnter dependencies
	// onEnterOrderListDetail.$inject = ['$timeout', 'ToggleComponent'];
    //
	// /**
	//  * Executed when entering the order.list.detail state. Open the component
	//  * registered with the component id 'order.detailView'.
	//  *
 	//  * @params {$timeout} $timeout - The $timeout service to wait for view initialization
	//  * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
	//  */
	// function onEnterOrderListDetail($timeout, ToggleComponent) {
	// 	$timeout(showDetails, 0, false);
    //
	// 	function showDetails() {
	// 		ToggleComponent('order.detailView').open();
	// 	}
	// }

	// inject resolveOrderFromArray dependencies
	resolveOrder.$inject = ['Order', '$stateParams'];

	/**
	 * Resolve dependencies for the order.detail state
	 *
	 * @params {Array} orders - The array of orders
	 * @params {Object} $stateParams - The $stateParams to read the order id from
	 * @returns {Object|null} The order whose value of the _id property equals $stateParams._id
	 */
	function resolveOrder(Order, $stateParams) {
		return Order.get({'id': $stateParams.orderId}).$promise.then(function(results) {
			console.log(results);
			return results;
		});
	}

})();
