import React from 'react';
import { View, StyleSheet, StatusBar, Text, SafeAreaView, Alert ,ScrollView} from "react-native";
import { RowItem } from '../components/RowItem';
import Router from '../data/router';
const MCQQuiz = ({ route, navigation }) =>{
    const {token,topic,question,choices,color,hint,groupid} = route.params;
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
                navigation.navigate("Answer",{
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
                Alert.alert(json.Object,json.Content,
                    [{text:'再試一次',style:'cancel'}]
                    );
            }
          /*navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })*/
        });
      }
    return(
        <ScrollView
        style={[
        styles.container,
        { backgroundColor: color}
        ]}>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.safearea}>
                <View>
                <Text style={styles.title}>{question.QuestionID+". "+question.QuestionTitle}</Text>
                <Text style={styles.text}>{question.Question}</Text>
                {choices.map(choice => {
                    return <RowItem key={choice.Order} name={choice.Choice} color="#799496" onPress={answerHandler.bind(this,choice.Order)}/>
                })}
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#36B1F0",
      flex: 1,
      paddingHorizontal: 20
    },
    title:{
        color: "#fff",
        fontSize: 28,
        textAlign: "left",
        letterSpacing: -0.02,
        fontWeight: "600",
        marginBottom:10
    },
    text: {
      color: "#fff",
      fontSize: 20,
      textAlign: 'left',
      letterSpacing: -0.02,
      fontWeight: "400",
      marginBottom:30
    },
    safearea: {
      flex: 1,
      marginTop: 100,
      justifyContent: "space-between"
    }
  });
  
export default MCQQuiz;