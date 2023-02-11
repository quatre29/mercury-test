import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Button from "../components/UI/Button";
import FoodOption from "../components/FoodOption";
import { Menu } from "../db/menu";

const ClientScreen = ({ navigation }) => {
  const [optionsSelected, setOptionsSelected] = useState([]);

  function order() {
    if (optionsSelected.length < 1) {
      Alert.alert("Basket empty!", "Please select one or more options");
      return;
    }

    navigation.navigate("ClientOrderStatusScreen", {
      order: {
        items: optionsSelected,
        status: "processing",
      },
    });
  }

  function selectOption(optionId) {
    setOptionsSelected((prevSelected) => {
      const selected = [...prevSelected];
      if (!prevSelected.includes(optionId)) {
        selected.push(optionId);
      } else {
        return selected.filter((selection) => selection !== optionId);
      }
      return selected;
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        <FlatList
          data={Menu}
          keyExtractor={(item) => item.optionId}
          renderItem={({ item }) => (
            <FoodOption
              style={styles.option}
              imageUri={item.image}
              imageStyle={styles.image}
              price={item.price}
              onPress={selectOption}
              selected={optionsSelected.includes(item.optionId)}
              id={item.optionId}
            >
              {item.title}
            </FoodOption>
          )}
        />
      </View>
      <View>
        <Button onPress={order}>Order</Button>
      </View>
    </View>
  );
};

export default ClientScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  optionsContainer: {},
  option: {
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
});
