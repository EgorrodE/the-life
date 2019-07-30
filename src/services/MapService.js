class MapService {
  constructor(size){
    this.size = size;
  }

  initialMap() {
    let map = [];
    for (let y = 0; y < this.size.y; y++) {
      map[y] = [];
      for (let x = 0; x < this.size.x; x++) {
        map[y][x] = _defaultCellData(x, y);
      }
    }
    return map;
  }

  nextGeneration(currentGeneration){
    let newMap = [];
    for (let y = 0; y < this.size.y; y++) {
      newMap[y] = [];
      for (let x = 0; x < this.size.x; x++) {
        newMap[y][x] = _nextGenerationCell(currentGeneration, this.size, x, y);
      }
    }
    return newMap;
  }
}

const _defaultCellData = (x, y) => {
  return {
    age: 0,
    x: x,
    y: y,
    alive: false
  };
}

const _nextGenerationCell = (currentGeneration, size, x, y) => {
  let aliveNeighbours = _countNeighbours(currentGeneration, size, x, y);
  let cell = currentGeneration[y][x];
  let newCell = Object.assign({}, cell);

  if (aliveNeighbours === 3 || (cell.alive && aliveNeighbours === 2)) {
    newCell.age = cell.age + 1;
    newCell.alive = true;
  } else {
    newCell.age = 0;
    newCell.alive = false;
  }

  return newCell;
}

const _countNeighbours = (currentGeneration, size, x, y) => {
  let aliveNeighbours = 0;
  let startNeighbourIndexes = {
    x: (x - 1 < 0 ? 0 : x - 1),
    y: (y - 1 < 0 ? 0 : y - 1)
  }
  for (
    let neighbourY = startNeighbourIndexes.y;
    neighbourY <= y + 1 && neighbourY < size.y;
    neighbourY++)
  {
    for (
      let neighbourX = startNeighbourIndexes.x;
      neighbourX <= x + 1  && neighbourX < size.x;
      neighbourX++)
    {
      if (neighbourX === x && neighbourY === y) { continue }
      if (currentGeneration[neighbourY][neighbourX].alive) {
        aliveNeighbours += 1;
        if(aliveNeighbours >= 4) { break }
      }
    }
    if(aliveNeighbours >= 4) { break }
  }
  return aliveNeighbours;
}

export default MapService;
