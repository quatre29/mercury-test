import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Order from "../components/Order";
import * as Notifications from "expo-notifications";

const POSScreen = ({ navigation }) => {
  const [newOrder, setNewOrder] = useState(false);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("NOTIFICATION RECEIVED");
        console.log(notification);
      }
    );
    return () => {
      subscription.remove();
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Orders",
    });
  }, [navigation]);

  function Press() {}

  return (
    <View style={styles.container}>
      <Order orderNo={1} onPress={Press} />
      <Order orderNo={2} onPress={Press} />
      <Order orderNo={3} onPress={Press} />
      <Order orderNo={4} onPress={Press} />
    </View>
  );
};

export default POSScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
