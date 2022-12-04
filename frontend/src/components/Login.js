import PageWithForm from "./PageWithForm.js";

function Login(props) {

  return (
    <PageWithForm
      onSubmit={props.onLogin}
      buttonText="Вход"
      title="Войти"
      isRegister={false}
    />
  )
}

export default Login;