import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function Title(props) {
  return <Text style={styles.title} {...props} />
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight:'bold',
    position: 'absolute',
    top: 16 + getStatusBarHeight(),
  }
})
