import { ChangeEvent, useReducer } from "react";
import CustomButton from "../../../components/custom/Button";
import CustomInput from "../../../components/custom/Input";
import { SigninActions, SigninReducer } from "../../../reducers/signin.reducer";
import { useTranslation } from 'react-i18next';
import { useAuth } from "../../../contexts/AuthContext";
import useApollo from "../../../hooks/useApollo";
import { jwtDecode } from "jwt-decode";

const SigninTab = () => {
  const { t } = useTranslation();
  const { handleLogin } = useAuth();
  const { MutationRequest } = useApollo();
  const [state, dispatch] = useReducer(SigninReducer, {
    email: "",
    password: "",
  })
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: SigninActions.SET_EMAIL,
      payload: {
        email: e.target.value
      }
    })
  }
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: SigninActions.SET_PASSWORD,
      payload: {
        password: e.target.value
      }
    })
  }

  const handleLoginRequest = async () => {
    await MutationRequest(`
      mutation { 
        signin(input: { email: "${state.email}", password: "${state.password}" }) {
          access_token
        }
      }
    `).then(res => {
      if (res.data.signin.access_token) {
        const decodedJwt: any = jwtDecode(res.data.signin.access_token);
        if (typeof decodedJwt === 'object') {
          handleLogin({
            email: decodedJwt.email,
            fullName: decodedJwt.username,
            access_token: res.data.signin.access_token
          });
        }
      }
    }).catch(err => console.error("signin err: ", err));
  }

  return (
    <div className="welcome-container">
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
      <CustomButton
        name={t('signin') as string}
        onClick={handleLoginRequest}
        bgColor="#8DA642"
      />
    </div>
  )
}

export default SigninTab;
