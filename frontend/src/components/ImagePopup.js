import React from 'react';

const ImagePopup = (props) => {

  const { card, isOpen, onClose } = props;
  return (
    <div className={`popup popup_image ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_image">
        <button className="button popup__close-button button_close-image-popup" onClick={onClose} />
        <img className="popup__picture" src={card.link} alt={card.name} />
        <span className="popup__picture-title">{card.name}</span>
      </div>
    </div>
  )
}

export default ImagePopup;