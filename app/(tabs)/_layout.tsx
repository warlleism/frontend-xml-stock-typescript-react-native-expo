import { Tabs } from 'expo-router';
import TabBar from '../components/tabBar/TabBar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TabLayout() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          animation: 'shift',
        }}
        tabBar={props => <TabBar {...props} />}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="formulario" />
        <Tabs.Screen name="settings" />
      </Tabs>
    </GestureHandlerRootView>
  );
}
