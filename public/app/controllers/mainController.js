angular.module('MapBuild')

.controller('mapBuildCtrl', mapBuildController)

mapBuildController.$inject = ['$scope'];
function mapBuildController($scope) {
  $scope.fields = init(10, 10);
  // grace     = 1
  // water     = 2
  // wood      = 3
  // pine-wood = 4
  // sand      = 5
  // clay      = 6
  // gravel    = 7
  $scope.bioms = [1, 2, 3, 4, 5, 6, 7];
  $scope.biomsName = ['Трава', 'Вода', 'Лес', 'Елки', 'Песок', 'Глина', 'Гравий']
  $scope.tools = {
    activeTab: undefined,
    activeTool: undefined
  }

  $scope.nextBiom = function(cell) {
    var res = $scope.bioms[$scope.bioms.indexOf(cell) + 1];
    return res ? res : $scope.bioms[0];
  }

  $scope.getTexturesClass = function(id) {
    return {
      grace:     id === 1,
      water:     id === 2,
      wood:      id === 3,
      'pine-wood': id === 4,
      sand:      id === 5,
      clay:      id === 6,
      gravel:    id === 7
    }
  }

  $scope.pickTool = function(id) {
    console.log(id);
    $scope.tools.activeTool = id;
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
      array[i].push(1);
  }
  return array;
}
