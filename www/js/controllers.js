angular.module('starter.controllers', ['Pokemon', 'ionic'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicLoading) {
  // Form data for the login modal
  $scope.loginData = {};


   $scope.showLoading = function(_message) {

       _message = _message || 'Loading...';

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
})

.controller('ListarCtrl', ['$scope', '$http', 'Pokemon', function($scope, $http, Pokemon) {

   $scope.showLoading('Loading pokémons...');

    Pokemon.getPokedex().then(function(pokemons){
        $scope.pokemons = pokemons.data;
        $scope.hideLoading();
    });
}])


.controller('PokemonCtrl',['$scope', '$stateParams', '$http', 'Pokemon', 
                    function($scope, $stateParams, $http, Pokemon) {


         $scope.showLoading();
         $scope.showEvolution = false;

         $scope.showEvolutions = function() {
            $scope.showEvolution = !$scope.showEvolution;
         };

         Pokemon.getPokemon($stateParams.id).then( function(_response) {
              $scope.pokemon = _response.data;

              console.log(_response.data);

             $scope.hideLoading();

            return _response.data;

            }).then(function(_pokemon) {

                 Pokemon.getSprites(_pokemon).then(function(_responses) {

                     var _firstSprite;

                     if(_responses.length === 0) {

                         //Coloca sprite do pokemonstadium
                         var _pokemonName = _pokemon.name.toLowerCase();

                         //Tratamento diferenciado
                         if(_pokemonName.indexOf('charizard-mega') != -1 ||
                             _pokemonName.indexOf('mewtwo-mega') != -1 ) {
                             _pokemonName = _pokemonName.replace(/-([^-]*)$/,''+'$1');
                         }

                         _firstSprite = 'http://www.pokestadium.com/sprites/xy/' + _pokemonName + '.gif';
                     } else {
                         _firstSprite = 'http://pokeapi.co'  + _responses[0].data.image;
                     }

                     $scope.sprite = _firstSprite;

                 });

                });

        }]);
