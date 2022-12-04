import Done from "../images/Done.svg";
import Oops from "../images/Oops.svg"

function InfoTooltip(props) {

  const { isSuccess, onClose, isOpen } = props
  const icon = isSuccess ? Done : Oops;
  const message = isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'
  return (
    <main className="content">
      <div className={`popup ${isOpen && 'popup_opened'}`}>
        <div className="popup__container">
          <button type="button" className="button popup__close-button " onClick={onClose}></button>
          <form className="popup__form form" >
            <img src={icon} className="popup__tooltip" />
            <h2 className="popup__title">{message}</h2>
          </form>
        </div>
      </div>
    </main>
  )
}

export default InfoTooltip;