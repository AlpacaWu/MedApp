import React, { useState } from 'react'
import Background from '../components/Background'
import TextInput from '../components/TextInput'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import BackButton from '../components/BackButton'
import spaceQuestions from '../data/space'
import Title from '../components/Title'
import CardView from 'react-native-cardview'
import { SafeAreaView, StyleSheet, View, Text ,Alert} from 'react-native';
import { Card } from 'react-native-elements';
import { codeValidator } from '../helpers/codeValidator'
import Router from '../data/router';



export default function Story({  route,navigation }) {
  const {token,content,isvillager,type} = route.params;
  const [code, setCode] = useState({ value: '', error: '' })
  let hint;
  const restartHandler = () =>{
    navigation.reset({
        index: 0,
        routes: [{ name: 'StartScreen' }],})
};
  const onCodePressed = () => {
    if(!isvillager){
      const codeError = codeValidator(code.value)
      if (codeError) {
        setCode({ ...code, error: codeError })
        return
      }
    };
    let url = Router.host+Router.startgame
    console.log(url);
    let body = {
      "token":token,
      "topic_name":content.Topic,
      "code":code.value,
      "type":type
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      if(json.Result){
        let content = json.Content;
        if(content.Type === 'mcq'){
          if(isvillager){
            navigation.navigate("MCQQuiz", {
              token:token,
              topic:content.Topic,
              question: content.Question,
              choices: content.Choice,
              hint:content.Hint,
              groupid:content.GroupID,
              color: "#36b1f0"
            });
          }else{
            navigation.navigate("MCQQuiz", {
              token:token,
              topic: content.Topic,
              question: content.Question,
              choices: content.Choice,
              groupid:content.GroupID,
              color: "#36b1f0"
            });
          };
        }else{
          navigation.navigate("TQQuiz", {
            token:token,
            topic: content.Topic,
            question: content.Question,
            groupid:content.GroupID,
            color: "#36b1f0"
          });
        }
        
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
      };
    });
  }
  let codevalidatorBlock;
  if(!isvillager){
    codevalidatorBlock = 
    <TextInput
        label="驗證碼"
        returnKeyType="next"
        value={code.value}
        onChangeText={(text) => setCode({ value: text, error: '' })}
        error={!!code.error}
        errorText={code.error}
        autoCapitalize="none"
    />
  }
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Title>{content.Topic}</Title>
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <Card containerStyle={{borderRadius: 8}}>
              {/*react-native-elements Card*/}
              <Paragraph style={styles.paragraph}>
              {content.Content}
              </Paragraph>
            </Card>
          </View>
        </SafeAreaView>

        {codevalidatorBlock}

        <Button 
        mode="contained" 
        style={styles.button}
        onPress={onCodePressed}
        >
        開始挑戰
        </Button>
    </Background>
  );
}
     
const styles = StyleSheet.create({
    container: {
      flex: 1,
      //alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 64,
      //opacity: 0.8,
      width: 366,
    },
    paragraph: {
      marginHorizontal: 16,
      marginVertical: 72,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'left',
      color: '#000',
    },
    button: {
      marginBottom:64
    },
  });