import { StyleSheet, Text, View, Switch } from 'react-native';
import React, {useState} from 'react';
import { Button } from 'react-native';

export default function Toggle(props) {
  const [isToggleOn, setToggleOn] = useState(true);

  function handleClick() {
    setToggleOn(!isToggleOn);
    if (isToggleOn) {
      props.start();
    }
    else {
      props.stop();
    }
  }

  return (
    <View style={StyleSheet.container}>
        <Button onPress={handleClick} color="#B23CC5" 
          title={isToggleOn ? 'Aloita juoksu' : 'Lopeta juoksu'}>
        </Button>
    </View>
  );
}