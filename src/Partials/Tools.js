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

    let dimensions = [];
    ['x', 'y'].forEach(dimension => {
        dimensions.push(
            <div className="dimension">
                <span className="dimension-label">{ dimension }</span>
                <input
                    type="number" name={ dimension }
                    className={
                        'dimension-input ' + 
                        (
                            props.dimensionsRange[dimension].max < props.dimensions[dimension] ||
                            props.dimensionsRange[dimension].min > props.dimensions[dimension]
                            ? 'wrong-entry' : ''
                        )
                    }
                    value={ props.dimensions[dimension] }
                    onChange={ props.setDimensionHandler.bind(this, dimension) }
                />
                {
                    props.dimensionsRange[dimension].max < props.dimensions[dimension] ?
                    <span className="tooltip">Cannot be more than { props.dimensionsRange[dimension].max }</span> : ''
                }
                {
                    props.dimensionsRange[dimension].min > props.dimensions[dimension] ?
                    <span className="tooltip">Cannot be less than { props.dimensionsRange[dimension].min }</span> : ''
                }
            </div>
        );
    });

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
                { dimensions }
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