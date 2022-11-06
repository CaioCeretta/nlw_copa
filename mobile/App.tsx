
import { StyleSheet, View } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold} from '@expo-google-fonts/roboto'

import { NativeBaseProvider, StatusBar } from 'native-base'


import {Polls} from './src/screens/Polls';
import { Loading } from './src/components/Loading'
import { AuthContextProvider } from './src/contexts/AuthContext';

import { THEME } from './src/styles/theme';
import { NewPoll } from './src/screens/New';
import { Find } from './src/screens/Find';
import { SignIn } from './src/screens/SignIn';
import { Routes } from './src/routes';

export default function App() {

  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_500Medium, Roboto_700Bold})

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      { fontsLoaded ? <Routes /> : <Loading /> }
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
