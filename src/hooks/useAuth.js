import React, { createContext, useContext, useState } from 'react';
import { authorize } from 'react-native-app-auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const signInWithGoogle = async () => {
    const iosConfig = {
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

    try {
      const result = await authorize(iosConfig);
      if (result) setUser(result);
      console.log({ result });
    } catch (error) {
      setError(error);
      console.log({ error });
    }
  };

  return (
    <AuthContext.Provider value={{ user: user, error, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
