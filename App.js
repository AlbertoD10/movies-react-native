import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import ThemeContext from './src/context/ThemeContext';

//To combine the themes in ReactNativePaper and ReactNavigation in one..
const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
  },
};
let CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
};

CombinedDarkTheme.colors.primary = '#1ae1f2';
CombinedDarkTheme.colors.accent = '#1ae1f2';
CombinedDarkTheme.colors.background = '#192734';
CombinedDarkTheme.colors.card = '#15212b';
CombinedDarkTheme.colors.surface = '#192734';

function App() {
  const [theme, setTheme] = useState('light');
  const value = {theme, setTheme};

  let preference =
    value.theme === 'light' ? CombinedDefaultTheme : CombinedDarkTheme;

  return (
    <ThemeContext.Provider value={value}>
      <PaperProvider theme={preference}>
        <StatusBar
          barStyle={theme === 'dark' ? 'dark-content' : 'light-content'}
        />
        <NavigationContainer theme={preference}>
          <Navigation />
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}

export default App;
