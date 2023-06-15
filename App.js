import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppScreen from './navigation/AppScreen';
import AppProvider from './provider/AppProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  // return (
    
  //   <AppProvider>
  //     <AppScreen />
  //   </AppProvider>
  // );
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <AppScreen />
      </AppProvider>
    </GestureHandlerRootView>
  );
}

