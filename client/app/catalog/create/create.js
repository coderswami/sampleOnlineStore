(function () {
	'use strict';

	/**
	 * Introduce the sampleOnlineStoreApp.catalog.create module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires ngMessages
	 * @requires ngMaterial
	 * @requires {sampleOnlineStoreApp.mongooseError}
	 * @requires {sampleOnlineStoreApp.remoteUnique}
	 * @requires {sampleOnlineStoreApp.catalog.service}
	 */

	angular
		.module('sampleOnlineStoreApp.catalog.create', [
			'ui.router',
			'ngMessages',
			'ngMaterial',
			'sampleOnlineStoreApp.mongooseError',
			'sampleOnlineStoreApp.remoteUnique',
			'sampleOnlineStoreApp.catalog.service'
		])
		.config(configureCatalogCreateRoutes);

	// inject configCatalog.CreateRoutes dependencies
	configureCatalogCreateRoutes.$inject = ['$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the 'catalog.list.create' state. The onEnterCatalogListCreateView
	 * function will be called when entering the state and open a modal dialog
	 * with the app/catalog/create/create.html template loaded.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configureCatalogCreateRoutes($stateProvider) {
		var  createListState = {
			name: 'catalog.list.create',
			parent: 'catalog.list',
			url: '/create',
			onEnter: onEnterCatalogListCreateView
		};

		$stateProvider.state(createListState);
	}

	/**
	 * Function that executes when entering the catalog.list.create state.
	 * Open the create dialog
	 */

	onEnterCatalogListCreateView.$inject = ['$rootScope', '$state', '$mdDialog'];

	function onEnterCatalogListCreateView($rootScope, $state, $mdDialog) {
		var unregisterListener = $rootScope.$on('$stateChangeStart', onStateChange);

		$mdDialog.show({
			controller: 'CatalogCreateController',
			controllerAs: 'create',
			templateUrl: 'app/catalog/create/create.html',
			clickOutsideToClose: false
		}).then(transitionTo, transitionTo);

		/**
		 * Function executed when resolving or rejecting the
		 * dialog promise.
		 *
		 * @param {*} answer - The result of the dialog callback
		 * @returns {promise}
		 */
		function transitionTo(answer) {
			return $state.transitionTo('catalog.list');
		}

		/**
		 * Function executed when changing the state.
		 * Closes the create dialog
		 */
		function onStateChange() {
			unregisterListener();
			$mdDialog.hide();
		}
	}

})();
