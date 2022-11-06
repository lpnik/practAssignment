import React, { useState, useLayoutEffect, useEffect } from 'react'
import { ScrollView, View, Text, TurboModuleRegistry } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StyleSheet from './Styles';

const STORAGE_KEY = '@running_Key';


export default function Home({route, navigation}) {
    const [histories, setHistories] = useState([]);

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
        } catch (e) {
            console.log(e);
        }
    }

    const getData = async() => {
        try {
            return AsyncStorage.getItem(STORAGE_KEY)
            .then (req => JSON.parse(req))
            .then (json => {
                if (json === null) {
                    json = [];
                }
                setHistories(json);
            })
            .catch (error => console.log(error));
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (route.params?.locationStart) {
            const newKey = histories.length + 1;
            const newHistory = {key: newKey.toString(), description: route.params?.locationStart};
            const newHistories = [...histories, newHistory];
            storeData(newHistories);      
        }  
        getData();
    }, [route.params?.todo])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#f0f0f0'
            },
            headerRight: () => (
                <AntDesign
                    style={StyleSheet.navButton}
                    name="plus"
                    size={24}
                    color="black"
                    onPress={() => navigation.navigate('Map')}
                />
            ),
        })
    }, [])
    

  return (
    <View style={StyleSheet.container}>
    <ScrollView>
        {
            histories.map((history) =>(
                <View style={StyleSheet.rowContainer} key={history.key}>
                    <Text style={StyleSheet.rowText}>{history.locationStart}</Text>
                </View>
            ))
        }
    </ScrollView>
    </View>  )
}