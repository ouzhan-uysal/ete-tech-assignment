import { FC, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IAuthContext, IAuthContextProvider } from "../types/auth.interface";
import { IUser } from "../types/auth.interface";
import Cookies from "js-cookie";
import useApollo from "../hooks/useApollo";
import { useAppDispatch } from "../redux/store";
import { setState } from "../redux/features/companies";
import { ICompany } from "../types/company.interface";

const AuthContext = createContext<IAuthContext>({
  user: null,
  handleLogin: (user: IUser) => { },
  handleLogout: () => { },
});

export const AuthContextProvider: FC<IAuthContextProvider> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const { QueryRequest } = useApollo();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleFetchCompanies = useCallback(async () => {
    await QueryRequest(`query {
      getMyCompanies{_id name legalNo incorporationCountry website createdAt}
    }`).then(res => {
      if (res.data.getMyCompanies) {
        dispatch(setState(
          res.data.getMyCompanies.map((elm: ICompany) => ({
            _id: elm._id,
            name: elm.name,
            legalNo: elm.legalNo,
            incorporationCountry: elm.incorporationCountry,
            website: elm.website,
            createdAt: elm.createdAt,
          }))
        ))
      }
    }).catch(err => console.error("getMyCompanies err: ", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (user: IUser) => {
    setUser(user);
    Cookies.set("ete-token", user.access_token);
    navigate('/home');
  };

  const handleLogout = () => {
    setUser(null);
    Cookies.remove("ete-token");
    navigate('/');
  };

  const handleCheckUser = useCallback(async () => {
    const jwt = Cookies.get('ete-token');
    if (user) {
      handleFetchCompanies();
      Cookies.set('ete-token', user.access_token);
    } else if (jwt && jwt !== 'undefined') {
      await QueryRequest(`query {
      	jwtCheck {
      		_id
      		username
      		email
      	}
      }`)
        .then(async (res) => {
          // console.log('jwtCheck res: ', res);
          const result = res.data.jwtCheck;
          if (result) {
            setUser({
              email: result.email,
              fullName: result.username,
              access_token: jwt
            });
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
