import { createContext, ReactNode, useState, useEffect, useInsertionEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarURL: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);


export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [isUserLoading, setIsUserLoading] = useState(false);
  
  const [req, res, promptAsync] = Google.useAuthRequest({
    clientId: '691377694434-9n10ut7s9pq54tocgbt68d2peb86p9ts.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true}),
    scopes: ['profile', 'email']
  })

  useEffect(() => {
    if(res?.type === 'success' && res.authentication?.accessToken) {
      signInWithGoogle(res.authentication.accessToken)
    }

  }, [res]);

  async function signIn() {
    try {
      setIsUserLoading(true);
      await promptAsync();


    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signInWithGoogle(access_token: string) {
    console.log('Authentication token ===> ', access_token);
  }


  return (
    <AuthContext.Provider value={{
      signIn,
      isUserLoading,
      user: {
        name: 'Caio',
        avatarURL: 'https://github.com/caioceretta.png'
      }
    }}>

    {children}
    </AuthContext.Provider>
  )
}