(function () {
	'use strict';

	/**
	 * Introduce the sampleOnlineStoreApp.catalog.list module
	 * and configure it.
	 * @requires ui.router
	 * @requires ngMaterial
	 * @requires sampleOnlineStoreApp.socket
	 * @requires sampleOnlineStoreApp.mainMenu,
	 * @requires sampleOnlineStoreApp.toggleComponent,
	 * @requires sampleOnlineStoreApp.catalog.list.detail
	 * @requires sampleOnlineStoreApp.catalog.list.edit
	 * @requires sampleOnlineStoreApp.catalog.list.items
	 */

	angular
		.module('sampleOnlineStoreApp.catalog.list', [
			'ngMaterial',
			'ui.router',
			'sampleOnlineStoreApp.mainMenu',
			'sampleOnlineStoreApp.toggleComponent',
			'sampleOnlineStoreApp.catalog.list.detail',
			'sampleOnlineStoreApp.catalog.list.edit',
			'sampleOnlineStoreApp.catalog.list.items'
		])
		.config(configCatalogListRoutes);

	// inject configCatalogListRoutes dependencies
	configCatalogListRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the catalog.list state with the list template fpr the
	 * 'main' view paired with the CatalogListController as 'list'.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configCatalogListRoutes($stateProvider, mainMenuProvider) {
		// The list state configuration
		var listState = {
			name: 'catalog.list',
			parent: 'catalog',
			url: '/:catalogId/category/:categoryId',
			resolve: {
				products: resolveProducts
			},
			views: {

				// target the unnamed view in the catalog state
				'@catalog': {
					templateUrl: 'app/catalog/list/list.html',
					controller: 'CatalogListController',
					controllerAs: 'list'
				},

				// target the content view in the catalog.list state
				'content@catalog.list': {
					templateUrl: 'app/catalog/list/items/items.html',
					controller: 'CatalogItemsController',
					controllerAs: 'items'
				}
			}
		};

		$stateProvider.state(listState);

		mainMenuProvider.addSubMenuItem('catalog.main', {
			name: 'Catalog List',
			state: listState.name
		});
	}

	resolveProducts.$inject = ['Catalog', '$stateParams'];

	function resolveProducts(Catalog, $stateParams) {
		return Catalog.getProductsByCategory({id: $stateParams.catalogId, id2: $stateParams.categoryId}).$promise.then(function(result) {
			console.log(result);
			return result;
		});
	}

})();
