import {
  useEffect,
  useState,
  useContext,
  createContext,
  FunctionComponent,
} from "react";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "./initFirebase";
import { removeTokenCookie, setTokenCookie } from "./tokenCookies";

initFirebase();

interface IAuthContext {
  user: firebase.User | null;
  logout: () => void;
  authenticated: boolean;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  logout: () => null,
  authenticated: false,
})

// With provider components, you typically return something that wraps around 'children' - in this <AuthContext>

export const AuthProvider: FunctionComponent = ({ children }) => {

  const [user, setUser] = useState<firebase.User | null>(null)
  const router = useRouter()

  const logout = () => {
    firebase.auth().signOut().then(() => {
      router.push('/')
    }).catch((e) => {
      console.error(e)
    })
  }


  useEffect(() => {
    const cancelAuthListener = firebase.auth().onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setTokenCookie(token)
        setUser(user)
      } else {
        removeTokenCookie()
        setUser(null)
       }
    })
    
    return () => {
      cancelAuthListener()   // this is called when the component is unmounted.
    }
   }, [] )

  return <AuthContext.Provider value={{user, logout,authenticated: !!user}}>{children}</AuthContext.Provider>
}

// this function is going to give access to the context created above and this means that this will accessible anyywhere in the app.

export function useAuth() {
  return useContext(AuthContext)
}