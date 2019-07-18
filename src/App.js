import React, { Component } from 'react';
import './App.css';
import Pixel from './Partials/Pixel';
import { CompactPicker } from 'react-color';

class App extends Component {
  state = {
		pixels: [],
    currentColor: '#000000',
    baseColor: '#CCCCCC',
    pngLink: null
  }

  resetPictureHandler = () => {
    let pixels = [];
    let row = [];
    for (var y = 0; y < 50; y++) {
      for (var x = 0; x < 50; x++) {
        row.push({ color: this.state.baseColor });
      }
      pixels.push(row);
      row = [];
    }
    this.setState({ pixels: pixels, pngLink: null });
  }

  setPixelColorHandler = (x, y) => {
    let pixels = this.state.pixels;
    pixels[y][x].color = this.state.currentColor;
    this.setState({ pixels: pixels });
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

  render() {
    let pixels = [];
    for (var y = 0; y < this.state.pixels.length; y++) {
      for (var x = 0; x < this.state.pixels[y].length; x++) {
        pixels.push(
          <Pixel
            key={ y + '_' + x}
            color={ this.state.pixels[y][x].color }
            click={ this.setPixelColorHandler.bind(this, x, y) }
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
        <button onClick={ this.resetPictureHandler }>new<br />image</button>
        <div className="picker">
          <CompactPicker
            color={ this.state.currentColor }
            onChangeComplete={ this.setCurrentColorHandler }
          />
        </div>
        <button onClick={ this.exportToPngHandler } disabled={ this.state.pixels.length == 0 }>
          { exportPng }
        </button>
        <div className="picture">
        { pixels }
        </div>
      </div>
    );
  }
}

export default App;
