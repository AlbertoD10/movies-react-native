import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Popular from '../screens/Popular';
import Movie from '../screens/Movie';
import News from '../screens/News';
import {IconButton} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const Stack = createStackNavigator();

export default function StackNavigation(props) {
  const {navigation} = props;

  const rightButton = () => {
    return (
      <IconButton
        icon="magnify"
        onPress={() => alert('This is a busqueda!')}
        color="black"
      />
    );
  };

  const leftButton = () => {
    return (
      <IconButton
        icon="menu"
        onPress={() => navigation.openDrawer()}
        color="black"
      />
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        style={styles.title}
        name="Home"
        component={Home}
        options={{
          headerTitle: 'Movies Apps',
          headerTitleAlign: 'center',
          headerRight: () => rightButton(),
          headerLeft: () => leftButton(),
        }}
      />
      <Stack.Screen
        name="News"
        component={News}
        options={{
          headerTitle: 'Próximas películas',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Movie"
        component={Movie}
        options={{
          title: false,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Popular"
        component={Popular}
        options={{headerTitle: 'Películas populares'}}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  icons: {},
  title: {
    justifyContent: 'center',
    color: 'white',
  },
});
