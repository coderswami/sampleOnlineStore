(function () {
	'use strict';

	// register the controller as OrderController
	angular
		.module('sampleOnlineStoreApp.order')
		.controller('OrderController', OrderController);

	// add OrderController dependencies to inject
	// OrderController.$inject = [];

	/**
	 * OrderController constructor. Main controller for the sampleOnlineStoreApp.order
	 * module.
	 *
	 * @param {$scope} $scope - The scope to listen for events
	 * @param {socket.io} socket - The socket to register updates
	 */
	function OrderController() {
		// var vm = this;
	}

})();
