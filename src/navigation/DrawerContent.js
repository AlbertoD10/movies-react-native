import React, {useState} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

export default function DrawerContent(props) {
  const {navigation} = props;
  const [screen, setScreen] = useState('Home');

  const onChangeScreen = (name) => {
    setScreen(name);
    navigation.navigate(name);
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Home"
        onPress={() => onChangeScreen('Home')}
        focused={screen === 'Home'}
      />
      <DrawerItem
        label="Popular"
        onPress={() => onChangeScreen('Popular')}
        focused={screen === 'Popular'}
      />
    </DrawerContentScrollView>
  );
}
