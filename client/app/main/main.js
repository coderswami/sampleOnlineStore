(function () {
	'use strict';

	// register the route config on the application
	angular
		.module('sampleOnlineStoreApp.main', ['ui.router'])
		.config(configMainRoute);

	// inject configMainRoute dependencies
	configMainRoute.$inject = ['$stateProvider', 'mainMenuProvider'];

	// route config function configuring the passed $stateProvider
	function configMainRoute($stateProvider, mainMenuProvider) {
		var mainState = {
			name: 'main',
			url: '/',
			resolve: {
				catalog:  resolveActiveCatalog,
				categories: resolveCategories,
				cart: resolveCart
			},
			authenticate: false,
			templateUrl: 'app/main/main.html',
			controller: 'MainController',
			controllerAs: 'vm'
		};

		$stateProvider.state(mainState);

		mainMenuProvider.addMenuItem({
			name: 'Home',
			state: mainState.name,
			order: 1
		});
	}

	resolveActiveCatalog.$inject = ['Catalog'];

	function resolveActiveCatalog(Catalog) {
		return Catalog.getActiveCatalog({controller: 'IN'}).$promise.then(function(result) {
			console.log(result);
			return result;
		});
	}

	resolveCategories.$inject = ['Catalog', 'catalog'];

	function resolveCategories(Catalog, catalog) {
		return Catalog.getCategoriesByCatalog({id: catalog.id}).$promise.then(function(result) {
			console.log(result);
			return result;
		});
	}

	resolveCart.$inject = ['Order', '$cookies'];

	function resolveCart(Order, $cookies) {
		return Order.getCart({id2: $cookies.get('webstore-cart')}).$promise.then(function(result) {
			console.log(result);
			return result;
		});
	}

})();
