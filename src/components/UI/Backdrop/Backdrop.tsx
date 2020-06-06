import React from 'react';
import './Backdrop.css'

export interface backdropProps{
    click: React.MouseEventHandler,
    show: boolean,
}

const backdrop = (props: backdropProps) => (
    props.show? <div 
        className='Backdrop' 
        onClick={props.click}>
    </div> : null
);
export default backdrop;