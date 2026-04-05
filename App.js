import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { store } from './src/store';
import { ThemeProvider, ThemeContext } from './src/context/ThemeContext';
import DrawerNavigator from './src/navigation/DrawerNavigator';

import Toast from 'react-native-toast-message';

// A wrapper component to consume the theme context inside NavigationContainer
const MainApp = () => {
  const { isDarkMode } = useContext(ThemeContext);

  const customLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFFFFF',
      card: '#F3F4F6',
      text: '#1F2937',
      border: '#E5E7EB',
      primary: '#10B981',
    },
  };

  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#111827',
      card: '#1F2937',
      text: '#F9FAFB',
      border: '#374151',
      primary: '#10B981',
    },
  };

  return (
    <>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={isDarkMode ? '#111827' : '#FFFFFF'}/>
      <NavigationContainer theme={isDarkMode ? customDarkTheme : customLightTheme}>
        <DrawerNavigator />
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <MainApp />
      </ThemeProvider>
    </Provider>
  );
}
