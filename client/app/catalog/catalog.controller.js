(function () {
	'use strict';

	// register the controller as CatalogController
	angular
		.module('sampleOnlineStoreApp.catalog')
		.controller('CatalogController', CatalogController);

	// add CatalogController dependencies to inject
	// CatalogController.$inject = [];

	/**
	 * CatalogController constructor. Main controller for the sampleOnlineStoreApp.catalog
	 * module.
	 *
	 * @param {$scope} $scope - The scope to listen for events
	 * @param {socket.io} socket - The socket to register updates
	 */
	function CatalogController() {
		// var vm = this;
	}

})();
