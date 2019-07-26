import React                from 'react';
import { CompactPicker }    from 'react-color';
var dateFormat = require('dateformat');

const Tools = (props) => {
    let exportPng =
        <button
            className={ 'tool button ' + (props.disabledExport ? 'disabled' : '') }
            onClick={ props.exportToPngHandler }
            disabled={ props.disabledExport }
        >
            export<br />to<br />png
        </button>;
    if (props.pngLoading) {
        exportPng = <button className="tool button"><div id="load"></div></button>;
    }
    else if (props.pngLink) {
        let date = new Date();
        exportPng =
            <button className="tool button">
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
            <div className="dimension" key={ 'dimension' + dimension }>
                <span className="label">{ dimension }</span>
                <input
                    type="number" name={ dimension }
                    className={
                        'input ' + 
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
        <div id="tools">
            <button className="tool button" onClick={ props.resetImageHandler }>
                new<br />image
            </button>
            { exportPng }
            <div className="tool picker">
                <CompactPicker
                    color={ props.currentColor }
                    onChangeComplete={ props.setCurrentColorHandler }
                />
            </div>
            <div className="tool dimensions">
                { dimensions }
            </div>
            <div className="mini-button-group">
                <button className="tool mini" onClick={ props.presetImageHandler.bind(this, 'mesh') }>mesh</button><br />
                <button className="tool mini" onClick={ props.presetImageHandler.bind(this, 'man') }>man</button><br />
                <button className="tool mini" onClick={ props.presetImageHandler.bind(this, 'rainbow') }>rainbow</button><br />
                <button className="tool mini" onClick={ props.presetImageHandler.bind(this, 'todo') }>todo</button>
            </div>
        </div>
    );
}

export default Tools;