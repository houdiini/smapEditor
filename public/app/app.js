angular.module('MapBuild', ['ui.router'])

.config( configApp )

configApp.$inject = ["$stateProvider", "$urlRouterProvider"];
function configApp($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/map-build');

  $stateProvider.state('mapBuild', {
    url: '/map-build',
    templateUrl: 'app/templates/map-build.html',
    controller: 'mapBuildCtrl'
  })
}
