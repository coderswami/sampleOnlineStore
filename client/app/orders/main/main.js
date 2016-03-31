(function () {
	'use strict';

	/**
	 * Introduce the sampleOnlineStoreApp.order.main module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires sampleOnlineStoreApp.mainMenu
	 */

	angular
		.module('sampleOnlineStoreApp.order.main', [
			'ui.router',
			'sampleOnlineStoreApp.mainMenu'
		])
		.config(configOrderMainRoutes);

	// inject configOrderMainRoutes dependencies
	configOrderMainRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the order.main state with the list template for the
	 * 'main' view paired with the OrderMainController as 'main'.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 * @param {mainMenuProvider} mainMenuProvider - The service to pass navigation information to
	 */
	function configOrderMainRoutes($stateProvider, mainMenuProvider) {
		// The main state configuration
		var mainState = {
			name: 'order.main',
			parent: 'order',
			url: '/',
			views: {
				'@order': {
					templateUrl: 'app/orders/main/main.html',
					controller: 'OrderMainController',
					controllerAs: 'main'
				}
			}
		};

		$stateProvider.state(mainState);

		mainMenuProvider.addMenuItem({
			name: 'Orders',
			state: mainState.name
		});
	}

})();
