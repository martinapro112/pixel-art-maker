import React, { Component } from 'react';
import './App.css';
import Pixel from './Partials/Pixel';
import { CompactPicker } from 'react-color';

const dimensionsRange = {
  y: { min: 1, max: 50 },
  x: { min: 1, max: 100 }
}

class App extends Component {
  state = {
		pixels: [],
    currentColor: '#000000',
    baseColor: '#CCCCCC',
    pngLink: null,
    imageEdited: false,
    dimensions: { x: dimensionsRange.x.max, y: dimensionsRange.y.max },
    mouseDown: false
  }

  resetPictureHandler = () => {
    if (this.state.imageEdited) {
      let answer = window.confirm('All changes will be lost. Are you sure you want to do that?');
      if (!answer) return;
    }

    let pixels = [];
    let row = [];
    for (var y = 0; y < this.state.dimensions.y; y++) {
      for (var x = 0; x < this.state.dimensions.x; x++) {
        row.push({ color: this.state.baseColor });
      }
      pixels.push(row);
      row = [];
    }
    this.setState({ pixels: pixels, pngLink: null });
  }

  mouseDownHandler = () => {
    this.setState({ mouseDown: true });
  }

  mouseUpHandler = () => {
    this.setState({ mouseDown: false });
  }

  componentDidMount = () => {
    window.addEventListener('mousedown', this.mouseDownHandler);
    window.addEventListener('mouseup', this.mouseUpHandler);
  }

  componentWillUnmount = () => {
    window.removeEventListener('mousedown', this.mouseDownHandler);
    window.removeEventListener('mouseup', this.mouseUpHandler);
  }

  setPixelColorHandler = (x, y) => {
    let pixels = this.state.pixels;
    pixels[y][x].color = this.state.currentColor;
    this.setState({ pixels: pixels, imageEdited: true });
  }

  hoverPixelColorHandler = (x, y) => {
    if (this.state.mouseDown) {
      this.setPixelColorHandler(x, y);
    }
  }

  setCurrentColorHandler = (color) => {
    this.setState({ currentColor: color.hex });
  }

  exportToPngHandler = () => {
    var canvas = document.createElement('canvas');

    canvas.width = this.state.pixels[0].length * 16;
    canvas.height = this.state.pixels.length * 16;

    var context = canvas.getContext('2d');

    for (var y = 0; y < this.state.pixels.length; y++) {
      for (var x = 0; x < this.state.pixels[y].length; x++) {
        context.fillStyle = this.state.pixels[y][x].color;
        context.fillRect(x * 16, y * 16, 15, 15);
      }
    }

    this.setState({ pngLink: canvas.toDataURL() });
  }

  setDimension = (coordinate, event) => {
    let dimensions = this.state.dimensions;
    dimensions[coordinate] = event.target.value;

    if (dimensions[coordinate] < dimensionsRange[coordinate].min) {
      dimensions[coordinate] = dimensionsRange[coordinate].min;
    }
    if (dimensions[coordinate] > dimensionsRange[coordinate].max) {
      dimensions[coordinate] = dimensionsRange[coordinate].max;
    }

    this.setState({ dimensions: dimensions });
  }

  render() {
    let pixels = [];
    for (var y = 0; y < this.state.pixels.length; y++) {
      for (var x = 0; x < this.state.pixels[y].length; x++) {
        pixels.push(
          <Pixel
            key={ y + '_' + x}
            color={ this.state.pixels[y][x].color }
            click={ this.setPixelColorHandler.bind(this, x, y) }
            hover={ this.hoverPixelColorHandler.bind(this, x, y) }
          />
        );
      }
      pixels.push(<br key={ y } />);
    }
 
    let exportPng = <span>export<br />to<br />png</span>;
    if (this.state.pngLink) {
      exportPng = <a href={ this.state.pngLink } download="my.png">donwload png</a>;
    }

    return (
      <div className="app">
        <div className="dimensions">
          <div className="dimension">
            <span className="dimension-label">y</span>
            <input
              type="number" name="y" min={ dimensionsRange.y.min } max={ dimensionsRange.y.max }
              className="dimension-input"
              value={ this.state.dimensions.y }
              onChange={ this.setDimension.bind(this, 'y') }
            />
          </div>
          <div className="dimension">
            <span className="dimension-label">x</span>
            <input
              type="number" name="x" min={ dimensionsRange.x.min } max={ dimensionsRange.x.max }
              className="dimension-input"
              value={ this.state.dimensions.x }
              onChange={ this.setDimension.bind(this, 'x') }
            />
          </div>
        </div>
        <button onClick={ this.resetPictureHandler }>new<br />image</button>
        <div className="picker">
          <CompactPicker
            color={ this.state.currentColor }
            onChangeComplete={ this.setCurrentColorHandler }
          />
        </div>
        <button onClick={ this.exportToPngHandler } disabled={ this.state.pixels.length === 0 }>
          { exportPng }
        </button>
        <div className="picture" style={{ height: this.state.dimensions.y * 18, width: this.state.dimensions.x * 18 }}>
        { pixels }
        </div>
      </div>
    );
  }
}

export default App;
