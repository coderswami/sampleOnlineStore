(function () {
	'use strict';

	/**
	 * Introduce the sampleOnlineStoreApp.catalog.main module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires sampleOnlineStoreApp.mainMenu
	 */

	angular
		.module('sampleOnlineStoreApp.catalog.main', [
			'ui.router',
			'sampleOnlineStoreApp.mainMenu'
		])
		.config(configCatalogMainRoutes);

	// inject configCatalogMainRoutes dependencies
	configCatalogMainRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the catalog.main state with the list template for the
	 * 'main' view paired with the CatalogMainController as 'main'.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 * @param {mainMenuProvider} mainMenuProvider - The service to pass navigation information to
	 */
	function configCatalogMainRoutes($stateProvider, mainMenuProvider) {
		// The main state configuration
		var mainState = {
			name: 'catalog.main',
			parent: 'catalog',
			url: '/',
			views: {
				'@catalog': {
					templateUrl: 'app/catalog/main/main.html',
					controller: 'CatalogMainController',
					controllerAs: 'main'
				}
			}
		};

		$stateProvider.state(mainState);

		mainMenuProvider.addMenuItem({
			name: 'Catalog',
			state: mainState.name
		});
	}

})();
