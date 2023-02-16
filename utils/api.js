import axios from "axios";
import { CLIENT_TOKEN_ID, POS_TOKEN_ID } from "../constants/general";

const ROOT_URL =
  "https://mercury-f9249-default-rtdb.europe-west1.firebasedatabase.app/";

const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";

export async function storeOrder(orderData) {
  const res = await axios.post(`${ROOT_URL}/orders.json`, orderData);

  return res.data;
  // console.log(res, "===");
}

export async function sendPushNotificationForOrder(nameId) {
  await axios.post(EXPO_PUSH_URL, {
    to: POS_TOKEN_ID,
    title: "New Oder",
    body: "New order incoming!!",
    data: {
      nameId,
    },
  });
}

export async function sendPushNotificationForClientOrderStatus(status) {
  await axios.post(EXPO_PUSH_URL, {
    to: CLIENT_TOKEN_ID,
    title: `Order has been ${status}`,
    body: `Your order has been ${status}!`,
    data: {
      status,
    },
  });
}

export async function fetchOrderByNameId(nameId) {
  const order = await axios.get(`${ROOT_URL}orders/${nameId}.json`);

  return order.data;
}

export async function fetchOrders() {
  const orders = await axios.get(`${ROOT_URL}orders.json`);

  const acceptedOrders = [];

  for (const key in orders.data) {
    if (orders.data[key].status === "accepted") {
      acceptedOrders.push(orders.data[key]);
    }
  }
  return acceptedOrders;
}

export async function updateOrder(nameId, updatedOrder) {
  await axios.put(`${ROOT_URL}orders/${nameId}.json`, updatedOrder);
}
