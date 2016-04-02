/**
 * @ngdoc overview
 * @name sampleOnlineStoreApp
 * @description
 * Module definition for the sampleOnlineStoreApp module.
 */

(function () {
	'use strict';

	angular
		.module('sampleOnlineStoreApp', [
			// Add modules below
			'sampleOnlineStoreApp.order',
			'sampleOnlineStoreApp.catalog',
			'ngCookies',
			'ngResource',
			'ngSanitize',
			'ngMessages',
			'ngMaterial',
			'ui.router',
			'sampleOnlineStoreApp.auth.user',
			'sampleOnlineStoreApp.listImage',
			'sampleOnlineStoreApp.lodash',
			'sampleOnlineStoreApp.mainMenu',
			'sampleOnlineStoreApp.main'
		])
		.config(appConfig);

	/* App configuration */

	// add appConfig dependencies to inject
	appConfig.$inject = ['$urlRouterProvider', '$urlMatcherFactoryProvider', '$locationProvider', '$mdThemingProvider', '$mdIconProvider'];

	/**
	 * Application config function
	 *
	 * @param $stateProvider
	 * @param $urlRouterProvider
	 * @param $locationProvider
	 */
	function appConfig($urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider, $mdThemingProvider, $mdIconProvider) {
		$urlRouterProvider.otherwise('/');
		$urlMatcherFactoryProvider.strictMode(false);
		$locationProvider.html5Mode(true);



		// set the default palette name
		var defaultPalette = 'blue';
		// define a palette to darken the background of components
		var greyBackgroundMap = $mdThemingProvider.extendPalette(defaultPalette, {'A100': 'fafafa'});

		$mdThemingProvider.definePalette('grey-background', greyBackgroundMap);
		$mdThemingProvider.setDefaultTheme(defaultPalette);

		// customize the theme
		$mdThemingProvider
			.theme(defaultPalette)
			.primaryPalette(defaultPalette)
			.accentPalette('orange')
			.backgroundPalette('grey-background');

		var spritePath = 'bower_components/material-design-icons/sprites/svg-sprite/';
		$mdIconProvider.iconSet('navigation', spritePath + 'svg-sprite-navigation.svg');
		$mdIconProvider.iconSet('action', spritePath + 'svg-sprite-action.svg');
		$mdIconProvider.iconSet('content', spritePath + 'svg-sprite-content.svg');
		$mdIconProvider.iconSet('toggle', spritePath + 'svg-sprite-toggle.svg');
		$mdIconProvider.iconSet('alert', spritePath + 'svg-sprite-alert.svg');
		$mdIconProvider.iconSet('navigation', spritePath + 'svg-sprite-navigation.svg');

	};

})();
