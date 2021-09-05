import {StatusBar} from "expo-status-bar";
import React from "react";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import Courses from "./src/screens/Courses";
import Amplify from "aws-amplify";
import config from "./src/aws-exports";
import tw from "tailwind-react-native-classnames";
import Playlist from "./src/screens/Playlist";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "./src/screens/Home";

Amplify.configure(config);

export default function App() {
    const MyTheme = {
        ...DefaultTheme,
        colors: {
            primary: '#DC2626',
            background: '#fff',
            card: '#FEE2E2',
            text: '#DC2626',
            border: 'rgb(255, 45, 85)',
            notification: 'rgb(255, 45, 85)'
        }
    };


    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }} initialRouteName="Udemy Home">
                <Stack.Screen name="Udemy Home" component={Home}/>
                <Stack.Screen name="Details" component={Playlist} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
    },
});
