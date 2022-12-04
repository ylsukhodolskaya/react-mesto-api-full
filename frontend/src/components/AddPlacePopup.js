import React from 'react';
import PopupWithForm from './PopupWithForm';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      textsubmit="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          type="text"
          className="popup__input popup__input_type_title"
          name="name"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          id="input-place-name"
          required=""
          value={name}
          onChange={handleNameChange}
        />
        <span className="input-place-name-error" />
      </label>
      <label className="popup__label">
        <input
          type="url"
          className="popup__input popup__input_type_link"
          name="link"
          id="input-link"
          placeholder="Ссылка на картинку"
          required=""
          value={link}
          onChange={handleLinkChange}
        />
        <span className="input-link-error" />
      </label>
    </PopupWithForm>
  );
};
