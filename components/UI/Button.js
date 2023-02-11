import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

import { Colors } from "../../constants/styles";

const Button = ({ children, onPress, style, buttonStyles, textColor }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, buttonStyles]}>
          <Text style={[styles.buttonText, textColor && { color: textColor }]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary400,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: Colors.primary200,
    borderRadius: 4,
  },
});
