(function () {
	'use strict';

	/**
	 * Register the edit controller as CatalogDetailController
 	 */

	angular
		.module('sampleOnlineStoreApp.catalog.list.detail')
		.controller('CatalogDetailController', CatalogDetailController);

	// add CatalogDetailController dependencies to inject
	CatalogDetailController.$inject = ['$state', 'product', '$cookies', 'Order', '$mdDialog'];

	/**
	 * CatalogDetailController constructor
	 */
	function CatalogDetailController($state, product, $cookies, Order, $mdDialog) {
		var vm = this;

		// the current catalog to display
		vm.product = product;

		vm.goBack = goBack;

		function goBack() {
			$state.go('^');
		}
	}
})();
