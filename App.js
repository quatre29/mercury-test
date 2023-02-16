import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import ClientOrderStatusScreen from "./screens/ClientOrderStatusScreen";
import ClientScreen from "./screens/ClientScreen";
import POSOrderScreen from "./screens/POSOrdersScreen";
import POSScreen from "./screens/POSScreen";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Alert, Platform } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "Permission required",
          "Grant permission for push notification"
        );
        return;
      }

      const tokenData = await Notifications.getExpoPushTokenAsync();

      console.log(tokenData, "---");

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.HIGH,
        });
      }
    }

    configurePushNotifications();
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="POSScreen" component={POSScreen} />
          <Stack.Screen name="ClientScreen" component={ClientScreen} />
          <Stack.Screen name="POSOrderScreen" component={POSOrderScreen} />
          <Stack.Screen
            name="ClientOrderStatusScreen"
            component={ClientOrderStatusScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
