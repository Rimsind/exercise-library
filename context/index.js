import { createContext, useContext, useReducer, useEffect } from "react";
import { authReducer } from "./authReducer";
import { parseCookies, destroyCookie } from "nookies";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const GlobalContext = createContext();

const initialState = {
  loading: false,
  token: null,
  user: null,
  error: null,
};
function decodeBase64Url(base64Url) {
  // Convert Base64Url to Base64
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  // Decode Base64 to a JSON string
  const jsonString = atob(base64);
  // Parse JSON string to an object
  return JSON.parse(jsonString);
}

function decodeJWT(jwt) {
  // Split the JWT into its parts
  const parts = jwt.split(".");

  if (parts.length !== 3) {
    throw new Error("Invalid JWT format");
  }

  // Decode the header and payload
  const header = decodeBase64Url(parts[0]);
  const payload = decodeBase64Url(parts[1]);

  return {
    header,
    payload,
  };
}

function isJWTExpired(jwt) {
  // Decode the JWT to extract the payload
  const decodedJWT = decodeJWT(jwt);

  // Get the current time in seconds (Unix time)
  const currentTime = Math.floor(Date.now() / 1000);

  // Extract the expiration time (exp) from the payload
  const expTimestamp = decodedJWT.payload.exp;

  // Check if the token has expired
  return currentTime > expTimestamp;
}

const GlobalProvider = ({ children }) => {
  const [auth, dispatchAuth] = useReducer(authReducer, initialState);
  const [profile, setProfile] = useState();

  const router = useRouter();

  const logOut = async () => {
    destroyCookie(null, "user");
    destroyCookie(null, "token");
    dispatchAuth({ type: "AUTH_RESET" });
    router.push("/");
  };

  useEffect(() => {
    dispatchAuth({ type: "AUTH_LOADING" });
    async function loadUserFromCookies() {
      const { token, user } = parseCookies();
      if (!!token && !!user) {
        auth.token = token;
        auth.user = JSON.parse(user);
        // check if token is valid
        try {
          const expired = isJWTExpired(token);
          if (expired) {
            destroyCookie(null, "user");
            destroyCookie(null, "token");
            dispatchAuth({ type: "AUTH_RESET" });
            router.push("/");
          } else {
            // if token valid
            dispatchAuth({
              type: "LOGIN_SUCCESS",
              payload: { token, user: auth.user },
            });
            setProfile(user);
          }
        } catch (error) {
          console.error("Error decoding JWT:", error.message);
        }
      } else {
        dispatchAuth({ type: "LOGIN_FAILED" });
      }
    }
    loadUserFromCookies();
  }, []);

  return (
    <GlobalContext.Provider value={{ auth, dispatchAuth, logOut, profile }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useAuth = () => useContext(GlobalContext);

export default GlobalProvider;
