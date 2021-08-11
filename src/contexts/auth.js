import { createContext, useContext, useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  const auth = firebase.auth()
  auth.useEmulator("http://localhost:9099");

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setIsAuthenticated(true)
        setUser(authUser.uid)

        authUser.getIdToken().then((idToken) => {
          setToken(idToken)
        })
      } else {
        setIsAuthenticated(false)
        setUser(null)
      }
    })
  }, [auth])

  // Signup user
  const signup = (email, password) => {
    return new Promise(async (resolve, reject) => {
      if (email && password) {
        try {
          await auth.createUserWithEmailAndPassword(email, password)
          resolve()
        } catch (error) {
          reject(error)
        }
      } else {
        reject({
          message: 'Please provide email and password',
        })
      }
    })
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      signup,
      token,
    }}>
      { children }
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)