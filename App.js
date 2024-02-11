import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from 'react-native';


import TabNavigation from './src/stack/TabNavigation';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/stack/StackNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const SafeViewStyle = {
    flex: 1
  };

  return (
    <SafeAreaView style={SafeViewStyle}>
      <NavigationContainer>
        <StackNavigation/>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 
});

export default App;
