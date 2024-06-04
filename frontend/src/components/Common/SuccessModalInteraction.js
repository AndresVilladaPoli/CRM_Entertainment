import PropTypes from 'prop-types';
import React from "react";
import { Modal, ModalBody } from "reactstrap";

const SuccessModalInteraction = ({ show, onCloseClick }) => {
  return (
    <Modal size="sm" isOpen={show} toggle={onCloseClick} centered={true}>
      <div className="modal-content">
        <ModalBody className="px-4 py-5 text-center">
          <button type="button" onClick={onCloseClick} className="btn-close position-absolute end-0 top-0 m-3"></button>
          <div className="avatar-sm mb-4 mx-auto">
            <div className="avatar-title bg-primary text-primary bg-opacity-10 font-size-20 rounded-3">
              <i className="mdi mdi-check-circle-outline"></i>
            </div>
          </div>
          <p className="text-muted font-size-16 mb-4">Interaction was added successfully!</p>

          <div className="hstack gap-2 justify-content-center mb-0">
            <button type="button" className="btn btn-secondary" onClick={onCloseClick}>Close</button>
          </div>
        </ModalBody>
      </div>
    </Modal>
  );
}

SuccessModalInteraction.propTypes = {
  onCloseClick: PropTypes.func,
  show: PropTypes.any
}

export default SuccessModalInteraction;