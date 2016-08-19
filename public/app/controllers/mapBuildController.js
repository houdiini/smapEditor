angular.module('MapBuild')

.controller('mapBuildCtrl', mapBuildController)

mapBuildController.$inject = ['$scope', 'Classes'];
function mapBuildController($scope, Classes) {
  $scope.fields = init(10, 10);
  // grace      = 1
  // water      = 2
  // wood       = 3
  // pine-wood  = 4
  // sand       = 5
  // clay       = 6
  // gravel     = 7
  // snow       = 8
  // tree       = 9
  // trees      = 10
  // fewTree    = 11
  // pine       = 12
  // pines      = 13
  // fewPines   = 14
  // stump      = 15
  // stumps     = 16
  // fewStumps  = 17
  // stumpsWood = 18

  $scope.bioms = _.range(1, 19);
  $scope.biomsName = ['Трава', 'Вода', 'Лес', 'Хвойный лес', 'Песок', 'Глина', 'Гравий',
    'Снег'];
  $scope.buildings = _.range(1, 9);
  $scope.tools = {
    activeTab: undefined,
    activeTexture: undefined,
    activeBuilding: undefined
  }

  $scope.nextBiom = function(cell) {
    var res = $scope.bioms[$scope.bioms.indexOf(cell) + 1];
    return res ? res : $scope.bioms[0];
  }

  $scope.getTexturesClass = Classes.getTexture;

  $scope.getObjectClass = Classes.getObject;

  $scope.pickTexture = function(id) {
    console.log(id);
    $scope.tools.activeBuilding = undefined;
    $scope.tools.activeTexture = id;
  }

  $scope.pickBuilding = function(id) {
    console.log(id);
    $scope.tools.activeTexture = undefined;
    $scope.tools.activeBuilding = id;
  }

  $scope.setCell = function(cell) {
    console.log($scope.tools.activeTexture);
    if ( !_.isUndefined($scope.tools.activeTexture) ) {
      cell.texture = $scope.tools.activeTexture+1;

      cell.type = [1, 5, 6, 7, 8].find((i) => i === cell.texture ) ? 'free' : 'blocked';
    }
    if ( !_.isUndefined($scope.tools.activeBuilding) && cell.type === 'free' )
      cell.building = $scope.tools.activeBuilding+1;
  }

  $scope.toggleTab = function(status) {
    $scope.tools.activeTab = $scope.tools.activeTab === status ? undefined : status;
  }

  $scope.saveFields = function() { localStorage.setItem('map', JSON.stringify($scope.fields)); }
  $scope.openFields = function() { $scope.fields = JSON.parse(localStorage.getItem('map')); }

}

function init(n, m) {
  var array = [];
  for (var i = 0; i < n; i++) {
    array.push([]);
    for (var j = 0; j < m; j++)
      array[i].push({
        type: 'free',
        texture: 1
      });
  }
  return array;
}
