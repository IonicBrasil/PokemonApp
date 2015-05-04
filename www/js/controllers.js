angular.module('starter.controllers', ['Pokemon', 'ionic'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicLoading) {
  // Form data for the login modal
  $scope.loginData = {};


   $scope.showLoading = function(_message) {

       _message = _message || '<ion-spinner></ion-spinner></br>Loading...';

       $ionicLoading.show({
           template: _message
       });
   };

    $scope.hideLoading = function(){
        $ionicLoading.hide();
    };


  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

// --------Modal from the left Menu---------

  $ionicModal.fromTemplateUrl('templates/about.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeAbout = function() {
    $scope.modal.hide();
  };

  $scope.showAbout = function() {
    $scope.modal.show();
  };

})

.controller('ListarCtrl', ['$scope', '$http', 'Pokemon', function($scope, $http, Pokemon) {

   $scope.showLoading('<ion-spinner></ion-spinner></br>Loading pokémons...');

    Pokemon.getPokedex().then(function(pokemons){
        $scope.pokemons = pokemons.data;
        $scope.hideLoading();
    });
}])


.controller('PokemonCtrl',['$scope', '$stateParams', '$http', 'Pokemon',
                    function($scope, $stateParams, $http, Pokemon) {


         $scope.showLoading();

         Pokemon.getPokemon($stateParams.id).then( function(_response) {
              $scope.pokemon = _response.data;


              console.log(_response.data);

             $scope.hideLoading();

               //return pokemon.data.id;
            return _response.data;

            }).then(function(_pokemon){
                /// @TODO
                 Pokemon.getSprites(_pokemon).then(function(_responses){
                    console.log(_responses);
                 });
                });

                  //http://pokeapi.co/api/v1/sprite/1/
                  $scope.sprite = null;
              }]);
