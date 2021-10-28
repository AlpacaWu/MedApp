import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import BlueButton from '../components/BlueButton'
import Paragraph from '../components/Paragraph'
import { View } from 'react-native'
import { ScrollView, StatusBar, SafeAreaView, StyleSheet, Text} from "react-native"
import BackButton from '../components/BackButton'
import { RowItem } from '../components/RowItem';
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Router from '../data/router';
export default function QuizIndex({ route,navigation }) {
  const {token,topics,isvillager} = route.params;
  const quizHandler = key => {
    let url = Router.host+Router.quiz;
    let body = {
      "token":token,
      "topic_id":key,
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
        navigation.navigate('Story', {
          token: token,
          content: content,
          isvillager:isvillager
        })
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
        <SafeAreaView style={styles.container}>   
        <ScrollView>
        <StatusBar barStyle="dark-content" />
          {topics.map((topic, rowIndex)=>{
            return <RowItem key={topic.ID} name={topic.ID+'. '+topic.NAME} color="#799496" onPress={quizHandler.bind(this,topic.ID)}/>
          })}
        </ScrollView>
        </SafeAreaView>
    </Background>
  )
}

const styles = StyleSheet.create({
    container: {
        top: 24 + getStatusBarHeight()
    }
  });