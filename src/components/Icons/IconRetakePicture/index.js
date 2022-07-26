import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import './../styles.css';

export const IconRetakePicture = () => (
    <FontAwesomeIcon className='btnTakePicture btnRetakePicture' icon={faRotateRight} />
)