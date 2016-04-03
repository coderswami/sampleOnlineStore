(function () {
	'use strict';

	/**
	 * Introduce the sampleOnlineStoreApp.catalog module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires ngResource
	 * @requires sampleOnlineStoreApp.catalog.main
	 * @requires sampleOnlineStoreApp.catalog.list
	 * @requires sampleOnlineStoreApp.catalog.create
	 */
	angular
		.module('sampleOnlineStoreApp.catalog', [
			'ngResource',
			'ui.router',
			'sampleOnlineStoreApp.catalog.main',
			'sampleOnlineStoreApp.catalog.list',
			'sampleOnlineStoreApp.catalog.create'
		])
		.config(configCatalogRoutes);

	// inject configCatalogRoutes dependencies
	configCatalogRoutes.$inject = ['$urlRouterProvider', '$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the abstract catalog state with the catalog template
	 * paired with the CatalogController as 'index'.
	 * The injectable 'catalogs' is resolved as a list of all catalogs
	 * and can be injected in all sub controllers.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configCatalogRoutes($urlRouterProvider, $stateProvider) {
		// The catalog state configuration
		var catalogState = {
			name: 'catalog',
			parent: 'main',
			url: 'catalog',
			abstract: true,
			views: {
				'@main': {
					templateUrl: 'app/catalog/catalog.html',
					controller: 'CatalogController',
					controllerAs: 'index'
				}
			}
		};

		$urlRouterProvider.when('catalog', 'catalog/');
		$stateProvider.state(catalogState);
	}

})();
