import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Categories } from "../models";
import { DataStore, Predicates, SortDirection } from "@aws-amplify/datastore";
import tw from "tailwind-react-native-classnames";
import CoursesList from "./CoursesList";
import { Feather } from "@expo/vector-icons";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function Home({ navigation }) {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [refreshing, setRefreshing] = React.useState(true);

  useEffect(() => {
    DataStore.query(Categories, Predicates.ALL, {
      sort: (s) => s.createdAt(SortDirection.DESCENDING),
    }).then((categories) => {
      setCategories(categories);
      setRefreshing(false);
    });
  }, [refreshing]);

  return (
    <SafeAreaView style={tw`m-2`}>
      <Text style={tw`text-2xl font-bold text-red-600  p-2`}>Udemy Home</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        }>
        {categories.map((c, index) => {
          return (
            <CoursesList
              navigation={navigation}
              categoryId={c.id}
              key={index}
              categoryName={c.categoryName}
            />
          );
        })}
        <View style={tw`flex-col p-10 self-center justify-center`}>
          <Feather
            name='refresh-cw'
            style={tw`text-center p-2`}
            size={20}
            color='gray'
          />
          <Text style={tw`px-4 text-gray-600 `}>
            Pull to refresh the content
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
