import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {navigationRef} from './src/utils/helpers/RootNavigation';


import TabNavigation from './src/stack/TabNavigation';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import StackNavigation from './src/stack/StackNavigator';
import { Colors } from './src/constants/colors';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const theme = {
    dark: false,
    colors: {     
      background: Colors.black,
      text: 'rgb(255,255,255)',
      primary: Colors.red,
      card: Colors.black,
      border: 'rgb(255,255,255)',
      notification: Colors.red,
      placeholder:'rgb(255,255,255)',
    },
  };

  const SafeViewStyle = {
    flex: 1
  };

  return (
    <SafeAreaView style={SafeViewStyle}>
      <NavigationContainer ref={navigationRef} theme={theme}>
        <StackNavigation/>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 
});

export default App;
