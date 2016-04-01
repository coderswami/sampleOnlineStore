(function () {
	'use strict';

	/**
	 * Register the list controller as CatalogItemsController
	 */

	angular
		.module('sampleOnlineStoreApp.catalog.list.items')
		.controller('CatalogItemsController', CatalogItemsController);

	// add CatalogItemsController dependencies to inject
	CatalogItemsController.$inject = ['$state'];

	/**
	 * CatalogItemsController constructor
	 */
	function CatalogItemsController($state) {
		var vm = this;

		// the selected item id
		var productId = null;
		vm.selection = 1;
		vm.primaryClass = "md-primary";
		vm.selectedClass = "md-accent";
		// check if this item is selected
		vm.isSelected = isSelected;
		// switch to the detail state
		vm.showInDetails = showInDetails;

		/**
		 * Check if the passed item is the current selected item
		 *
		 * @param {Object} catalog - The object to check for selection
		 */
		function isSelected(product) {
			return productId === product.id;
		}

		/**
		 * Open the detail state with the selected item
		 *
		 * @param {Object} catalog - The catalog to edit
		 */
		function showInDetails(product) {
			productId = product.id;
			$state.go('catalog.list.detail', {'productId': productId});
		}

		 vm.toggle = function(selection){
		 	console.log("toggle called");
            	vm.selection = selection;
            };
	}

})();
