import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const { isOpen, onClose, onUpdateUser } = props;
  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  // Обработчик формы при submit
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      textsubmit="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          type="text"
          className="popup__input popup__input_type_name"
          name="name"
          id="input-name"
          placeholder="Имя"
          minLength={2}
          maxLength={40}
          required=""
          onChange={handleChangeName}
          value={name || ''}
        />
        <span className="input-name-error" />
      </label>
      <label className="popup__label">
        <input
          type="text"
          className="popup__input popup__input_type_description"
          name="about"
          id="input-about"
          placeholder="О себе"
          minLength={2}
          maxLength={200}
          onChange={handleChangeDescription}
          value={description || ''}
        />
        <span className="input-about-error" />
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup