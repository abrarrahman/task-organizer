import React from 'react';
import './Modal.css';
import Backdrop from '../Backdrop/Backdrop'

interface ModalProps {
  show: boolean;
  dismissModal: React.MouseEventHandler,
  children: React.ReactNode,
}

const Modal = (props: ModalProps) => {
  return <>
    <Backdrop show={props.show} click={props.dismissModal} />
    <div
      className='Modal'
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}>
      {props.children}
    </div>
  </>
}
export default React.memo(Modal, (prevProps,nextProps)=>{
  return nextProps.show===prevProps.show && prevProps.children===nextProps.children;
});