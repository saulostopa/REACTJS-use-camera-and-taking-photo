import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import './../styles.css';

export const IconInstructions = () => (
    <div style={{
        "width": "290px",
        "opacity": "0.7",
        "display": "flex",
        "height": "50px",
        "padding": "0px 10px",
        "flexWrap": "nowrap",
        "alignItems": "center",
        "borderRadius": "8px",
        "backgroundColor": "rgb(65, 80, 119)",
        "color": "rgb(255, 255, 255)",
        "fontSize": "11px",
        "textAlign": "left"
      }}>
        Close the passenger's door and align the truck’s right side profile according to this illustration. Please fit the truck within these lines.
    </div>
    // <FontAwesomeIcon className='btnTakePicture' icon={faCircle} />
)