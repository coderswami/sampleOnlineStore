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
		// switch to the parent state
		vm.goHome = goHome;

		function goHome() {
			$state.go('main', {'reload': true});
		}
	}
})();
