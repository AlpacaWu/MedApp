import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity,Alert} from 'react-native'
import { Text,Checkbox } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { phoneValidator } from '../helpers/phoneValidator'
import Title from '../components/Title'
import Router from '../data/router';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [phone, setPhone] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [isVillager,setIsVillager] = useState(false)
  const [code, setCode] = useState({ value: '', error: '' })
  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const phoneError = phoneValidator(phone.value)
    let url = Router.host+Router.register
    let body = {
      "name":name.value,
      "phone":phone.value,
      "password":password.value,
      "email":email.value,
      "isvillager":isVillager,
      "code":code.value,
    }
    if (emailError || passwordError || nameError || phoneError) {
      setName({ ...name, error: nameError })
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
        let content = json.Content;
        let token = content.Token;
        let name = content.Name;
        let points =content.Point;
        navigation.navigate('Dashboard', {
          token: token,
          isvillager: isVillager,
          username: name,
          points:points
            });
      }else{
        Alert.alert(json.Object,json.Content,
            [{text:'再試一次',style:'cancel'}]
            );
      };
    });
  }
  let codeValidatorBlock ;
  if(!isVillager){
    codeValidatorBlock = 
    <TextInput
        label="驗證碼"
        returnKeyType="next"
        value={code.value}
        onChangeText={(text) => setCode({ value: text, error: '' })}
        error={!!code.error}
        errorText={code.error}
        autoCapitalize="none"
        keyboardType="numeric"
    />
  }
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Title>玩家註冊</Title>
      <TextInput
        label="玩家姓名"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="電話號碼（帳號）"
        returnKeyType="next"
        value={phone.value}
        onChangeText={(text) => setPhone({ value: text, error: '' })}
        error={!!phone.error}
        errorText={phone.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="密碼"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.checkboxContainer}>
        <Checkbox
            status={!isVillager ? 'checked' : 'unchecked'}
            onPress={() => {setIsVillager(!isVillager)}}
        />
        <Text style={styles.label}>專業版?</Text>
      </View>
      {codeValidatorBlock}

      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        註冊
      </Button>
      
      <View style={styles.row}>
        <Text style={styles.text}>已經註冊過了？ </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>我要登入</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    color:'#C5C5C5'
  },
  
  label: {
    margin: 8,
    color: '#fff',
  },
  checkboxContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
})
