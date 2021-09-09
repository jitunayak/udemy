import React, { Component } from "react";
import { Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Playlist from "../screens/Playlist";
import BottomTabNavigationPage from "./BottomTabNavigationPage";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import ShareExample, { onShare } from "../utilities/ShareComponent";

function CourseStackNavigation({ navigation }) {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName='Udemy Home'>
      <Stack.Screen
        name='Udemy Home'
        options={{ headerShown: false }}
        component={BottomTabNavigationPage}
      />
      <Stack.Screen
        name='Details'
        options={{
          headerBackTitle: "Back",
          title: "",
          headerRight: () => (
            <Feather
              onPress={() => onShare()}
              name='share'
              color='black'
              size={25}
            />
          ),
        }}
        component={Playlist}
      />
    </Stack.Navigator>
  );
}

export default CourseStackNavigation;
