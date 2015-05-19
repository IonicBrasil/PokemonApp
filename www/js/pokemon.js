angular.module("Pokemon", [])
    .service("Pokemon",["$http","$q", function($http, $q){

        // MOver para constants ?
        var URL = "http://pokeapi.co";
        var VERSION = "/api/v1";
        
        var getPokedex = function(){
            return $http.get(URL + VERSION + '/pokedex/1/');
        };

        var getPokemon = function(_id) {
            return $http.get(URL + VERSION + '/pokemon/' + _id + '/');
        };

        var getSprites = function(_pokemon) {

            var sprites = [];

                angular.forEach(_pokemon.sprites, function(sprite){
                    sprites.push($http.get('http://pokeapi.co/' + sprite.resource_uri));
                });

            return $q.all(sprites);
        };


        return {
            getPokedex: getPokedex,
            getPokemon: getPokemon,
            getSprites: getSprites
        };
    }]);