import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../constants/styles";

const Order = ({ orderNo, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.orderText}>Order: {orderNo}</Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  orderText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
