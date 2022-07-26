import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import './../styles.css';

export const IconCloseCamera = () => (
    <FontAwesomeIcon className='btnCamera' icon={faXmarkCircle} />
)