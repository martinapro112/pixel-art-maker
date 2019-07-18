import React, { Component } from 'react';

class Pixel extends Component {
    state = {
		hover: false
    }

    mouseOverHandler = () => {
        this.setState({ hover: true });
        setTimeout(() => { this.setState({ hover: false }); }, 1000);
    }
      
    render() {
        return (
            <div
                className={ 'pixel ' + (this.state.hover ? 'hover' : '') }
                onMouseEnter={ this.mouseOverHandler }
                onClick={ this.props.click }
                style={{ backgroundColor: this.props.color }}
            ></div>
        );
    }
}

export default Pixel;