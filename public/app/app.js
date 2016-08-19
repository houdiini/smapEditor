angular.module('MapBuild', ['ui.router'])

.config( configApp )

.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
});

configApp.$inject = ["$stateProvider", "$urlRouterProvider"];
function configApp($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/game');

  $stateProvider.state('mapBuild', {
    url: '/map-build',
    templateUrl: 'app/templates/map-build.html',
    controller: 'mapBuildCtrl'
  })
  .state('game', {
    url: '/game',
    templateUrl: '/app/templates/game.html',
    controller: 'gameCtrl'
  })
}
