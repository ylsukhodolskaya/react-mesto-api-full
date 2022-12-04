import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditAvatarPopup(props) {

  const { isOpen, onClose, onUpdateAvatar } = props;
  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  const avatarRef = React.useRef(currentUser.avatar);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      textsubmit="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          type="url"
          className="popup__input popup__input_type_link"
          name="avatar"
          id="input-avatar"
          placeholder="Ссылка на картинку"
          required=""
          ref={avatarRef}
        />
        <span className="input-avatar-error" />
      </label>
    </PopupWithForm>
  )
}