import { Tabs } from 'expo-router';
import TabBar from '../components/tabBar/TabBar';
import ToastManager from 'toastify-react-native';


export default function TabLayout() {

  return (
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
  );
}
