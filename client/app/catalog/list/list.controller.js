(function () {
	'use strict';

	/**
	 * Register the list controller as CatalogListController
	 */
	angular
		.module('sampleOnlineStoreApp.catalog.list')
		.controller('CatalogListController', CatalogListController);

	// add CatalogListController dependencies to inject
	CatalogListController.$inject = ['$scope', '$state', 'products', 'ToggleComponent'];

	/**
	 * CatalogListController constructor
	 *
	 * @param {Object} $scope - The current scope
	 * @param {Object} socket - The socket service to register to
	 * @param {$state} $state - The $state to activate routing states on
	 * @param {Array} catalogs - The list of catalogs resolved for this route
	 * @param {Service} ToggleComponent - The service for switching the detail view
	 */
	function CatalogListController($scope, $state, products, ToggleComponent) {
		var vm = this;

		// the array of catalogs
		vm.products = products;
		console.log(vm.products);

		vm.toggleDetails = toggleDetails;
		
		function toggleDetails() {
			ToggleComponent('catalog.detailView').toggle();
		}
	}

})();
