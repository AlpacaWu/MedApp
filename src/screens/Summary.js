import React from "react";
import { View, StyleSheet, StatusBar, Text, SafeAreaView, Alert,ScrollView } from "react-native";
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import Router from '../data/router';
const Summary = ({route,navigation}) =>{
    const {token,topic,totalpoint,wholepoint} = route.params;
    
    const unknownHandler=() =>{
        navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],})
    };

    const returnHandler = () =>{
        let url = Router.host+Router.getinfo
        let body = {
        "token":token
        }
        fetch(url, {
            method: "POST",
            body: JSON.stringify(body)
          })
          .then(response => response.json())
          .then(json => {
            if(json.Result){
              let content = json.Content;
              let token = content.token;
              let isvillager = content.isvillager;
              let name = content.name;
              let points =content.points;
              navigation.navigate('Dashboard', {
                token: token,
                isvillager: isvillager,
                username: name,
                points:points
                  });
            }else{
              Alert.alert(json.Object,json.Content,
                  [{text:'未知錯誤',style:'cancel',onPress:unknownHandler}]
                  );
            };
        });
    }
   
    return(
        <ScrollView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.safearea}>
            <Text style={styles.title}>{"主題： "+topic}</Text>
            <Text style={styles.text}>{"你的得分： "+totalpoint+"/"+wholepoint}</Text>
            <Button 
                mode="contained" 
                onPress = {returnHandler}
                >
                返回主頁
            </Button>
            <Button 
                mode="contained" 
                >
                了解更多
            </Button>
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
        textAlign: "center",
        letterSpacing: -0.02,
        fontWeight: "600",
        marginBottom:10
    },
    text: {
      color: "#fff",
      fontSize: 20,
      textAlign: 'center',
      letterSpacing: -0.02,
      fontWeight: "400",
      marginBottom:30
    },
    safearea: {
      flex: 1,
      marginTop: 100,
      justifyContent: "space-between"
    },
});
export default Summary;