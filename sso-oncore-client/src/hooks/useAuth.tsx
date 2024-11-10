import { useAuth0, User } from '@auth0/auth0-react';

export interface IAuth0User extends User {
  app_user_type: number;
}

const useAuth = () => {
  const { logout, user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0<IAuth0User>();

  return {
    logout: () => logout({ logoutParams: { returnTo: window.location.origin } }),
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
  };
};

export default useAuth;
export type AuthContext = ReturnType<typeof useAuth>;
