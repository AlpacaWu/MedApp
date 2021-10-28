import React from "react";
import { View, StyleSheet, StatusBar, Text, SafeAreaView, Alert,ScrollView } from "react-native";
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import Router from '../data/router';
const Answer =({route,navigation})=>{
    const {token,title,topic,question,mychoice,rightchoice,mcqid,hint} = route.params;
    let youranswer;
    if(mychoice === rightchoice){
        youranswer =
        <Text style={styles.text}>{"你的答案："+mychoice+" (O)"}</Text>
    }else{
        youranswer =
        <Text style={styles.text}>{"你的答案："+mychoice+" (X)"}</Text>
    }
    const nextHandler = ()=>{
        let url = Router.host+Router.nextone
        let body = {
            "token":token,
            "topic_name":topic,
            "mcqid":mcqid,
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
            if(content.IsEnd){
                navigation.navigate("Summary",{
                    token:token,
                    topic:content.Topic,
                    totalpoint:content.TotalPoint,
                    wholepoint:content.WholePoint
                })
            }else{
                let info = content.Info;
                let returnquestion = content.Question
                if(info.isvillager){
                    navigation.navigate("MCQQuiz", {
                        token:token,
                        topic:returnquestion.Topic,
                        question: returnquestion,
                        choices: returnquestion.Choice,
                        hint:returnquestion.Hint,
                        groupid:returnquestion.GroupID,
                        color: "#36b1f0"
                    });
                }else{
                    navigation.navigate("MCQQuiz", {
                        token:token,
                        topic: returnquestion.Topic,
                        question: returnquestion,
                        choices: returnquestion.Choice,
                        groupid:returnquestion.GroupID,
                        color: "#36b1f0"
                    });
                };
            } 
        }else{
            Alert.alert(json.Object,json.Content,
                [{text:'再試一次',style:'cancel'}]
                );
        };
        });
    }
    return(
        <ScrollView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.safearea}>
                <View>
                <Text style={styles.title}>{question.QuestionID+". "+question.QuestionTitle}</Text>
                <Text style={styles.text}>{question.Question}</Text>
                {youranswer}
                <Text style={styles.text}>{"正確答案："+rightchoice}</Text>
                <Paragraph style={styles.paragraph}>
                    答案解析：{"\n"}{hint}
                </Paragraph>
                <Button 
                    mode="contained" 
                    onPress = {nextHandler}
                    >
                    下一題
                </Button>
            </View>
            </SafeAreaView>
        </ScrollView>
    )
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
    },
    paragraph: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        fontWeight: "400",
        color: '#fff',
        marginBottom:30,
    }
});
export default Answer;
