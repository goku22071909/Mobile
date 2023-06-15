import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/MainScreen';
import Setting from '../screens/Setting';
import Icon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

const ScreenOptions = ({route}) => ({
    headerShown: false,
    tabBarActiveTintColor: '#FFCC99',
})

const UITab = () => {
    return <Tab.Navigator screenOptions={ScreenOptions}>
        <Tab.Screen name='Main' component={MainScreen} options={{
            tabBarIcon: ({ color, size }) => (
                <Icon name="send" color={color} size={size} />
              ),
        }}/>
        <Tab.Screen name='Search' component={Setting} options={{
            tabBarIcon: ({ color, size }) => (
                <Icon name="search" color={color} size={size} />
              ),
        }} />
    </Tab.Navigator>
}

export default UITab;