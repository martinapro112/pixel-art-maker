import React, { Component } from 'react';

class Pixel extends Component {
    state = {
        hover: false,
        color: '#CCCCCC'
    }

    mouseOverHandler = () => {
        this.setState({ hover: true });
        setTimeout(() => { this.setState({ hover: false }); }, 1000);
        if (this.props.mouseDown) {
            this.setPixelColorHandler();
        }
    }

    setPixelColorHandler = () => {
        this.setState({ color: this.props.currentColor });
        this.props.edited();
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.loadingPixelColors && !prevProps.loadingPixelColors) {
            this.props.setPixelColor(this.props.coordinates.y, this.props.coordinates.x, this.state.color);
        }
    }
      
    render() {
        return (
            <div
                className={ 'pixel ' + (this.state.hover ? 'hover' : '') }
                onMouseEnter={ this.mouseOverHandler }
                onClick={ this.setPixelColorHandler }
                style={{ backgroundColor: this.state.color }}
            ></div>
        );
    }
}

export default Pixel;