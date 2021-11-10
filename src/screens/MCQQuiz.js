import React from 'react';
import { View, StyleSheet, StatusBar, Text, SafeAreaView, Alert ,ScrollView} from "react-native";
import { RowItemSelect } from '../components/RowItemSelect';
import Router from '../data/router';
import Background from '../components/Background'
import { Card } from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const MCQQuiz = ({ route, navigation }) =>{
    const {token,topic,question,choices,color,hint,groupid} = route.params;
    const restartHandler = () =>{
      navigation.reset({
          index: 0,
          routes: [{ name: 'StartScreen' }],})
  };
    const answerHandler = (choice) => {
        let url = Router.host+Router.passmcq
        let body = {
          "token":token,
          "topic_name":topic,
          "mcqid":question.QuestionID,
          "optionid":choice,
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
                navigation.push("Answer",{
                    token:token,
                    title:question.QuestionTitle,
                    question:question,
                    topic:topic,
                    mychoice:choices[(choice-1)].Choice,
                    rightchoice:choices[(content.RightOption-1)].Choice,
                    mcqid:content.QuestionID,
                    hint:hint
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
          /*navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })*/
        });
      }
    return(
      <Background>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safearea}>
          <View style={styles.container}>
          <Card containerStyle={styles.card} >
            <Text style={styles.title}>{question.QuestionID+". "+question.QuestionTitle}</Text>
            <Text style={styles.text}>{question.Question}</Text>
          </Card>
          </View>

          
          <ScrollView>
            {/* <SafeAreaView style={styles.safearea}> */}
                {/* //<View> */}
                
            {choices.map(choice => {
              return <RowItemSelect key={choice.Order} name={choice.Choice} onPress={answerHandler.bind(this,choice.Order)}/>
            })}
          </ScrollView>
               {/* </View> */}
          </SafeAreaView>
        
        
      </Background>
    );
};
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
    }
  });
  
export default MCQQuiz;