import React, { Component } from 'react';
import './App.css';
import Pixel from './Partials/Pixel';

class App extends Component {
  state = {
		pixels: [],
    currentColor: '#000000',
    baseColor: '#C8C8C8'
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

  setColorHandler = (x, y) => {
    let pixels = this.state.pixels;
    pixels[y][x].color = this.state.currentColor;
    this.setState({ pixels: pixels });
  }

  render() {
    var pixels = []
    for (var y = 0; y < this.state.pixels.length; y++) {
      for (var x = 0; x < this.state.pixels[y].length; x++) {
          pixels.push(
              <Pixel key={ y + '_' + x} color={ this.state.pixels[y][x].color } click={ this.setColorHandler.bind(this, x, y) } />
          )
      }
      pixels.push(<br key={ y } />);
    }
 
    return (
      <div className="app">
        <button onClick={ this.resetPictureHandler }>reset</button>
        <div className="picture">
        { pixels }
        </div>
      </div>
    );
  }
}

export default App;
