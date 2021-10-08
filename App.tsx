import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Courses from "./src/screens/Courses";
import Amplify from "aws-amplify";
import config from "./src/aws-exports";
import tw from "tailwind-react-native-classnames";
import Playlist from "./src/screens/Playlist";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import BottomTabNavigationPage from "./src/navigation/BottomTabNavigationPage";
import { SafeAreaContext } from "react-native-safe-area-context";
import CourseStackNavigation from "./src/navigation/CourseStackNavigation";
import WelcomeOnBoard from "./src/navigation/WelcomeOnBoard";
import NetInfo from "@react-native-community/netinfo";
import { withAuthenticator } from "aws-amplify-react-native"

Amplify.configure(config);

const App = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      primary: "#DC2626",
      background: "#FFF",
      card: "#fff",
      text: "#DC2626",
      border: "#F9FAFB",
      notification: "rgb(255, 45, 85)",
    },
  };

  //   NetInfo.addEventListener((state) => {
  //     console.log("Connection type", state.type);
  //     console.log("Is connected?", state.isConnected);
  //   });

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar translucent={true} />
      <CourseStackNavigation />
    </NavigationContainer>

    // <WelcomeOnBoard/>
  );
}

export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
