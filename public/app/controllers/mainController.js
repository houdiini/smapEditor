angular.module('MapBuild')

.controller('mapBuildCtrl', mapBuildController)

mapBuildController.$inject = ['$scope'];
function mapBuildController($scope) {
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
  $scope.buildings = _.range(0, 9);
  $scope.tools = {
    activeTab: undefined,
    activeTexture: undefined,
    activeBuilding: undefined
  }

  $scope.nextBiom = function(cell) {
    var res = $scope.bioms[$scope.bioms.indexOf(cell) + 1];
    return res ? res : $scope.bioms[0];
  }

  $scope.getTexturesClass = function(cell) {
    return {
      grace:     cell.texture === 1,
      water:     cell.texture === 2,
      wood:      cell.texture === 3,
      'pine-wood': cell.texture === 4,
      sand:      cell.texture === 5,
      clay:      cell.texture === 6,
      gravel:    cell.texture === 7,
      snow:      cell.texture === 8,
      tree:      cell.texture === 9,
      trees:     cell.texture === 10,
      fewTree:   cell.texture === 11,
      pine:      cell.texture === 12,
      pines:     cell.texture === 13,
      fewPines:  cell.texture === 14,
      stump:     cell.texture === 15,
      stumps:    cell.texture === 16,
      fewStumps: cell.texture === 17,
      stumpsWood: cell.texture === 18,
      wooden:    [3, 4, 9, 10, 11, 12, 13, 14].find((i) => i === cell.texture ),
      free:     [1, 5, 6, 7, 8].find((i) => i === cell.texture )
    }
  }

  $scope.getObjectClass = function(cell) {
    return {
      shed:   cell.building === 1,
      stock:  cell.building === 2,
      house:  cell.building === 3,
      hangar: cell.building === 4,
      smithy: cell.building === 5,
      carpenter: cell.building === 6,
      tent: cell.building === 7,
      shop: cell.building === 8
    }
  }

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
