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

	MainController.$inject = ['$mdDialog', '$mdMedia', '$state', '$timeout', '$q', 'catalog', 'categories', 'cart', 'Order'];

	function MainController($mdDialog, $mdMedia, $state, $timeout, $q, catalog, categories, cart, Order) {
		var vm = this;

		vm.catalog = catalog;
		vm.categories = categories;
		vm.cart = cart;

		vm.showCart = showCart;
		vm.updateCart = updateCart;

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

		function generateCartCookie() {
			if($cookies.get('webstore-cart')==undefined || $cookies.get('webstore-cart')==null) {
				$cookies.put('webstore-cart', Date.now());
			}
		}

		function removeCartCookie() {
			if($cookies.get('webstore-cart')) {
				$cookies.remove('webstore-cart');
			}
		}

		function updateCart(product) {
			console.log(vm.cart);
			if(vm.cart == null || vm.cart == undefined) {
				generateCartCookie();
				vm.cart = {
					'type': 'CART',
					'status': 'IN_PROCESS',
					'orderTotal': 0.0,
					'cookie': $cookies.get('webstore-cart')
				};
				Order.createCart(vm.cart).$promise.then(function(order) {
					console.log(order);
					vm.cart = order;
					console.log(vm.cart);
					vm.cart.items = [];
					var orderItem = {
						'orderHeader': order,
						'product': product,
						'quantity': 1,
						'price': product.price.salesPrice,
						'status': product.status
					};
					Order.saveOrderItem(orderItem).$promise.then(function(item) {
						console.log(item);
						vm.cart.items.push(item);
					});
				});
			}else {
				console.log(vm.cart);
				var orderItem = null;
				if(vm.cart.items.length > 0) {
					for(var i in vm.cart.items) {
						console.log(vm.cart.items);
						console.log(product);
						if(vm.cart.items[i].product.id == product.id) {
							orderItem = vm.cart.items[i];
							orderItem.quantity += 1;
							orderItem.price = orderItem.quantity * product.price.salesPrice;
							break;
						}
					}
					if(orderItem == null) {
						orderItem = {
							'orderHeader': vm.cart,
							'product': product,
							'quantity': 1,
							'price': product.price.salesPrice,
							'status': product.status
						};
					}
				}else {
					orderItem = {
						'orderHeader': vm.cart,
						'product': product,
						'quantity': 1,
						'price': product.price.salesPrice,
						'status': product.status
					};
				}
				Order.saveOrderItem(orderItem).$promise.then(function(item) {
					console.log(item);
					console.log(product);
					vm.cart.items.push(item);
				});
			}
		}

		function showCart(ev) {
			$mdDialog.show({
				controller: DialogController,
				controllerAs: 'dialog',
				templateUrl: 'app/main/cart.tmpl.html',
				targetEvent: ev,
				clickOutsideToClose:true,
				fullscreen: $mdMedia('md')
			}).then(function(answer) {
				console.log('You said the information was "' + answer + '".');
			}, function() {
				console.log('You cancelled the dialog.');
			});
		}

		function DialogController($scope, $mdDialog) {
			$scope.cart = vm.cart;
			$scope.hide = function() {
				$mdDialog.hide();
			};
			$scope.cancel = function() {
				$mdDialog.cancel();
			};
			$scope.answer = function(answer) {
				$mdDialog.hide(answer);
			};
		}

	}

})();
