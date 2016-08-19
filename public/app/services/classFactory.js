angular.module('MapBuild')

.factory('Classes', classesDefine)

classesDefine.$inject = [];

var getTexturesClass = function(cell) {
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

var getObjectClass = function(cell) {
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


function classesDefine() {
  return {
    getTexture: getTexturesClass,
    getObject: getObjectClass
  }
}
