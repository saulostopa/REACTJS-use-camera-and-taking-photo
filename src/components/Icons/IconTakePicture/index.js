import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import './../styles.css';

export const IconTakePicture = () => (
    <div style={{
        "border": "1px solid",
        "width": "150px",
        // "marginLeft": "400px",
        "opacity": "0.5",
        "display": "flex",
        "height": "38px",
        "padding": "0 10px",
        "WebkitBoxPack": "center",
        "justifyContent": "center",
        "flexWrap": "nowrap",
        "WebkitBoxAlign": "center",
        "alignItems": "center",
        "borderRadius": "8px",
        "backgroundColor": "#f85731",
        "color": "#fff",
        "fontSize": "14px",
        "lineHeight": "24px",
        "fontWeight": "600"
      }}>
        Take Picture
    </div>
    // <FontAwesomeIcon className='btnTakePicture' icon={faCircle} />
)