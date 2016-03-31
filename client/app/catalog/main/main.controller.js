(function () {
	'use strict';

	/**
	 * Register the list controller as CatalogMainController
	 */

	angular
		.module('sampleOnlineStoreApp.catalog.main')
		.controller('CatalogMainController', CatalogMainController);

	// add CatalogMainController dependencies to inject
	CatalogMainController.$inject = ['$state'];

	/**
	 * CatalogMainController constructor
	 */
	function CatalogMainController($state) {
		var vm = this;
		// switch to the list state
		vm.showList = showList;

		/**
		 * Activate the catalog.list state
		 */
		function showList() {
			$state.go('catalog.list');
		}
	}

})();
