(function () {
	'use strict';

	/**
	 * Register the list controller as OrderMainController
	 */

	angular
		.module('sampleOnlineStoreApp.order.main')
		.controller('OrderMainController', OrderMainController);

	// add OrderMainController dependencies to inject
	OrderMainController.$inject = ['$state'];

	/**
	 * OrderMainController constructor
	 */
	function OrderMainController($state) {
		var vm = this;
		// switch to the list state
		vm.showList = showList;

		/**
		 * Activate the order.list state
		 */
		function showList() {
			$state.go('order.list');
		}
	}

})();
