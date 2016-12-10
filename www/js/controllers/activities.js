angular.module('takahanga.activities', [])
.controller('ActivitiesCtrl', function($scope, $ionicModal) {


  //modalInfoHelp
  $ionicModal.fromTemplateUrl('templates/modal/activity/show.html', function($ionicModal) {
      $scope.modalShowActivity = $ionicModal;
      }, {
      // Use our scope for the scope of the modal to keep it simple
      scope: $scope,
      controller: 'ActivitiesCtrl',
      // The animation we want to revuse for the modal entrance
      animation: 'slide-in-up'
  });



});
