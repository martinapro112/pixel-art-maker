import React from 'react';
import { CompactPicker } from 'react-color';
var dateFormat = require('dateformat');

const Tools = (props) => {
    let exportPng =
        <button
            onClick={ props.exportToPngHandler }
            disabled={ props.disabledExport } className={ props.disabledExport ? 'disabled' : null}
        >
            export<br />to<br />png
        </button>;
    if (props.pngLoading) {
        exportPng = <button><div id="load"></div></button>;
    }
    else if (props.pngLink) {
        let date = new Date();
        exportPng =
            <button>
                <a
                    href={ props.pngLink }
                    download={ 'pixel_art_' + dateFormat(date, 'yyyy-mm-dd-HH-MM-ss') + '.png' }
                    onClick={ props.imageDownloaded }
                >
                    download<br />png
                </a>
            </button>;
    }

    return (
        <div>
            <button onClick={ props.resetImageHandler }>
                new<br />image
            </button>
            { exportPng }
            <div className="picker">
                <CompactPicker
                    color={ props.currentColor }
                    onChangeComplete={ props.setCurrentColorHandler }
                />
            </div>
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
            <div className="mini-button-group">
                <button className="mini-button" onClick={ props.presetImageHandler.bind(this, 'mesh') }>mesh</button><br />
                <button className="mini-button" onClick={ props.presetImageHandler.bind(this, 'man') }>man</button><br />
                <button className="mini-button" onClick={ props.presetImageHandler.bind(this, 'rainbow') }>rainbow</button><br />
                <button className="mini-button" onClick={ props.presetImageHandler.bind(this, 'todo') }>todo</button>
            </div>
        </div>
    );
}

export default Tools;