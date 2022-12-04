import PageWithForm from "./PageWithForm.js";

function Register(props) {

  return (
    <PageWithForm
      onSubmit={props.onRegister}
      buttonText="Зарегистрироваться"
      title="Регистрация"
      isRegister={true}
    />
  )
}

export default Register;