import React from "react";
import { View, StyleSheet, StatusBar, Text, SafeAreaView, Alert,ScrollView,Image } from "react-native";
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import Router from '../data/router';
import Background from '../components/Background'
import { Card } from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Logo from '../components/Logo'

const Answer =({route,navigation})=>{
    const {token,title,topic,question,mychoice,rightchoice,mcqid,hint} = route.params;
    let youranswer;
    let icon;
    if(mychoice === rightchoice){
        youranswer =
        <Card containerStyle={styles.greencard}>
        <Text style={styles.answertitle}>{"你的答案"}</Text>
        <Text style={styles.answertext}>{mychoice}</Text>
        </Card>
        icon = 
        <Image source={require('../assets/correct.png')} style={styles.icon}/>
    }else{
        youranswer =
        <Card containerStyle={styles.redcard}>
        <Text style={styles.answertitle}>{"你的答案"}</Text>
        <Text style={styles.answertext}>{mychoice}{"\n"}</Text>
        <Text style={styles.answertitle}>{"正確答案"}</Text>
        <Text style={styles.answertext}>{rightchoice}</Text>
        </Card>
        icon = 
        <Image source={require('../assets/wrong.png')} style={styles.icon}/>

    }
    let hintBlock;
    if(hint){
        hintBlock = 
        <Card containerStyle={styles.card2}>
            <Text style={styles.paragraphtitle}>答案解析</Text>
            <Paragraph style={styles.paragraph}>
                {hint}
            </Paragraph>
        </Card>
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
                    wholepoint:content.WholePoint,
                    title:content.Title
                })
            }else{
                let info = content.Info;
                let returnquestion = content.Question
                if(info.isvillager){
                    navigation.push("MCQQuiz", {
                        token:token,
                        topic:returnquestion.Topic,
                        question: returnquestion,
                        choices: returnquestion.Choice,
                        hint:returnquestion.Hint,
                        groupid:returnquestion.GroupID,
                        color: "#36b1f0"
                    });
                }else{
                    navigation.push("MCQQuiz", {
                        token:token,
                        topic:returnquestion.Topic,
                        question: returnquestion,
                        choices: returnquestion.Choice,
                        groupid:returnquestion.GroupID,
                        color: "#36b1f0"
                    });
                };
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
    return(
        <Background>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safearea}>
        <ScrollView style={styles.container}>
        
            <Card containerStyle={styles.card}>
            <View style={styles.safearea}>
                {icon}
                <Text style={styles.title}>{question.QuestionID+". "+question.QuestionTitle}</Text>
                <Text style={styles.text}>{question.Question}</Text>
                </View>
            </Card>
            {youranswer}
            {hintBlock}
            <Button 
                    mode="contained" 
                    style={styles.button}
                    onPress = {nextHandler}
                    >
                    下一題
                </Button>
        </ScrollView>
        </SafeAreaView>
        </Background>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 0,
        //marginTop: 16,
        width: 366,
        marginTop: 8 + getStatusBarHeight()
      },
      title:{
        marginTop: 24,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#144385',
        opacity: 1,
    },
    text: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
    },
    safearea: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    paragraphtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#144385',
        marginBottom:8

    },
    paragraph: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#000',

    },
    card: {
        padding: 24,
        paddingTop:48,
        borderRadius: 8,
    },
    card2: {
        padding: 24,
        borderRadius: 8,
    },
    redcard: {
        padding: 24,
        borderRadius: 8,
        backgroundColor:'#F15249'
    },
    greencard: {
        padding: 24,
        borderRadius: 8,
        backgroundColor:'#32BA7C'
    },
    answertitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#FFF',
        marginBottom:8
    },
    answertext: {
        fontSize: 18,
        fontWeight: 'normal',
        textAlign: 'left',
        color: '#FFF',
    },
    icon: {
        width: 110,
        height: 110,
        marginBottom: 8,
        paddingTop: 32,
    },

    button: {
        marginTop: 24,
      },
});
export default Answer;
