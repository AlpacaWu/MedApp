import React from 'react'
import FirstBackground from '../components/FirstBackground'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import BlueButton from '../components/BlueButton'
import Paragraph from '../components/Paragraph'
import { View } from 'react-native'


export default function StartScreen({ navigation }) {
  return (
    <FirstBackground>
      <View style={{ flex: 1, marginTop:260, width: '100%' }}>
      <Button
        style={{ marginTop:20, }}
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        開始遊戲
      </Button>
      </View>
    </FirstBackground>
  )
}