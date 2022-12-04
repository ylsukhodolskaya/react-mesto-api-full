import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {

  const { card, onClick, onCardLike, onCardDelete } = props;
  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? 'element__delete-button' : ''}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `button element__like-button ${isLiked ? 'element__like-button_active' : ''}`;

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <li className="element">
      <img className="element__image" alt={card.name} src={card.link} onClick={() => onClick(card)} />
      {isOwn && <button className={cardDeleteButtonClassName} onClick={() => handleDeleteClick()} type="button" />}
      <div className="element__name">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button className={cardLikeButtonClassName} onClick={() => handleLikeClick()} type="button" />
          <h3 className="element__like-counter">{card.likes.length}</h3>
        </div>
      </div>
    </li>
  )
}

export default Card;