import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Button from "../components/UI/Button";
import { Colors } from "../constants/styles";

const HomeScreen = ({ navigation }) => {
  function goToPosView() {
    navigation.navigate("POSScreen");
  }

  function goToClientView() {
    navigation.navigate("ClientScreen");
  }
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button
          buttonStyles={styles.buttonOverwrite}
          style={styles.button}
          onPress={goToPosView}
        >
          POS
        </Button>
        <Button
          buttonStyles={[styles.buttonOverwrite, styles.clientButton]}
          style={styles.button}
          onPress={goToClientView}
        >
          CLIENT
        </Button>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
    alignItems: "center",
    paddingVertical: 200,
  },
  buttons: {
    flex: 1,
    justifyContent: "space-around",
  },
  button: {
    minWidth: 120,
  },
  buttonOverwrite: {
    padding: 30,
  },
  clientButton: {
    backgroundColor: Colors.error500,
  },
});
