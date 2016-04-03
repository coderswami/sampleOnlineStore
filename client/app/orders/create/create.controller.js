/**
 * @ngdoc controller
 * @name sampleOnlineStoreApp.order.create.controller:OrderCreateController
 * @description
 * Controller of the order create page of the admin section
 */

(function () {
	'use strict';

	/**
	 * Register the create controller as OrderCreateController
	 */

	angular
		.module('sampleOnlineStoreApp.order.create')
		.controller('OrderCreateController', OrderCreateController);

	/**
	 * @ngdoc function
	 * @name sampleOnlineStoreApp.order.create.provider:OrderCreateController
	 * @description
	 * Provider of the {@link sampleOnlineStoreApp.order.create.controller:OrderCreateController OrderCreateController}
	 *
	 * @param {Service} Auth The Auth service to use
	 * @param {Service} $mdDialog The mdDialog service to use
	 * @param {Service} Order The Order resource
	 * @param {Service} OrderService The Order service to use
	 * @param {Service} Toast The Toast service to use
	 * @returns {Service} {@link sampleOnlineStoreApp.order.create.controller:OrderCreateController OrderCreateController}
	 */

	OrderCreateController.$inject = ['Order', 'User', 'Toast', 'country', 'states', '$state', '$cookies'];

	function OrderCreateController(Order, User, Toast, country, states, $state, $cookies) {
		var vm = this;

		vm.user = {};

		function loadGuestUser() {
			User.getUserProfile({id: 1}).$promise.then(function(result) {
				console.log(result);
				vm.user = result;
			});
		}

		loadGuestUser();

		vm.order = new Order();

		vm.countries = [];
		vm.countries.push(country);
		vm.states = states;
		vm.userAddress = {};

		vm.shipmentTypes = [
			{
				type: 'EXPRESS',
				details: 'Delivery within 1-2 days'
			},
			{
				type: 'NORMAL',
				details: 'Delivery within 4-5 days'
			}
		];

		vm.paymentTypes = [
			{
				type: 'COD',
				status: 'CONFIRMED',
				details: 'Cash On Delivery, pay while receiving your order'
			},
			{
				type: 'GATEWAY',
				status: 'IN_PROCESS',
				details: 'Pay through our Secured Payment Gateway, all major Credit/Debit Cards accepted'
			}
		];

		vm.shipment = {
			type: 'NORMAL'
		};

		vm.payment = {
			index: 0
		};

		vm.placeOrderSteps = [
			{
				title: 'Order Review'
			},{
				title: 'Shipping Address'
			},{
				title: 'Payment'
			}
		];

		vm.selectedIndex = 1;

		vm.changeStep = changeStep;

		function changeStep(step) {
			if(step === 'previous') {
				vm.selectedIndex--;
			}else {
				vm.selectedIndex++;
			}
		}
		// $scope.$watch('selectedIndex', function(current, old){
		// 	previous = selected;
		// 	selected = tabs[current];
		// 	if ( old + 1 && (old != current)) $log.debug('Goodbye ' + previous.title + '!');
		// 	if ( current + 1 )                $log.debug('Hello ' + selected.title + '!');
		// });

		vm.removeCartCookie = removeCartCookie;

		function removeCartCookie() {
			if($cookies.get('webstore-cart')) {
				$cookies.remove('webstore-cart');
			}
		}

		vm.placeOrder = placeOrder;

		function placeOrder(shippingForm, cart) {
			// refuse to work with invalid data
			if (shippingForm && !shippingForm.$valid) {
				return;
			}

			console.log($state.get('main'));
			console.log(shippingForm);
			console.log(cart);

			var payment = {
				type: vm.paymentTypes[vm.payment.index].type,
				status: vm.paymentTypes[vm.payment.index].status,
				amount: cart.orderTotal
			};

			Order.createPayment({id: cart.id}, payment).$promise.then(function(result) {
				console.log(result);
				vm.payment = result;
				vm.userAddress.country = vm.countries[vm.userAddress.country];
				vm.userAddress.state = vm.states[vm.userAddress.state];
				vm.userAddress.userProfile = vm.user;
				console.log(vm.userAddress);
				User.saveUserAddress(vm.userAddress).$promise.then(function(result) {
					console.log(result);
					var shipment = {};
					shipment.address = result;
					shipment.type = vm.shipment.type;
					shipment.status = 'IN_PROCESS';
					console.log(shipment);
					Order.createShipment({id: cart.id}, shipment).$promise.then(function(result) {
						console.log(result);
						vm.shipment = result;
						removeCartCookie();
						Toast.show({
							type: 'success',
							text: 'Order has been created'
						});
						$state.go('order.list.detail', {'orderId': cart.id});
					});
				});
			});
		}
	}
})();
