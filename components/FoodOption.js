import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import { Colors } from "../constants/styles";

const FoodOption = ({
  style,
  onPress,
  children,
  selected,
  imageUri,
  imageStyle,
  price,
  id,
}) => {
  return (
    <View style={style}>
      <Pressable onPress={onPress.bind(this, id)}>
        <View
          style={[
            styles.option,
            selected && { backgroundColor: Colors.primary800 },
          ]}
        >
          <View>
            <Text style={[styles.optionText, selected && { color: "white" }]}>
              {children}
            </Text>
            <Text style={selected && { color: "white" }}>Price: £{price}</Text>
          </View>
          <Image style={imageStyle} source={imageUri} />
        </View>
      </Pressable>
    </View>
  );
};

export default FoodOption;

const styles = StyleSheet.create({
  option: {
    borderRadius: 4,
    backgroundColor: Colors.accent500,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
