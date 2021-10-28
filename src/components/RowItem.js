import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


export const RowItem = ({ onPress = () => { }, name, color }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.row, { backgroundColor: "#FFFFFF", opacity: 0.8 }]}>
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width:300,
    justifyContent: "center",
  },
  row: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#36B1F0",
    borderRadius: 8,
    marginTop: 16
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: "#144385",
    fontWeight: "bold"
  }
});
