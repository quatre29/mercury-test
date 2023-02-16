import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../constants/styles";

const Order = ({ order, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.orderText}>Status: {order.status}</Text>
        {order.items.map((item, index) => (
          <Text style={styles.orderText} key={`${item.title}${index}`}>
            {item.title}: {item.price}
          </Text>
        ))}
      </View>
    </Pressable>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    backgroundColor: Colors.accent500,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  orderText: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
  },
});
