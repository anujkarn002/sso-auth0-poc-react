import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Auth0Provider } from "@auth0/auth0-react";
import useAuth from "./hooks/useAuth";

function InternalApp() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth();

  const handleLogin = () => {
    loginWithRedirect({
      // return to original intended route after login
      appState: { returnTo: window.location.href },
      authorizationParams: {
        screen_hint: "login",
        connection: "Username-Password-Authentication",
      },
    });
  };

  const handleLoginWithOncore = () => {
    loginWithRedirect({
      // return to original intended route after login
      appState: { returnTo: window.location.href },
      authorizationParams: {
        screen_hint: "login",
        connection: "oncore-web-openid",
      },
    });
  };

  const handleSignup = () => {
    loginWithRedirect({
      //return to original intended route after login
      appState: { returnTo: window.location.href },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Upplft SSO</h1>
      <div className="card">
        {!isAuthenticated && (
          <div className="flex space-x-2">
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLoginWithOncore}>Login with Oncore</button>
            <button onClick={handleSignup}>Sign Up</button>
          </div>
        )}
        {isAuthenticated && (
          <div>
            <button onClick={handleLogout}>Logout</button>
            <p>
              <a href="http://localhost:3001" target="_blank">View Placement</a>
            </p>
            <p>
              Your email address is <code>{user?.email}</code>
            </p>
          </div>
        )}
      </div>
      {!isAuthenticated && (
        <p className="read-the-docs">
          You're not authenticated, click the login button to authenticate.
        </p>
      )}
    </>
  );
}

type Auth0HocProps = {
  children: React.ReactNode;
};

const Auth0Hoc: React.FC<Auth0HocProps> = ({ children }) => {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        scope: "openid profile email",
      }}
      useRefreshTokens
      cacheLocation="localstorage" // save tokens in local storage
      onRedirectCallback={(appState) => {
        if (appState?.returnTo) {
          window.location.replace(appState.returnTo);
        }
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default function App() {
  return (
    <Auth0Hoc>
      <InternalApp />
    </Auth0Hoc>
  );
}
