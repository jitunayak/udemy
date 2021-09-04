import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Courses from "./src/screens/Courses";
import Amplify from "aws-amplify";
import config from "./src/aws-exports";
import tw from "tailwind-react-native-classnames";
import Playlist from "./src/screens/Playlist";
Amplify.configure(config);

export default function App() {
  return (
    <SafeAreaView>
      <Text style={tw`font-bold text-lg m-2`}>Udemy Courses for free</Text>
      <Playlist />
      <StatusBar style='auto' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
