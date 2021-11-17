import Button from '../components/Button'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import { StyleSheet,Text, View,Alert,StatusBar ,SafeAreaView,ScrollView} from 'react-native'
import { RowItemSelect } from '../components/RowItemSelect';
import Router from '../data/router'
import React, { useState } from 'react'
import { getStatusBarHeight } from 'react-native-status-bar-height';
const Medal = ({ route, navigation }) =>{
    const {medalrecords} = route.params;
    return(
        <Background>
            <BackButton goBack={navigation.goBack} />
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.safearea}>
                <ScrollView>
                {medalrecords.map(medalrecord => {
                    return <RowItemSelect key={medalrecord.Topic} name={medalrecord.Topic+':'+medalrecord.Title} />
                })}
                </ScrollView>
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
export default Medal;