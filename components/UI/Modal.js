import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

const App = ({ onAccept, onDecline, newOrder }) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (newOrder) {
      setModalVisible(true);
    }
  }, [newOrder, modalVisible]);

  function accept() {
    onAccept();
    setModalVisible(false);
  }

  function decline() {
    onDecline();
    setModalVisible(false);
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonAccept]}
              onPress={accept}
            >
              <Text style={styles.textStyle}>Accept</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonDecline]}
              onPress={decline}
            >
              <Text style={styles.textStyle}>Decline</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonAccept: {
    backgroundColor: "#F194FF",
  },
  buttonDecline: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
