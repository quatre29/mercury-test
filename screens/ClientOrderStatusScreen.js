import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Menu } from "../db/menu";
import { Colors } from "../constants/styles";
import Recept from "../components/Recept";
import { storeOrder } from "../utils/api";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

const ClientOrderStatusScreen = ({ route }) => {
  const [basket, setBasket] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    const order = route.params?.order;
    const items = Menu.filter((item) => order.items.includes(item.optionId));
    const finalOrder = { items, status: order.status };
    setBasket(finalOrder);
    sendOrder(finalOrder);
    pushNotification(finalOrder);
  }, [route]);

  function pushNotification(order) {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "My first local notification",
        body: "This is the body",
        data: { order },
      },
      trigger: {
        seconds: 3,
      },
    });
  }

  async function sendOrder(order) {
    try {
      await storeOrder(order);
    } catch (error) {
      Alert.alert(
        "Something went wrong!",
        "Order could not be complete, please try again"
      );
      navigation.navigate("ClientScreen");
    }
  }

  let recept = <></>;

  if (basket?.items.length > 0) {
    recept = <Recept basket={basket} />;
  }

  return (
    <View style={styles.container}>
      {recept}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Order Status: </Text>
        <Text
          style={[
            styles.statusDynamicText,
            basket?.status === "processing" && styles.statusProcessing,
            basket?.status === "accepted" && styles.statusAccepted,
            basket?.status === "declined" && styles.statusDecline,
          ]}
        >
          {basket?.status}
        </Text>
      </View>
    </View>
  );
};

export default ClientOrderStatusScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  statusContainer: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-between",
  },
  statusText: { fontWeight: "bold" },
  statusDynamicText: { fontWeight: "bold" },
  statusAccepted: { color: "green" },
  statusDecline: { color: "red" },
  statusProcessing: { color: "gray" },
});
