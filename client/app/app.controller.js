/**
 * @ngdoc controller
 * @name sampleOnlineStoreApp.controller:AppController
 * @description
 * This is the application wide controller of the sampleOnlineStoreApp application
 */

(function () {
	'use strict';

	// register the controller as AppController
	angular
		.module('sampleOnlineStoreApp')
		.controller('AppController', AppController);

	/**
	 * @ngdoc function
	 * @name sampleOnlineStoreApp.provider:AppController
	 * @description
	 * Provider of the {@link sampleOnlineStoreApp.controller:AppController AppController}
	 *
	 * @param {Auth} Auth - The authentication service used for logging out
	 * @param {$location} $mdSidenav - The sidenav service used to communicate with the sidenav components
	 */

	AppController.$inject = ['$state', '$mdSidenav'];

	function AppController($state, $mdSidenav) {
		var vm = this;

		vm.goHome = goHome;

		function goHome() {
			$state.go('main', {reload: true});
		}

		vm.sidenavId = 'mainMenu';

		vm.closeMainMenu = closeMainMenu;
		vm.openMainMenu = openMainMenu;

		function closeMainMenu() {
			return $mdSidenav(vm.sidenavId).close();
		}

		function openMainMenu() {
			return $mdSidenav(vm.sidenavId).open();
		}
	}
})();
