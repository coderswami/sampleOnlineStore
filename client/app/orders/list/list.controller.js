(function () {
	'use strict';

	/**
	 * Register the list controller as OrderListController
	 */
	angular
		.module('sampleOnlineStoreApp.order.list')
		.controller('OrderListController', OrderListController);

	// add OrderListController dependencies to inject
	OrderListController.$inject = ['$scope', 'socket', '$state', 'orders', 'ToggleComponent'];

	/**
	 * OrderListController constructor
	 *
	 * @param {Object} $scope - The current scope
	 * @param {Object} socket - The socket service to register to
	 * @param {$state} $state - The $state to activate routing states on
	 * @param {Array} orders - The list of orders resolved for this route
	 * @param {Service} ToggleComponent - The service for switching the detail view
	 */
	function OrderListController($scope, socket, $state, orders, ToggleComponent) {
		var vm = this;

		// the array of orders
		vm.orders = orders;
		// toggle detail view
		vm.toggleDetails = toggleDetails;

		// initialize the controller
		activate();

		/**
		 * Register socket updates and unsync on scope $destroy event
		 */
		function activate() {
			socket.syncUpdates('order', vm.orders);
			$scope.$on('$destroy', unsyncOrderUpdates);

			function unsyncOrderUpdates() {
				socket.unsyncUpdates('order');
			}
		}

		/**
		 * Toggle the detail view
		 */
		function toggleDetails() {
			ToggleComponent('order.detailView').toggle();
		}
	}

})();
