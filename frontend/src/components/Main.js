// import avatar from '../images/Photo-content/Avatar.jpg';
import { useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {

  const { onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardDelete, onCardLike, cards } = props

  // Подписываемся на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  const cardComponents = cards.map((card) => (
    <Card
      key={card._id}
      card={card}
      onClick={onCardClick}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
    />
  ));

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-button"
          onClick={onEditAvatar}
        >
          <img
            src={currentUser.avatar}
            alt="Аватарка"
            className="profile__avatar"
          />
        </button>
        <div className="profile__info">
          <div className="profile__name-edit-button">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="button profile__edit-button"
              type="button"
              onClick={onEditProfile}
              aria-label="Редактировать"
            />
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="button profile__add-button"
          aria-label="Добавить"
          onClick={onAddPlace}
        />
      </section>

      <section className="elements">
        <ul className="elements-list">{cardComponents}</ul>
      </section>

    </main>
  )
}

export default Main;