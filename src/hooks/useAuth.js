import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { authorize } from 'react-native-app-auth';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from '@firebase/auth';
import { auth } from '../Firebase';
import { Platform } from 'react-native';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoadingInitial(false);
    });
    return () => unsub();
  }, []);

  const config = {
    issuer: 'https://accounts.google.com',
    clientId:
      '696534455324-7fn16cjgbd1kdb7s3t097foj3jttb2s0.apps.googleusercontent.com',
    redirectUrl:
      'com.googleusercontent.apps.696534455324-7fn16cjgbd1kdb7s3t097foj3jttb2s0:/oauth2redirect/google',
    scopes: ['openid', 'profile', 'email'],
  };

  const androidConfig = {
    issuer: 'https://accounts.google.com',
    clientId:
      '696534455324-e099g2i1mhgq9thmh8f3m0lcsksn52h1.apps.googleusercontent.com',
    redirectUrl:
      'com.googleusercontent.apps.696534455324-e099g2i1mhgq9thmh8f3m0lcsksn52h1:/oauth2redirect/google',
    scopes: ['openid', 'profile', 'email'],
  };
  const signInWithGoogle = async () => {
    setLoading(true);
    await authorize(config)
      .then(async res => {
        const { idToken, accessToken } = res;
        if (accessToken) {
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken,
          );
          await signInWithCredential(auth, credential);
        }
        return Promise.reject();
      })
      .catch(error => {
        setError({ ...error });
      })
      .finally(() => setLoading(false));
  };

  const logOut = () => {
    setLoading(true);
    signOut(auth).catch(error => setError({ ...error }));
    setLoading(false);
  };

  const memoedValue = useMemo(
    () => ({
      user,
      error,
      loading,
      signInWithGoogle,
      logOut,
    }),
    [user, loading, error],
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
