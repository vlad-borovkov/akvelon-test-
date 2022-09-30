import React from "react";

const ImagePopup = (props) => {
  return (
    <div
      className={`popup popup_type_gallery ${props.isOpen ? "popup_on" : ""}`}
    >
      <div className="popup__gallery-container">
        <button
          className="popup__gallery-close-icone"
          type="button"
          onClick={props.closePopup}
        ></button>
        <div className="popup__info-container">
          <img
            className="popup__gallery-image"
            src={props.clickedCard.avatar}
            alt={props.clickedCard.first_name}
          />
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <b>First name</b>
                </td>
                <td>
                  <b>Second name</b>
                </td>
                <td>
                  <b>E-mail</b>
                </td>
              </tr>
              <tr>
                <td>{props.clickedCard.first_name}</td>
                <td>{props.clickedCard.last_name}</td>
                <td>{props.clickedCard.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;
