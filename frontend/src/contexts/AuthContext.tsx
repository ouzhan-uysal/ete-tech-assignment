import { FC, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IAuthContext, IAuthContextProvider } from "../types/auth.interface";
import { IUser } from "../types/auth.interface";
import Cookies from "js-cookie";

const AuthContext = createContext<IAuthContext>({
  user: null,
  handleLogin: (user: IUser) => { },
  handleLogout: () => { },
});

export const AuthContextProvider: FC<IAuthContextProvider> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>({
    email: "xx",
    fullName: "yy"
  });
  const navigate = useNavigate();


  const handleLogin = async (user: IUser) => {
    setUser(user);
    navigate('/home');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleCheckUser = useCallback(async () => {
    const storegedToken = Cookies.get('ete-token');
    if (user) {
      // Cookies.set('ete-token', user.access_token);
    } else if (storegedToken && storegedToken !== 'undefined') {
      // await QueryRequest(`query {
      // 	jwtCheck {
      // 		_id
      // 		username
      // 		email
      // 		createdAt
      // 		password
      // 		accountLevel
      // 		type
      // 		image
      // 		walletIds
      // 	}
      // }`)
      //   .then(async (res) => {
      //     // console.log('jwtCheck res: ', res);
      //     const result = res.data.jwtCheck;
      //     if (result) {
      //       setUser({ ...result, access_token: storagedRefreshToken });
      //       const { data } = await QueryRequest(`query {getAllNetworks{name}}`);
      //       data && setNetworks(data.getAllNetworks);
      //     }
      //     // instance.defaults.headers.common[
      //     // 	'authorization'
      //     // ] = `${res.data.access_token}`;
      //   })
      //   .catch((err) => {
      //     console.error('jwtCheck err: ', err);
      //     handleLogout();
      //   });
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
