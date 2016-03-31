'use strict';

describe('Controller: CatalogCtrl', function () {

	// load the controller's module
	beforeEach(module('sampleOnlineStoreApp.catalog'));

	var controller;
	var scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		controller = $controller('CatalogListController', {
			// $scope: scope
		});
	}));

	it('object should exist', function () {
		Should.exist(controller);
		controller.should.be.an.instanceof(Object);
	});
});
