import { useContext, createContext, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CURRENT_USER } from '../../gql/UserQueries';
import { LOGIN, SIGNUP } from '../../gql/AuthMutations';

interface Context {
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    phoneNumber: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<Context>(null);

export const useAuth = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }): JSX.Element => {
  const { refetch, data } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'network-only',
  });
  const [loginMutation] = useMutation(LOGIN);
  const [signupMutation] = useMutation(SIGNUP);

  const login = useCallback((email: string, password: string) => {
    return loginMutation({
      variables: {
        email,
        password,
      },
    }).then(
      (res) => {
        if (res.data.login.error) {
          return Promise.reject(res.data.login.error);
        }
        refetch();
        localStorage.setItem('token', res.data.login.token);
        return Promise.resolve();
      },
      (err) => {
        return Promise.reject(err.toString());
      }
    );
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    refetch();
  }, []);

  const signup = useCallback(
    (email: string, phoneNumber: string, password: string) => {
      return signupMutation({
        variables: {
          email,
          phoneNumber,
          password,
        },
      }).then(
        (res) => {
          if (res.data.signup.error) {
            return Promise.reject(res.data.signup.error);
          }
          refetch();
          localStorage.setItem('token', res.data.signup.token);
          return Promise.resolve();
        },
        (err) => {
          return Promise.reject(err.toString());
        }
      );
    },
    []
  );

  return (
    <UserContext.Provider
      value={{ user: data ? data.user : null, login, logout, signup }}>
      {children}
    </UserContext.Provider>
  );
};
