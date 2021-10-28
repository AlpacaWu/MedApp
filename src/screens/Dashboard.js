import React, { useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { StyleSheet,Text,Alert } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Router from '../data/router';
import { createIconSetFromFontello } from 'react-native-vector-icons'
export default function Dashboard({ route, navigation }) {
  const {token,isvillager,username,points} = route.params;
  const quizIndexHandler = () => {
    let url = Router.host+Router.quizIndex
    let body = {
      "token":token,
      "type":"mcq"
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(json => {
      if(json.Result){
        let content = json.Content;
        let topics  = content.Topic;
        navigation.navigate('QuizIndex', {
          token: token,
          topics: topics,
          isvillager: isvillager
        })
      }else{
        Alert.alert(json.Object,json.Content,
            [{text:'再試一次',style:'cancel'}]
            );
      };
    });
  };
  const textquizIndexHandler = () =>{
    navigation.navigate('StartScreen', {//問答介面還沒做
    token: token
    })
  };
  const prizeHandler = () =>{
    navigation.navigate('StartScreen', {//問答介面還沒做
      token: token
      })
  };
  const logoutHandler = () =>{
    navigation.reset({
      index: 0,
      routes: [{ name: 'StartScreen' }],})
  };
  let professionalBlock;
  if(!isvillager){
    professionalBlock =
    <Button
    mode="contained"
    onPress={textquizIndexHandler}
    >
    問答題
    </Button>
  }
  
  return (
    <Background>
      <Text style={styles.name}>Ｈi, {username}！目前您的積分為：</Text>
      <Text style={styles.score}>{points}</Text>
      <Button
        mode="contained"
        onPress={quizIndexHandler}
      >
        選擇題
      </Button>
      {professionalBlock}
      <Button
        mode="contained"
        onPress={prizeHandler}
      >
        查看獎牌
      </Button>
      <Button
        mode="contained"
        onPress={logoutHandler}
      >
        登出
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 16,
    fontWeight:'bold',
    position: 'absolute',
    top: 48 + getStatusBarHeight(),
  },
  score:{
    color:'#144385',
    fontSize: 48,
    fontWeight:'bold',
    position: 'absolute',
    top: 96 + getStatusBarHeight(),
  },
})
