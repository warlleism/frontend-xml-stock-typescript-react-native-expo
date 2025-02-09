import { Tabs } from 'expo-router';
import TabBar from '../components/tabBar/TabBar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ToastManager from 'toastify-react-native';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default function TabLayout() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
       <ToastManager
                width={width - 50}
                animationIn={"zoomIn"}
                animationOut={"zoomOut"}
                duration={2000}
            />
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
