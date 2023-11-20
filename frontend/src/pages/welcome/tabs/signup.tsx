import { ChangeEvent, useReducer } from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "../../../components/custom/Button";
import CustomInput from "../../../components/custom/Input";
import { SignupActions, SignupReducer } from "../../../reducers/signup.reducer";
import { useAuth } from "../../../contexts/AuthContext";
import useApollo from "../../../hooks/useApollo";
import { jwtDecode } from "jwt-decode";

const SignupTab = () => {
  const { handleLogin } = useAuth();
  const { MutationRequest } = useApollo();
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
    await MutationRequest(`
      mutation { 
        signup(input: { username: "test", email: "test@gmail.com", password: "test" }) {
          access_token
        }
      }
    `).then(res => {
      if (res.data.signup.access_token) {
        const decodedJwt: any = jwtDecode(res.data.signup.access_token);
        if (typeof decodedJwt === 'object') {
          handleLogin({
            email: decodedJwt.email,
            fullName: decodedJwt.username,
            access_token: res.data.signup.access_token
          });
        }
      }
    }).catch(err => console.error("signup err: ", err));
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
