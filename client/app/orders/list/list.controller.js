(function () {
	'use strict';

	/**
	 * Register the list controller as OrderListController
	 */
	angular
		.module('sampleOnlineStoreApp.order.list')
		.controller('OrderListController', OrderListController);

	// add OrderListController dependencies to inject
	OrderListController.$inject = ['$scope', '$state', 'ToggleComponent'];

	/**
	 * OrderListController constructor
	 *
	 * @param {Object} $scope - The current scope
	 * @param {Object} socket - The socket service to register to
	 * @param {$state} $state - The $state to activate routing states on
	 * @param {Array} orders - The list of orders resolved for this route
	 * @param {Service} ToggleComponent - The service for switching the detail view
	 */
	function OrderListController($scope, $state, ToggleComponent) {
		var vm = this;

		// the array of orders
		// vm.orders = orders;
		// toggle detail view
		vm.toggleDetails = toggleDetails;

		/**
		 * Toggle the detail view
		 */
		function toggleDetails() {
			ToggleComponent('order.detailView').toggle();
		}
	}

})();
