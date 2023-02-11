import axios from "axios";

const ROOT_URL =
  "https://mercury-f9249-default-rtdb.europe-west1.firebasedatabase.app/";

export async function storeOrder(orderData) {
  const res = await axios.post(`${ROOT_URL}/orders.json`, orderData);

  // console.log(res, "===");
}
