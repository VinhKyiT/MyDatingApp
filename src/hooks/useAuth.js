import React, { createContext, useContext } from 'react';
import { authorize } from 'react-native-app-auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const signInWithGoogle = async () => {
    // const config = {
    //   issuer: 'https://accounts.google.com',
    //   iosClientId:
    //     '696534455324-7fn16cjgbd1kdb7s3t097foj3jttb2s0.apps.googleusercontent.com',
    //   clientId:
    //     '696534455324-6s4tgsvsrsgama298bph1g3ltmegkca6.apps.googleusercontent.com',
    //   scopes: ['profile', 'email'],
    //   redirectUrl:
    //     'com.googleusercontent.apps.696534455324-6s4tgsvsrsgama298bph1g3ltmegkca6:/oauth2redirect',
    //   permissions: ['public_profile', 'email', 'gender', 'location'],
    // };

    const config = {
      issuer: 'https://accounts.google.com',
      clientId:
        '696534455324-7fn16cjgbd1kdb7s3t097foj3jttb2s0.apps.googleusercontent.com',
      redirectUrl:
        'com.googleusercontent.apps.696534455324-7fn16cjgbd1kdb7s3t097foj3jttb2s0:/oauth2redirect/google',
      scopes: ['openid', 'profile'],
    };

    try {
      const result = await authorize(config);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user: null, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
