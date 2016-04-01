// (function () {
// 	'use strict';
//
// 	// register the service as MainMenu
// 	angular
// 		.module('sampleOnlineStoreApp.cart')
// 		.directive('cart', Cart);
//
// 	// add MainMenu dependencies to inject
// 	Cart.$inject = ['$rootScope', '$document'];
//
// 	/**
// 	 * MainMenu directive
// 	 */
// 	function Cart($rootScope, $mdSidenav, $document) {
// 		// directive definition members
// 		var directive = {
// 			replace:true,
// 			restrict: 'E',
// 			scope: {
// 				cartItems: '@cartItems'
// 			},
// 			template: function (element, attrs) {
// 				return '<md-button class="md-fab md-mini shopping-cart" aria-label="Cart" ng-click="cart.showCart()">' +
// 				'<md-icon md-svg-icon="action:ic_shopping_cart_24px"></md-icon>' +
// 				'</md-button>';
// 			},
// 			link:function(scope, el, attrs){
// 				scope.$watch(attrs.ngModel, function () {
// 					var model = scope.$eval(attrs.ngModel);
// 					//when value changes, update the selectBox text
// 					if (angular.isDefined(model) && angular.isDefined(model.name)) {
// 						el[0].firstChild.innerText = model.name;
// 					}
// 				});
// 			},
// 			controller: CartController,
// 			controllerAs: 'cart'
// 		};
//
// 		CartController.$inject = ['$scope', 'Order'];
//
// 		function CartController($scope, Order){
// 			var vm = this;
// 			console.log($scope.cart);
// 			vm.showCart = showCart;
//
// 			function generateCartCookie() {
// 				if($cookies.get('webstore-cart')==undefined || $cookies.get('webstore-cart')==null) {
// 					$cookies.put('webstore-cart', Date.now());
// 				}
// 			}
//
// 			function removeCartCookie() {
// 				if($cookies.get('webstore-cart')) {
// 					$cookies.remove('webstore-cart');
// 				}
// 			}
//
// 			function showCart(ev) {
// 				$mdDialog.show({
// 						controller: DialogController,
// 						templateUrl: 'app/main/cart.tmpl.html',
// 						targetEvent: ev,
// 						clickOutsideToClose:true
// 					})
// 					.then(function(answer) {
// 						console.log('You said the information was "' + answer + '".');
// 					}, function() {
// 						console.log('You cancelled the dialog.');
// 					});
// 			}
//
// 			function DialogController($scope, $mdDialog) {
// 				$scope.hide = function() {
// 					$mdDialog.hide();
// 				};
// 				$scope.cancel = function() {
// 					$mdDialog.cancel();
// 				};
// 				$scope.answer = function(answer) {
// 					$mdDialog.hide(answer);
// 				};
// 			}
// 		}
//
//
// 		return directive;
// 	}
//
//
// })();
