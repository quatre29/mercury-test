import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../constants/styles";

const Recept = ({ basket }) => {
  return (
    <View style={styles.receptContainer}>
      <View style={styles.itemsContainer}>
        {basket.items.map((item) => (
          <View key={item.optionId} style={styles.item}>
            <Text>{item.title}</Text>
            <Text>{item.price}</Text>
          </View>
        ))}
      </View>
      <View style={styles.totalItem}>
        <Text>Total</Text>
        <Text>{basket.items.reduce((acc, { price }) => acc + price, 0)}</Text>
      </View>
    </View>
  );
};

export default Recept;

const styles = StyleSheet.create({
  container: { padding: 20 },
  receptContainer: {
    borderWidth: 1,
    borderColor: Colors.primary800,
    padding: 5,
  },
  itemsContainer: {
    marginBottom: 15,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  totalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
