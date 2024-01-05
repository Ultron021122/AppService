/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Login from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import VisitFormScreen from './screens/VisitFormScreen';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Visitantes CUCEI',
            headerStyle: { backgroundColor: '#4CAF50' },
            headerTitleStyle: {color: "#ffffff"},
          }}
        />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Visitantes',
            headerStyle: { backgroundColor: '#4CAF50' },
            headerTitleStyle: { color: '#fff' },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("VisitFormScreen")}>
                <Text style={{ color: '#ffffff', marginRight: 20, fontSize: 15 }} >Nuevo</Text>
              </TouchableOpacity>
            )
          })}
        />
        <Stack.Screen
          name='VisitFormScreen'
          component={VisitFormScreen}
          options={{
            title: 'Agregar visitante',
            headerStyle: { backgroundColor: '#222f3e' },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
