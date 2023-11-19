import { ChangeEvent, useReducer } from "react";
import { ApiRequest } from "../../../api";
import CustomButton from "../../../components/custom/Button";
import CustomInput from "../../../components/custom/Input";
import { SignupActions, SignupReducer } from "../../../reducers/signup.reducer";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../contexts/AuthContext";

const SignupTab = () => {
  const { handleLogin } = useAuth();
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(SignupReducer, {
    email: "",
    password: "",
    fullName: "",
  })
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: SignupActions.SET_EMAIL,
      payload: {
        email: e.target.value
      }
    })
  }
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: SignupActions.SET_PASSWORD,
      payload: {
        password: e.target.value
      }
    })
  }
  const handleChangeFullName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: SignupActions.SET_FULLNAME,
      payload: {
        fullName: e.target.value
      }
    })
  }

  const handleRegister = async () => {
    await ApiRequest.signup({
      fullName: state.fullName,
      email: state.email,
      password: state.password
    }).then(res => {
      handleLogin({
        email: res.email,
        fullName: res.fullName,
      })
    }).catch(err => console.error(err));
  }

  return (
    <div className="welcome-container">
      <CustomInput
        placeholder={t('fullname') as string}
        value={state.fullName}
        onChange={handleChangeFullName}
      />
      <CustomInput
        placeholder={t('email') as string}
        value={state.email}
        onChange={handleChangeEmail}
      />
      <CustomInput
        placeholder={t('password') as string}
        type="password"
        value={state.password}
        onChange={handleChangePassword}
      />
      <CustomButton name={t('signup') as string} onClick={handleRegister} bgColor="#E42F63" />
    </div>
  )
}

export default SignupTab;
