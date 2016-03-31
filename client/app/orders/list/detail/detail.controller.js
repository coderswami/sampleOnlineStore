(function () {
	'use strict';

	/**
	 * Register the edit controller as OrderDetailController
 	 */

	angular
		.module('sampleOnlineStoreApp.order.list.detail')
		.controller('OrderDetailController', OrderDetailController);

	// add OrderDetailController dependencies to inject
	OrderDetailController.$inject = ['$state', 'order'];

	/**
	 * OrderDetailController constructor
	 */
	function OrderDetailController($state, order) {
		var vm = this;

		// the current order to display
		vm.order = order;
		// switch to the edit state
		vm.edit = edit;
		// switch to the parent state
		vm.goBack = goBack

		/**
		 * Open the edit state with the current order
		 *
		 */
		function edit() {
			$state.go('^.edit', {'id': vm.order._id});
		}

		/**
		 * Return to the parent state
		 *
		 */
		function goBack() {
			$state.go('^');
		}
	}
})();
