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

	MainController.$inject = ['$mdDialog', '$cookies', '$mdMedia', '$rootScope', '$state', '$timeout', '$q', 'catalog', 'categories', 'cart', 'Order', 'Catalog'];

	function MainController($mdDialog, $cookies, $mdMedia, $rootScope, $state, $timeout, $q, catalog, categories, cart, Order, Catalog) {
		var vm = this;

		vm.previousState = null;
		vm.previousStateParams = null;

		$rootScope.$on('$stateChangeSuccess', function onStateChange(event,toState,toParams,fromState,fromParams) {
			console.info(fromState);
			console.info(fromParams);
			console.info(toState);
			console.info(toParams);
			vm.previousState = fromState;
			vm.previousStateParams = fromParams;
			console.log(vm.previousState);
			console.log(vm.previousStateParams);
		});

		vm.cancelCheckout = cancelCheckout;

		function cancelCheckout() {
			console.log(vm.previousState);
			console.log(vm.previousStateParams);
			$state.go(vm.previousState.name, vm.previousStateParams);
		}

		vm.catalog = catalog;
		vm.categories = categories;
		vm.cart = cart;

		vm.showCart = showCart;
		vm.updateCart = updateCart;
		vm.createOrder = createOrder;

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

		function updateCart(product) {
			console.log(vm.cart);
			if(vm.cart.items == null || vm.cart.items == undefined) {
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
					var oldOrderItem = null;
					for(var i in vm.cart.items) {
						console.log(vm.cart.items);
						console.log(product);
						if(vm.cart.items[i].product.id == product.id) {
							oldOrderItem = vm.cart.items[i];
							oldOrderItem.quantity += 1;
							oldOrderItem.price = oldOrderItem.quantity * product.price.salesPrice;
							orderItem = oldOrderItem;
							break;
						}
					}
					if(oldOrderItem == null) {
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
						if(oldOrderItem == null) {
							vm.cart.items.push(item);
						}
					});
				}else {
					orderItem = {
						'orderHeader': vm.cart,
						'product': product,
						'quantity': 1,
						'price': product.price.salesPrice,
						'status': product.status
					};
					Order.saveOrderItem(orderItem).$promise.then(function(item) {
						console.log(item);
						console.log(product);
						vm.cart.items.push(item);
					});
				}
			}
		}

		function createOrder() {
			$state.go('order.list.create');
		}

		function showCart(ev) {
			$mdDialog.show({
				controller: DialogController,
				controllerAs: 'dialog',
				templateUrl: 'app/main/cart.tmpl.html',
				targetEvent: ev,
				clickOutsideToClose:true,
				fullscreen: $mdMedia('md'),
				openFrom: {
					width: 30,
					height: 80
				},
				closeTo: {
					left: 1500
				}
			}).then(function() {
				console.log('Redirecting to checkout process');
			}, function() {
				console.log('You cancelled the dialog.');
			});
		}

		function DialogController($scope, $mdDialog) {
			$scope.cart = vm.cart;
			$scope.update = function(item) {
				console.log(item);
				console.log(vm.cart);
				if(item.quantity == 0) {
					$scope.removeItem(item);
				}else {
					for(var i in vm.cart.items) {
						if(vm.cart.items[i].id == item.id) {
							Catalog.getActiveProductPrice({controller: item.product.id}).$promise.then(function(result) {
								vm.cart.items[i].quantity = parseInt(vm.cart.items[i].quantity,10);
								vm.cart.items[i].price = vm.cart.items[i].quantity  * result.salesPrice;
								console.log(vm.cart.items[i]);
								Order.saveOrderItem(vm.cart.items[i]).$promise.then(function(item) {
									console.log(item);
								});
							});
							break;
						}
					}
				}
			};

			$scope.hide = function() {
				$mdDialog.hide();
			};

			$scope.cancel = function() {
				$mdDialog.cancel();
			};

			$scope.checkout = function() {
				$scope.hide();
				$state.go('order.list.create');
			};

			$scope.removeItem = function(item) {
				console.log(item);
				Order.removeOrderItem({controller: item.id}).$promise.then(function(result) {
					console.log(result);
					for(var i in vm.cart.items) {
						if(vm.cart.items[i].id == item.id) {
							vm.cart.items.splice(i, 1);
							break;
						}
					}
				});
			};
		}

	}

})();
