import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Playlist from "../screens/Playlist";
import BottomTabNavigationPage from "./BottomTabNavigationPage";

function CourseStackNavigation({navigation}) {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator  initialRouteName="Udemy Home">
            <Stack.Screen name="Udemy Home" options={{headerShown:false}} component={BottomTabNavigationPage}/>
            <Stack.Screen name="Details"
                          options={{headerBackTitle:"back", title:""}}
                          component={Playlist}/>
        </Stack.Navigator>

    );

}

export default CourseStackNavigation;
