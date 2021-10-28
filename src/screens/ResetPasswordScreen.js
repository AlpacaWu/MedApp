import React, { useState } from 'react'
import { Alert } from 'react-native'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import { phoneValidator } from '../helpers/phoneValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import Router from '../data/router';
export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [phone, setPhone] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const phoneError = phoneValidator(phone.value)
    let url = Router.host+Router.forgetpassword
    let body = {
      "phone":phone.value,
      "newpassword":password.value,
      "email":email.value,
    }
    if (emailError || passwordError || phoneError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setPhone({...phone,error:phoneError})
      return
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(json => {
      if(json.Result){
        navigation.navigate('LoginScreen')
      }else{
        Alert.alert(json.Object,json.Content,
            [{text:'再試一次',style:'cancel'}]
            );
      };
    });
    
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <TextInput
        label="Email"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
      />
      <TextInput
        label="電話號碼"
        returnKeyType="done"
        value={phone.value}
        onChangeText={(text) => setPhone({ value: text, error: '' })}
        error={!!phone.error}
        errorText={phone.error}
        autoCapitalize="none"
        keyboardType="numberic"
      />
      <TextInput
        label="新密碼"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        autoCapitalize="none"
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
       重設密碼
      </Button>
    </Background>
  )
}
