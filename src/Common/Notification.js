import React from 'react';
import FlashMessage from 'react-flash-message';


export const Notification = (props) => {
  const { timeToHide, message, messageType } = props;
  const designRender = (message, messageType) => {
    return (
      <div className={`notification notification_${messageType}`}>
        <div className="notification__content">
            {message}
        </div>
      </div>
    )
  }
  return (
    timeToHide != 0 ? (
      <FlashMessage duration={timeToHide}>
        {designRender(message, messageType)}
      </FlashMessage>
    ) : (
      designRender(message, messageType)
    )
  )
}
