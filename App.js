import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StyleSheet from './Styles';
import Map from './Map';
import Home from './Home'

export default function App() {
  const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name = "Home"
          component={Home}
          options={{
            title: 'Home',
            headerTitle: 'Home',
          }}
        />
        <Stack.Screen
          name = "Map"
          component={Map}
          options={{
            title: 'Map',
            headerTitle: 'Map',
          }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}