(function () {
	'use strict';

	/**
	 * Register the edit controller as CatalogDetailController
 	 */

	angular
		.module('sampleOnlineStoreApp.catalog.list.detail')
		.controller('CatalogDetailController', CatalogDetailController);

	// add CatalogDetailController dependencies to inject
	CatalogDetailController.$inject = ['$state', 'product'];

	/**
	 * CatalogDetailController constructor
	 */
	function CatalogDetailController($state, product) {
		var vm = this;

		// the current catalog to display
		vm.product = product;
		// switch to the edit state
		//vm.edit = edit;
		// switch to the parent state
		vm.goBack = goBack

		/**
		 * Open the edit state with the current catalog
		 *
		 */
		// function edit() {
		// 	$state.go('^.edit', {'id': vm.product.id});
		// }

		/**
		 * Return to the parent state
		 *
		 */
		function goBack() {
			$state.go('^');
		}
	}
})();
