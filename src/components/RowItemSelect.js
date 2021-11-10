import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


export const RowItemSelect = ({ onPress = () => { }, name, color }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.row]}>
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    //width:300,
    justifyContent: "center",
    paddingHorizontal:16
  },
  row: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: "#FFFAE9",
    borderRadius: 8,
    marginTop: 16
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: "#6E5500",
    fontWeight: "bold"
  }
});
