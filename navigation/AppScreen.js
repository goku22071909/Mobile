import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import UITab from './UITab';
import Details from '../component/Setting_Component/Details';
import Setting from '../screens/Setting';

const Stack = createNativeStackNavigator();

const AppScreen = (props) => {

    return <NavigationContainer>
        <Stack.Navigator initialRouteName='UITab' screenOptions={{headerShown: false}}>
            <Stack.Screen name='UITab' component={UITab} />
            <Stack.Screen name='Setting' component={Setting} />
            <Stack.Screen name='Details' component={Details} />
        </Stack.Navigator>
    </NavigationContainer>
  
}

export default AppScreen;