(function () {
	'use strict';

	/**
	 * Register the list controller as OrderItemsController
	 */

	angular
		.module('sampleOnlineStoreApp.order.list.items')
		.controller('OrderItemsController', OrderItemsController);

	// add OrderItemsController dependencies to inject
	OrderItemsController.$inject = ['$state'];

	/**
	 * OrderItemsController constructor
	 */
	function OrderItemsController($state) {
		var vm = this;

		// the selected item id
		var curOrderId = null;

		// check if this item is selected
		vm.isSelected = isSelected;
		// switch to the detail state
		vm.showInDetails = showInDetails;

		/**
		 * Check if the passed item is the current selected item
		 *
		 * @param {Object} order - The object to check for selection
		 */
		function isSelected(order) {
			return curOrderId === order._id;
		}

		/**
		 * Open the detail state with the selected item
		 *
		 * @param {Object} order - The order to edit
		 */
		function showInDetails(order) {
			curOrderId = order._id;
			$state.go('order.list.detail', {'id': curOrderId});
		}
	}

})();
