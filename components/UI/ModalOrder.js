import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Colors } from "../../constants/styles";

const ModalOrder = ({
  onAccept,
  onDecline,
  currentOrder,
  setNewOrderState,
  currentOrderId,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (currentOrder) {
      setModalVisible(true);
    }
  }, [currentOrder, modalVisible]);

  function accept() {
    onAccept(currentOrderId, currentOrder);
    setModalVisible(false);
    setNewOrderState();
  }

  function decline() {
    onDecline(currentOrderId, currentOrder);
    setModalVisible(false);
    setNewOrderState();
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
            <Text style={styles.modalText}> New Order Incoming!!!</Text>
            <View style={styles.buttonContainer}>
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
        </View>
      </Modal>
    </View>
  );
};

export default ModalOrder;

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
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 20,
    padding: 30,
    margin: 10,
    elevation: 2,
  },
  buttonAccept: {
    backgroundColor: Colors.primary700,
  },
  buttonDecline: {
    backgroundColor: Colors.error500,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
