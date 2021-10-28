import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View,Alert} from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Title from '../components/Title'
import Button from '../components/Button'
import BlueButton from '../components/BlueButton'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { phoneValidator } from '../helpers/phoneValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import Router from '../data/router'
export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const onLoginPressed = () => {
    const phoneError = phoneValidator(phone.value)
    const passwordError = passwordValidator(password.value)
    let url = Router.host+Router.login
    let body = {
      "phone":phone.value,
      "password":password.value
    }
    if (phoneError || passwordError) {
      setPhone({ ...phone, error: phoneError })
      setPassword({ ...password, error: passwordError })
      return
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(json => {
      if(json.Result){
        let content = json.Content;
        let token = content.token;
        let isvillager = content.isvillager;
        let name = content.name;
        let points =content.points;
        navigation.navigate('Dashboard', {
          token: token,
          isvillager: isvillager,
          username: name,
          points:points
            });
      }else{
        Alert.alert(json.Object,json.Content,
            [{text:'重新登入',style:'cancel'}]
            );
      };
    });
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Title>玩家登入</Title>
      <TextInput
        label="Phone"
        returnKeyType="next"
        value={phone.value}
        onChangeText={(text) => setPhone({ value: text, error: '' })}
        error={!!phone.error}
        errorText={phone.error}
        autoCapitalize="none"
        keyboardType="numeric"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>忘記密碼？</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        玩家登入
      </Button>
      <BlueButton mode="contained" onPress={() => navigation.navigate('RegisterScreen')}>
        我要註冊
      </BlueButton>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 14,
    fontWeight:'bold',
    color:'#FFF',
  },
  title: {
    fontSize: 18,
    fontWeight:'bold',
    color:'#144385',
    textAlign: 'left',
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
