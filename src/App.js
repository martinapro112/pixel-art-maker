import React, { Component } from 'react';
import './App.css';
import Pixel from './Partials/Pixel';
import { CompactPicker } from 'react-color';

class App extends Component {
  state = {
		pixels: [],
    currentColor: '#000000',
    baseColor: '#CCCCCC'
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
    this.setState({ pixels: pixels });
  }

  setPixelColorHandler = (x, y) => {
    let pixels = this.state.pixels;
    pixels[y][x].color = this.state.currentColor;
    this.setState({ pixels: pixels });
  }

  setCurrentColorHandler = (color) => {
    this.setState({ currentColor: color.hex });
  };

  render() {
    var pixels = []
    for (var y = 0; y < this.state.pixels.length; y++) {
      for (var x = 0; x < this.state.pixels[y].length; x++) {
          pixels.push(
            <Pixel
              key={ y + '_' + x}
              color={ this.state.pixels[y][x].color }
              click={ this.setPixelColorHandler.bind(this, x, y) }
            />
          )
      }
      pixels.push(<br key={ y } />);
    }
 
    return (
      <div className="app">
        <button onClick={ this.resetPictureHandler }>reset</button>
        <div className="picker">
          <CompactPicker
            color={ this.state.currentColor }
            onChangeComplete={ this.setCurrentColorHandler }
          />
        </div>
        <div className="picture">
        { pixels }
        </div>
      </div>
    );
  }
}

export default App;
