import React, {useState, useContext} from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {StyleSheet, View} from 'react-native';
import {Drawer, Switch, TouchableRipple, Text} from 'react-native-paper';
import ThemeContext from '../context/ThemeContext';

export default function DrawerContent(props) {
  const {navigation} = props;
  const [screen, setScreen] = useState('Home');
  const {setTheme} = useContext(ThemeContext);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onChangeScreen = (name) => {
    setScreen(name);
    navigation.navigate(name);
  };

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    if (!isSwitchOn) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Section title="TheMovieDB peliculas">
        <Drawer.Item
          icon="home"
          label="Home"
          onPress={() => onChangeScreen('Home')}
          active={screen === 'Home'}
        />
        <Drawer.Item
          icon="alert-decagram"
          label="Próximas películas"
          onPress={() => onChangeScreen('News')}
          active={screen === 'News'}
        />
        <Drawer.Item
          icon="star"
          label="Películas Populares"
          onPress={() => onChangeScreen('Popular')}
          active={screen === 'Popular'}
        />
      </Drawer.Section>
      <Drawer.Section title="Preferencias">
        <TouchableRipple
          onPress={() => {
            onToggleSwitch();
          }}>
          <View style={styles.preferences}>
            <Text>Modo oscuro</Text>
            <Switch value={isSwitchOn} />
          </View>
        </TouchableRipple>
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  preferences: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
