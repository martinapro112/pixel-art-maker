import React, { Component } from 'react';
import './App.css';
import Pixel from './Partials/Pixel';
import { CompactPicker } from 'react-color';

const dimensionsRange = {
  y: { default: 32, min: 10, max: 50 },
  x: { default: 32, min: 10, max: 100 }
}
const baseColor = '#CCCCCC';

class App extends Component {
  state = {
		pixels: [],
    currentColor: '#000000',
    pngLink: null,
    imageEdited: false,
    dimensions: { x: dimensionsRange.x.default, y: dimensionsRange.y.default },
    mouseDown: false,
    loadingPixelColors: false,
    loadedPixels: 0
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
        row.push({ color: baseColor, loaded: false });
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

  componentDidUpdate = () => {
    if (!this.state.loadingPixelColors || this.state.pixels.length === 0) return;

    for (var y = 0; y < this.state.pixels.length; y++) {
      for (var x = 0; x < this.state.pixels[y].length; x++) {
        if (!this.state.pixels[y][x].loaded) return;
      }
    }

    var canvas = document.createElement('canvas');

    canvas.width = this.state.pixels[0].length * 16;
    canvas.height = this.state.pixels.length * 16;

    var context = canvas.getContext('2d');

    let pixels = this.state.pixels;

    for (y = 0; y < pixels.length; y++) {
      for (x = 0; x < pixels[y].length; x++) {
        context.fillStyle = pixels[y][x].color;
        context.fillRect(x * 16, y * 16, 15, 15);
        pixels[y][x].loaded = false;
      }
    }

    this.setState({ pngLink: canvas.toDataURL(), loadingPixelColors: false, pixels: pixels });
  }

  setPixelColorHandler = (y, x, color) => {
    let pixels = this.state.pixels;
    pixels[y][x].color = color;
    pixels[y][x].loaded = true;
    this.setState({ pixels: pixels });
  }

  setCurrentColorHandler = (color) => {
    this.setState({ currentColor: color.hex });
  }

  imageEdited = () => {
    this.setState({ imageEdited: true });
  }

  exportToPngHandler = () => {
    this.setState({ loadingPixelColors: true });
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
            edited={ this.imageEdited }
            currentColor={ this.state.currentColor }
            color={ baseColor }
            mouseDown={ this.state.mouseDown }
            loadingPixelColors={ this.state.loadingPixelColors }
            setPixelColor={ this.setPixelColorHandler }
            coordinates={{ y: y, x: x }}
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
