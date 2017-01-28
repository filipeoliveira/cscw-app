// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('takahanga', ['ionic', 'takahanga.controllers', 'takahanga.app-services', 'ngCordova', 'ngOpenFB'])

.run(function($ionicPlatform, $rootScope, $ionicSideMenuDelegate, ngFB, $cordovaSplashscreen) {

  ngFB.init({appId: '1379982378719884', cookie: true});

  $ionicPlatform.ready(function() {

    //Set a delay to minimize the 'white screen' when Ionic loads his dependencies on the app start.
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

  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'ActivitiesCtrl'
  })

  .state('app.activities', {
    url: '/activities',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-activities.html'
      }
    }
  })

  .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/tab-about.html'
        }
      }
    })
  //
  //
  //   .state('app.user', {
  //     url: '/user',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/tab-user.html'
  //       }
  //     }
  //   });




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/activities');

});
