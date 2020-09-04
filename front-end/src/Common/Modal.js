import React from 'react';

export const ModalBox = (props) => {
  const { heading, message, closeModal, updateModalData, taskIdModal, taskTypeMultipleItem } = props;
  return (
    <div className="modal">
      <div className="modal-dialog">
        <div className="modal-header">
          <h3 className="modal-title">{heading}</h3>
        </div>
        <div className="modal-body">
          {message && <div className="modal-message">{message}</div>}
          {props.children}
          <div style={{ margin: '1rem 0' }}>
            <button
              type="button"
              onClick={() => updateModalData(taskIdModal)}
              className="button yellow"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => closeModal()}
              className="button red"
              style={{ marginLeft: '0.5rem' }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}