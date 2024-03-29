import React, { Component } from 'react';
import Pixel    from './Partials/Pixel';
import Tools    from './Partials/Tools';
import Mesh     from './Images/Mesh';
import Man      from './Images/Man';
import Rainbow  from './Images/Rainbow';
import Grumpy   from './Images/Grumpy';

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
        wrongDimensions: false,
        mouseDown: false,
        loadingPixelColors: false,
        loadedPixels: 0,
        presetImage: false
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

        setTimeout(() => {
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
        }, 1000); 
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

    setImageEditedHandler = () => {
        this.setState({ imageEdited: true });
    }

    exportToPngHandler = () => {
        this.setState({ loadingPixelColors: true });
    }

    imageDownloadedHandler = () => {
        console.log(JSON.stringify(this.state.pixels));
        this.setState({ pngLink: null });
    }

    setDimensionHandler = (coordinate, event) => {
        let dimensions = this.state.dimensions;
        dimensions[coordinate] = event.target.value;

        if ((dimensions[coordinate] < dimensionsRange[coordinate].min) || 
            (dimensions[coordinate] > dimensionsRange[coordinate].max)) {
            this.setState({ wrongDimensions: true });
        } else {
            this.setState({ dimensions: dimensions, wrongDimensions: false });
        }
    }

    changesTestFailed = () => {
        if (this.state.imageEdited) {
            let answer = window.confirm('All changes will be lost. Are you sure you want to do that?');
            return !answer;
        } else {
            return false;
        }
    }

    resetImageHandler = () => {
        if (this.changesTestFailed()) return;
        if (this.state.wrongDimensions) {
            window.confirm('Please set the dimensions into the allowed range.');
            return;
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
        this.setState({ pixels: pixels, pngLink: null, imageEdited: false, presetImage: false });
    }

    presetImageHandler = (image) => {
        if (this.changesTestFailed()) return;

        let imagePixels = [];

        switch (image) {
            case 'mesh':    imagePixels = Mesh;     break;
            case 'man':     imagePixels = Man;      break;
            case 'rainbow': imagePixels = Rainbow;  break;
            case 'grumpy':  imagePixels = Grumpy;   break;
            default: break;
        }

        this.setState({ pixels: imagePixels, presetImage: true });
    }

    render() {
        let pixels = [];
        for (var y = 0; y < this.state.pixels.length; y++) {
            for (var x = 0; x < this.state.pixels[y].length; x++) {
                pixels.push(
                    <Pixel
                        key={ y + '_' + x}
                        coordinates={{ y: y, x: x }}
                        currentColor={ this.state.currentColor }
                        baseColor={ baseColor }
                        color={ this.state.presetImage ? this.state.pixels[y][x].color : baseColor }
                        mouseDown={ this.state.mouseDown }
                        loadingPixelColors={ this.state.loadingPixelColors }
                        imageEdited={ this.state.imageEdited }
                        setPixelColor={ this.setPixelColorHandler }
                        setImageEdited={ this.setImageEditedHandler }
                    />
                );
            }
            pixels.push(<br key={ y } />);
        }

        return (
            <div id="app">
                <Tools
                    dimensionsRange={ dimensionsRange }
                    dimensions={ this.state.dimensions }
                    wrongDimensions={ this.state.wrongDimensions }
                    currentColor={ this.state.currentColor }
                    disabledExport={ this.state.pixels.length === 0 }
                    pngLoading={ this.state.loadingPixelColors }
                    pngLink={ this.state.pngLink }
                    setDimensionHandler={ this.setDimensionHandler }
                    resetImageHandler={ this.resetImageHandler }
                    setCurrentColorHandler={ this.setCurrentColorHandler }
                    exportToPngHandler={ this.exportToPngHandler }
                    imageDownloaded={ this.imageDownloadedHandler }
                    presetImageHandler={ this.presetImageHandler }
                />
                <div id="image"
                    style={{
                        height: this.state.pixels.length * 18,
                        width: this.state.pixels.length > 0 ? this.state.pixels[0].length * 18 : 0
                    }}>
                    { pixels }
                </div>
            </div>
        );
    }
}

export default App;
