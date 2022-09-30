import React from "react";
import InfoTooltip from "./InfoTooltip";
import SuccessDownloadPath from "./../images/Success.svg";

const SuccessRegistrationPopup = (props) => {
  return (
    <InfoTooltip
      name="success-registration"
      onClose="fail-registration-close"
      isOpen={props.isOpen}
      closeAllPopups={props.onClose}
    >
      <img
        className="popup__image-event"
        src={SuccessDownloadPath}
        alt="Success Registration"
      />
      <p className="popup__event-message">Great, registration success!</p>
    </InfoTooltip>
  );
};

export default SuccessRegistrationPopup;
