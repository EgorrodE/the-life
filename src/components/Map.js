import React from 'react';
import Button from './Button';
import MapService from '../services/MapService';
import Cell from './Cell';

const tickTime = 500;

class Map extends React.Component {
  constructor(props) {
    super(props);
    let size = props.size;
    this.state = {
      mapService: new MapService(size),
      size: size,
      playing: false,
      tickInterval: {},
      generation: 0
    };
    this.state.map = this.state.mapService.initialMap();
    this.toggleCell = this.toggleCell.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.clear = this.clear.bind(this);
    this.tick = this.tick.bind(this);
  }

  toggleCell(x, y) {
    if (this.state.playing) { return }
    let cell = this.state.map[y][x];
    this.setState(state => {
      state.map[y][x].alive = !cell.alive
      return state;
    })
  }

  start(){
    this.setState(state => {
      state.tickInterval = setInterval(this.tick, tickTime);
      state.playing = true;
      return state;
    });
  }
  stop(){
    this.setState(state => {
      clearInterval(state.tickInterval);
      state.tickInterval = {};
      state.playing = false;
      return state;
    });
  }
  clear(){
    if (this.state.playing) { return }
    this.setState({
      map: this.state.mapService.initialMap(),
      generation: 0
    });
  }
  tick(){
    this.setState({
      map: this.state.mapService.nextGeneration(this.state.map),
      generation: this.state.generation + 1
    });
  }

  render() {
    let cells = this.state.map.map((row, y) => {
      let rowCells = row.map((cell, x) => (
        <Cell
          cell={cell}
          key={`cell-${y}-${x}`}
          toggle={this.toggleCell} />
      ));
      return (
        <div className="row" key={`row-${y}`}>
          {rowCells}
        </div>
      );
    });
    return (
      <div className="container">
        <div className="controls">
          <span>Generation: {this.state.generation}</span>
          <Button text={ this.state.playing ? 'Stop' : 'Start'} callback={ this.state.playing ? this.stop : this.start } />
          <Button text="Clear" callback={ this.clear } disabled={this.state.playing} />
        </div>
        <div className="map-container">
          {cells}
        </div>
      </div>
    );
  }
}

export default Map;
