import React from 'react';
import { CompactPicker } from 'react-color';

const Tools = (props) => {
    let exportPng = <span>export<br />to<br />png</span>;
    if (props.pngLink) {
      exportPng = <a href={ props.pngLink } download="my.png">donwload png</a>;
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