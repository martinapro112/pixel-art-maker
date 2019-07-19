import React, { Component } from 'react';

class Pixel extends Component {
    state = {
        hover: false,
        color: this.props.baseColor
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
        this.props.setImageEdited();
    }

    resetPixelColorHandler = (event) => {
        event.preventDefault();
        this.setState({ color: this.props.baseColor });
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.loadingPixelColors && !prevProps.loadingPixelColors) {
            this.props.setPixelColor(this.props.coordinates.y, this.props.coordinates.x, this.state.color);
        }

        if (!this.props.imageEdited && prevProps.imageEdited) {
            this.setState({ color: this.props.baseColor });
        }

        if (this.props.color !== prevProps.color) {
            this.setState({ color: this.props.color });
        }
    }

    componentDidMount = () => {
        if (this.props.color !== this.props.baseColor) {
            this.setState({ color: this.props.color });
        }
    }
      
    render() {
        return (
            <div
                className={ 'pixel ' + (this.state.hover ? 'hover' : '') }
                onMouseEnter={ this.mouseOverHandler }
                onClick={ this.setPixelColorHandler }
                onContextMenu={ this.resetPixelColorHandler }
                style={{ backgroundColor: this.state.color }}
            ></div>
        );
    }
}

export default Pixel;