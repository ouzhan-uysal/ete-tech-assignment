import { FC, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IAuthContext, IAuthContextProvider } from "../types/auth.interface";
import { IUser } from "../types/auth.interface";
import Cookies from "js-cookie";
import useApollo from "../hooks/useApollo";

const AuthContext = createContext<IAuthContext>({
  user: null,
  handleLogin: (user: IUser) => { },
  handleLogout: () => { },
});

export const AuthContextProvider: FC<IAuthContextProvider> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const { QueryRequest } = useApollo();
  const navigate = useNavigate();
  console.log("user: ", user);


  const handleLogin = async (user: IUser) => {
    setUser(user);
    Cookies.set("ete-token", user.access_token);
    navigate('/home');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleCheckUser = useCallback(async () => {
    const jwt = Cookies.get('ete-token');
    if (user) {
      Cookies.set('ete-token', user.access_token);
    } else if (jwt && jwt !== 'undefined') {
      await QueryRequest(`query {
      	jwtCheck {
      		_id
      		username
      		email
      		createdAt
      		password
      	}
      }`)
        .then(async (res) => {
          // console.log('jwtCheck res: ', res);
          const result = res.data.jwtCheck;
          if (result) {
            setUser({ ...result, access_token: jwt });
          }
          // instance.defaults.headers.common[
          // 	'authorization'
          // ] = `${res.data.access_token}`;
        })
        .catch((err) => {
          console.error('jwtCheck err: ', err);
          handleLogout();
        });
    } else {
      handleLogout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    handleCheckUser();
    return () => { };
  }, [handleCheckUser]);

  const value = useMemo(() => ({
    user, setUser, handleLogin, handleLogout
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth must be used within a AuthContextProvider!"
    );
  }
  return context;
};
