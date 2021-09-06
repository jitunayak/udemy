import React, { Component } from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import SearchPage from "../screens/SearchPage";
import { Feather } from "@expo/vector-icons";
import CourseStackNavigation from "./CourseStackNavigation";
import SettingsPage from "../screens/SettingsPage";

function BottomTabNavigationPage() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      backBehavior='none'
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        lazy: false,
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings";
          }
          // You can return any component that you like here!
          return (
            <View style={{ padding: 0 }}>
              <Feather name={iconName} size={26} color={color} />
            </View>
          );
        },

        tabBarLabel: ({ focused, color }) => {
          return (
            <Text
              style={{
                color,
                fontSize: 12,
                fontWeight: "bold",
              }}>
              {route.name}
            </Text>
          );
        },
        tabBarInactiveTintColor: "gray",
      })}>
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Search' component={SearchPage} />
      <Tab.Screen name='Settings' component={SettingsPage} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigationPage;
