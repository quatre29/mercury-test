import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Order from "../components/Order";
import * as Notifications from "expo-notifications";
import {
  fetchOrderByNameId,
  fetchOrders,
  sendPushNotificationForClientOrderStatus,
  updateOrder,
} from "../utils/api";
import ModalOrder from "../components/UI/ModalOrder";

const POSScreen = ({ navigation }) => {
  const [newOrder, setNewOrder] = useState(false);
  const [newOrderId, setNewOrderId] = useState();
  const [ordersAccepted, setOrdersAccepted] = useState([]);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        const orderId = notification.request.content.data.nameId;
        fetchOrderByNameId(orderId).then((res) => {
          console.log(res, "(((((((((((((((((((((((((");
          setNewOrder(res);
        });

        setNewOrderId(orderId);

        console.log("NOTIFICATION RECEIVED");
        console.log(notification.request.content.data);
      }
    );
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    fetchOrders().then((res) => {
      setOrdersAccepted(res);
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Orders",
    });
  }, [navigation]);

  function Press() {}

  function acceptOrder(orderNameId, currentOrder) {
    setOrdersAccepted((currentOrders) => [...currentOrders, currentOrder]);
    updateOrder(orderNameId, { ...currentOrder, status: "accepted" });
    sendPushNotificationForClientOrderStatus("accepted");
  }

  function declineOrder(orderNameId, currentOrder) {
    updateOrder(orderNameId, { ...currentOrder, status: "declined" });
    sendPushNotificationForClientOrderStatus("declined");
  }

  function resetNewOrder() {
    setNewOrder(false);
    setNewOrderId();
  }

  return (
    <>
      <View style={styles.container}>
        <Text>{newOrder && newOrder.items[0].title}</Text>
        {ordersAccepted &&
          ordersAccepted.map((order, index) => (
            <Order
              key={`${order.items[0].title}${index}`}
              order={order}
              orderNo={1}
              onPress={Press}
            />
          ))}
      </View>
      <ModalOrder
        onAccept={acceptOrder}
        onDecline={declineOrder}
        currentOrder={newOrder}
        currentOrderId={newOrderId}
        setNewOrderState={resetNewOrder}
      />
    </>
  );
};

export default POSScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
