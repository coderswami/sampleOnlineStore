(function () {
	'use strict';

	/**
	 * Introduce the sampleOnlineStoreApp.order.list.edit module
	 * and configure it.
	 *
	 * @requires 'ui.router',
	 * @requires 'ngMaterial',
	 * @requires sampleOnlineStoreApp.mongooseError
	 * @requires sampleOnlineStoreApp.order.service
	 */

	angular
		.module('sampleOnlineStoreApp.order.list.edit', [
			'ui.router',
			'ngMaterial',
			'sampleOnlineStoreApp.mongooseError',
			'sampleOnlineStoreApp.order.service'
		])
		.config(configureOrderListEdit);

	// inject configOrderListEdit dependencies
	configureOrderListEdit.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the order.list.edit state with the edit template
	 * paired with the OrderEditController as 'edit' for the
	 * 'detail@order.list' view.
	 * 'order' is resolved as the order with the id found in
	 * the state parameters.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configureOrderListEdit($stateProvider) {
		// The edit state configuration.
		var editState = {
			name: 'order.list.edit',
			parent: 'order.list',
			url: '/edit/:id',
			onEnter: onEnterOrderListEdit,
			views: {
				'detail@order.list': {
					templateUrl: 'app/orders/list/edit/edit.html',
					controller: 'OrderEditController',
					controllerAs: 'edit',
					resolve: {order: resolveOrderFromArray}
				}
			}
		};

		$stateProvider.state(editState);
	}

	// inject onOrderListEditEnter dependencies
	onEnterOrderListEdit.$inject = ['$timeout', 'ToggleComponent'];

	/**
	 * Executed when entering the order.list.detail state. Open the component
	 * registered with the component id 'order.detailView'.
	 *
	 * @params {$timeout} $timeout - The $timeout service to wait for view initialization
	 * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
	 */
	function onEnterOrderListEdit($timeout, ToggleComponent) {
		$timeout(showDetails, 0, false);

		function showDetails() {
			ToggleComponent('order.detailView').open();
		}
	}

	// inject resolveOrderDetailRoute dependencies
	resolveOrderFromArray.$inject = ['orders', '$stateParams', '_'];

	/**
	 * Resolve dependencies for the order.list.edit state. Get the order
	 * from the injected Array of orders by using the '_id' property.
	 *
	 * @params {Array} orders - The array of orders
	 * @params {Object} $stateParams - The $stateParams to read the order id from
	 * @params {Object} _ - The lodash service to find the requested order
	 * @returns {Object|null} The order whose value of the _id property equals $stateParams._id
	 */
	function resolveOrderFromArray(orders, $stateParams, _) {
		//	return Order.get({id: $stateParams.id}).$promise;
		return _.find(orders, {'_id': $stateParams.id});
	}

})();
