import React from 'react';
import { CompactPicker } from 'react-color';
var dateFormat = require('dateformat');

const Tools = (props) => {
    let exportPng = <span>export<br />to<br />png</span>;
    if (props.pngLoading) {
        exportPng = <span>LOADING</span>;
    }
    else if (props.pngLink) {
        let date = new Date();
        exportPng =
            <a
                href={ props.pngLink }
                download={ 'pixel_art_' + dateFormat(date, 'yyyy-mm-dd-HH-MM-ss') + '.png' }
            >
                download<br />png
            </a>;
    }

    return (
        <div>
            <div className="dimensions">
                <div className="dimension">
                    <span className="dimension-label">y</span>
                    <input
                        type="number" name="y"
                        min={ props.dimensionsRange.y.min } max={ props.dimensionsRange.y.max }
                        className="dimension-input"
                        value={ props.dimensions.y }
                        onChange={ props.setDimensionHandler.bind(this, 'y') }
                    />
                </div>
                <div className="dimension">
                    <span className="dimension-label">x</span>
                    <input
                        type="number" name="x"
                        min={ props.dimensionsRange.x.min } max={ props.dimensionsRange.x.max }
                        className="dimension-input"
                        value={ props.dimensions.x }
                        onChange={ props.setDimensionHandler.bind(this, 'x') }
                    />
                </div>
            </div>
            <button onClick={ props.resetPictureHandler }>new<br />image</button>
            <div className="picker">
            <CompactPicker
                color={ props.currentColor }
                onChangeComplete={ props.setCurrentColorHandler }
            />
            </div>
            <button onClick={ props.exportToPngHandler } disabled={ props.disabledExport }>
                { exportPng }
            </button>
        </div>
    );
}

export default Tools;