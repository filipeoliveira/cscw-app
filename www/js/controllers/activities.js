angular.module('takahanga.activities', [])
.controller('ActivitiesCtrl', function($scope, $ionicModal, $ionicPopup, $http, $ionicLoading, ngFB) {


  //modalInfoHelp
  $ionicModal.fromTemplateUrl('templates/modal/activity/show.html', function($ionicModal) {
      $scope.modalShowActivity = $ionicModal;
      }, {
      // Use our scope for the scope of the modal to keep it simple
      scope: $scope,
      controller: 'ActivitiesCtrl',
      // The animation we want to revuse for the modal entrance
      animation: 'slide-in-up'
  })

$scope.textLength = 200;
$scope.logged = false;
$scope.checkAPI = false;

$scope.checkToggle = function() {
  $scope.checkAPI = !$scope.checkAPI;
}

  $scope.fbLogin = function () {
      ngFB.login({scope: 'publish_actions, email, user_events'}).then(
          function (response) {

              console.log(response);

              if (response.status === 'connected') {
                  console.log('Facebook login succeeded');

                  var data = {"access_token": response.authResponse.accessToken  };


                  console.log('indo fazer requisicao');

                  ngFB.api({
                    path: '/me',
                    params: {fields: 'id, first_name,last_name, gender, email, picture'}
                    }).then(
                    function (response) {
                         console.log(response);

                         $scope.user = response;

                         $http({
                                 method: 'POST',
                                 url: 'http://www.takahanga.me/api/user/event',
                                 data: $.param(data),
                                 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                             })
                             .then(function(response, status) {
                                  $ionicLoading.hide();
                                  $scope.eventos = response.data.data;
                                  console.log($scope.eventos);

                                  $scope.logged = true;

                             },
                             function(response){
                                $ionicLoading.hide();
                                console.log(response);
                             });
                    });

             } else {
                 alert('Facebook login failed, please try again!');
             }


          });
  };

 $scope.loadEvents = function(){


   var ionicLoading = $ionicLoading.show({
    templateUrl: 'templates/loadings/events.html',
    scope: $scope,
    content: 'Carregando...',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 900,
    showDelay: 100
  });

$scope.loading = {
  title: 'Carregando eventos',
  description: 'Aguarde um momento por favor'
};

   $http({
             method: 'GET',
             url: 'http://www.takahanga.me/api/event',
             headers: {'Content-Type': 'application/x-www-form-urlencoded'}
         })
         .then(function(response, status) {
              $ionicLoading.hide();
              $scope.eventos = response.data.data;
              console.log($scope.eventos);
         },
         function(response){
            $ionicLoading.hide();
            console.log(response);
         });
 }

 $scope.selectEvent = function(evento){

   console.log('Evento selecionado', evento);
   $scope.selectedEvent = evento;
   $scope.textLength = 200;
   $scope.eventURL = 'href="http://www.facebook.com/events/' + evento.id

   $scope.modalShowActivity.show();
   $('.showMore').show();

   console.log(moment(evento.start_time));

   var now = moment();
   var dps_inicio = now.isAfter(evento.start_time);
   var antes_fim = now.isBefore(evento.end_time);
   console.log(dps_inicio);
   console.log(antes_fim);


 }

$scope.changeLength = function(){
  $scope.textLength = 9999;
  $('.showMore').hide();
}

$scope.addEvent = function(evento){




        var data = {
          'facebook_place_id': evento.place.id, //notnull
          'facebook_event_id': evento.id, //notnull
          'place_name': evento.place.name, //notnull
          'city': evento.place.location.city,
          'country': evento.place.location.country,
          'latitude': evento.place.location.latitude,
          'longitude': evento.place.location.longitude,
          'state': evento.place.location.state,
          'street': evento.place.location.street,
          'zip': null,
          'name': evento.name, //evento //notnull
          'picture_url': null,
          'description': evento.description,
          'start_time': evento.start_time, //NOT null
          'end_time': evento.end_time //NOT NULL
        };

        console.log('evento editado', data);



  $http({
          method: 'POST',
          url: 'http://www.takahanga.me/api/event',
          data: $.param(data),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
      .then(function(response, status) {
           console.log(response);

           var ionicPopupAlert = $ionicPopup.alert({
            scope: $scope,
            title: 'Evento adicionado',
            subTitle: 'Evento cadastrado no servidor'
          })
      },
      function(response){
         console.log(response);
      });


}



})
  .filter('takaDate', function dateFormat($filter){
    return function (text) {

      var res = text.split('T');
      var res = res[1].split(':');

      var hour = parseInt(res[0]);
      var r;

      console.log()

      if (hour >= 6 && hour < 12){
        r = 'Matutino'
      }

      if (hour >= 12 && hour < 18){
        r = 'Vespertino'
      }

      if (hour >= 18 || hour < 6){
        r = 'Noturno'
      }

      return r;


    }
  });
