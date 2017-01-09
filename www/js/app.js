// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('takahanga', ['ionic', 'takahanga.controllers', 'takahanga.app-services', 'ngCordova', 'ngOpenFB'])

.run(function($ionicPlatform, $rootScope, $ionicSideMenuDelegate, ngFB) {

  ngFB.init({appId: '1379982378719884', cookie: true});

  $ionicPlatform.ready(function() {


    // //Set a delay to minimize the 'white screen' when Ionic loads his dependencies on the app start.
    // setTimeout(function() {
    //   $cordovaSplashscreen.hide();
    // }, 8000);


    $rootScope.openMenuLateral = function () {
      $ionicSideMenuDelegate.$getByHandle('menu-lateral').toggleLeft();
    };

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $cordovaFacebookProvider) {

 // var appID = 1379982378719884;
 // var version = "v2.0"; // or leave blank and default is v2.0
 // $cordovaFacebookProvider.browserInit(appID, version);

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.activities', {
    url: '/activities',
    views: {
      'tab-activities': {
        templateUrl: 'templates/tab-activities.html',
        controller: 'ActivitiesCtrl'
      }
    }
  })

  .state('tab.services', {
      url: '/services',
      views: {
        'tab-services': {
          templateUrl: 'templates/tab-services.html',
          controller: 'ServicesCtrl'
        }
      }
    })


    .state('tab.user', {
      url: '/user',
      views: {
        'tab-user': {
          templateUrl: 'templates/tab-user.html',
          controller: 'UserCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/activities');

});
