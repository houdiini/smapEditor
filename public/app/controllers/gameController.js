angular.module('MapBuild')

.controller('gameCtrl', gameCtrlFunc)

gameCtrlFunc.$inject = ['$scope', 'Classes', '$http', '$interval'];
function gameCtrlFunc($scope, Classes, $http, $interval) {
  $scope.fields = JSON.parse(localStorage.getItem('map'));
  $scope.getTexturesClass = Classes.getTexture;
  $scope.getObjectClass = Classes.getObject;
  $scope.gameInfo = {
    money: 200,
    wooden: 20,
    stone: 0,
    activeCell: undefined,
    upgradeWindow: false,
    buildWindow: false
  };

  $http.get('/app/buildings.json')
  .then(function(response) {
    console.log(response);
    $scope.buildings = response.data;
    console.log($scope.building);
  })

  $scope.hideAllMenu = function() {
    $scope.gameInfo.activeCell = undefined;
    $scope.gameInfo.isBuildMenu = false;
    $scope.gameInfo.isUpgradeMenu = false;
  }

  $interval( function() { $scope.gameInfo.money++ }, 1000)

  $scope.doAction = function(cell, evnt) {
    $scope.hideAllMenu();
    var el = angular.element(evnt.target);
    if (cell.type === 'free' && _.isUndefined(cell.building) ) {
      $scope.gameInfo.activeCell = cell;
      $scope.gameInfo.activeCell.top = el.offset().top;
      $scope.gameInfo.activeCell.left = el.offset().left;
      $scope.gameInfo.isBuildMenu = true;
    }
    if (!_.isUndefined(cell.building)) {
      $scope.gameInfo.activeCell = cell;
      $scope.gameInfo.activeCell.top = el.offset().top;
      $scope.gameInfo.activeCell.left = el.offset().left;
      $scope.gameInfo.isUpgradeMenu = true;
    }
  }

  $scope.buildThis = function(building) {
    if ($scope.gameInfo.money >= building.price) {
      $scope.gameInfo.money -= building.price;
      $scope.gameInfo.buildWindow = false;
      $scope.gameInfo.activeCell.building = building.id;
    }
  }

  $scope.toggleUpgradeWindow = function() {
    $scope.gameInfo.upgradeWindow = !$scope.gameInfo.upgradeWindow;
  }

  $scope.toggleBuildWindow = function() {
    console.log(!$scope.gameInfo.buildWindow);
    $scope.gameInfo.buildWindow = !$scope.gameInfo.buildWindow;
  }
}
