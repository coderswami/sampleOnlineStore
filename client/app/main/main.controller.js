/**
 * @ngdoc controller
 * @name sampleOnlineStoreApp.main.controller:MainController
 * @description
 * Controls mainly nothing currently
 */

(function () {
	'use strict';

	// register the controller as MainController
	angular
		.module('sampleOnlineStoreApp.main')
		.controller('MainController', MainController);

	/**
	 * @ngdoc function
	 * @name sampleOnlineStoreApp.main.provider:MainController
	 * @description
	 * Provider of the {@link sampleOnlineStoreApp.main.controller:MainController MainController}
	 *
	 * @param {Service} $scope The scope service to use
	 * @param {Service} $http The http service to use
	 */

	MainController.$inject = ['$state', '$timeout', '$q', 'catalog', 'categories'];

	function MainController($state, $timeout, $q, catalog, categories) {
		var vm = this;

		vm.catalog = catalog;
		vm.categories = categories;

		vm.listProducts = listProducts;

		vm.states = loadAll();
		vm.selectedItem = null;
		vm.searchText = null;
		vm.querySearch = querySearch;
		// ******************************
		// Internal methods
		// ******************************
		/**
		 * Search for states... use $timeout to simulate
		 * remote dataservice call.
		 */
		function querySearch (query) {
			var results = query ? vm.states.filter( createFilterFor(query) ) : vm.states;
			var deferred = $q.defer();
			$timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
			return deferred.promise;
		}
		/**
		 * Build `states` list of key/value pairs
		 */
		function loadAll() {
			var allStates = 'Jeans, Shirts, Watches, Deodrants';
			return allStates.split(/, +/g).map( function (state) {
				return {
					value: state.toLowerCase(),
					display: state
				};
			});
		}
		/**
		 * Create filter function for a query string
		 */
		function createFilterFor(query) {
			var lowercaseQuery = angular.lowercase(query);
			return function filterFn(state) {
				return (state.value.indexOf(lowercaseQuery) === 0);
			};
		}

		function listProducts(category) {
			$state.go('catalog.list', {'catalogId': vm.catalog.id, 'categoryId': category.id});
		}
	}

})();
