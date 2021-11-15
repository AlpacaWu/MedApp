import React, { useState } from "react";
import { View, StyleSheet, StatusBar, Text, SafeAreaView, Alert } from "react-native";
import Button from '../components/Button'
import Router from '../data/router';
import Background from '../components/Background'
import { Card } from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import TextInput from "../components/TextInput";

export default function TQQuiz ({route,navigation}){
    const {token,topic,question,color,groupid} = route.params;
    const [youranswer,setYourAnswer] = useState('');
    let titletext;
    if (question.QuestionTitle){
        titletext = <Text style={styles.title}>{question.QuestionID+". "+question.QuestionTitle}</Text>
    }else{
        titletext =<Text style={styles.title}>{question.QuestionID+". "}</Text>
    }
    const restartHandler =() =>{
        navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],})
    };
    const onAnswerPressedHandler = () =>{
        let url = Router.host+Router.passtq
        let body = {
          "token":token,
          "topic_name":topic,
          "tqid":question.QuestionID,
          "answer":youranswer,
          "groupid":groupid
        }
        fetch(url, {
          method: "POST",
          body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(json => {
            if(json.Result){
                let content = json.Content;
                navigation.push("TextAnswer",{
                    token:token,
                    title:question.QuestionTitle,
                    question:question,
                    topic:topic,
                    myanswer:youranswer,
                    rightanswer:content.Answer,
                    tqid:content.QuestionID,
                    point:content.Point,
                    totalpoint:content.TotalPoint
                });
            }else{
              if(json.Content === '權杖失效'){
                Alert.alert(json.Object,json.Content,
                  [{text:'重新開始',style:'cancel',onPress:restartHandler}]
                  );
              }else{
                Alert.alert(json.Object,json.Content,
                  [{text:'再試一次',style:'cancel'}]
                  );
              }
            }
        });
    }
    return(
        <Background>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={styles.safearea}>
            <View style={styles.container}>
            <Card containerStyle={styles.card} >
              {titletext}
              <Text style={styles.text}>{question.Question}</Text>
            </Card>
            </View>
        </SafeAreaView>
        <TextInput
                label="你的答案..."
                returnKeyType="next"
                value={youranswer}
                onChangeText={(text) => setYourAnswer(text)}
                autoCapitalize="none"
            />
        <Button 
        mode="contained" 
        style={styles.button}
        onPress={onAnswerPressedHandler}
        >
        送出答案
        </Button>
          
        </Background>
      );
}
const styles = StyleSheet.create({
    container: {
        flex: 0,
        //marginTop: 16,
        width: 366,
        marginTop: 8 + getStatusBarHeight()
      },
  
      title:{
        marginHorizontal: 24,
        marginTop: 32,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#144385',
        opacity: 1,
      },
      text: {
        marginHorizontal: 24,
        marginVertical: 16,
        marginBottom: 32,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
      },
      safearea: {
        //flex: 0,
        //marginTop: 100,
        justifyContent: "space-between",
        justifyContent: 'center',
      },
      card: {
        padding: 0,
        borderRadius: 8
      },
      button: {
        marginBottom:64
      },
})