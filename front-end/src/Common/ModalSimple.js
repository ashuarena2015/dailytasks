import React from 'react';

export const ModalBoxSimple = (props) => {
  const { heading, message } = props;
  return (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-header">
          <h3 className="modal-title">{heading}</h3>
        </div>
        <div className="modal-body">
          {message && <div className="modal-message">{message}</div>}
          {props.children}
        </div>
      </div>
    </div>
  )
}