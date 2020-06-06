import React from 'react';

import { MdNotificationsNone, MdClear } from 'react-icons/md';
import './TimerNotification.css'

interface TimerNotificationProps {
  message: string,
  onDismiss: React.MouseEventHandler
}

const TimerNotification = (props: TimerNotificationProps) => (
  <div className='timerNotification'>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <div className='timerNotificationIcon'>
        <MdNotificationsNone size='1.5em'/>
      </div>
      {props.message}
    </div>
    <div onClick={props.onDismiss}>
      <MdClear size='1.5em'/>
    </div>
  </div>
)
export default TimerNotification;