import React, { Component, useState } from "react";
import {
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { SearchBar } from "react-native-elements";

function SearchPage() {
  const [selected, setSelected] = useState<String[]>([""]);
  const [search, setSearch] = useState<String>("");

  const topics: String[] = [
    "10th",
    "12th",
    "Exam Preparation",
    "Physics",
    "Mathematics",
    "Chemistry",
    "Coding",
    "Painting",
  ];

  const onSelectFromFilter = (item: String) => {
    const filterItem = selected.filter((sf) => sf.includes(String(item)));
    if (filterItem.length == 0) {
      setSelected([...selected, item]);
    } else {
      const itemsAfterremove = selected.filter(
        (sf) => !sf.includes(String(item))
      );
      setSelected(itemsAfterremove);
    }
  };
  return (
    <SafeAreaView>
      {/* <TextInput
        style={tw`bg-gray-100 text-lg font-semibold m-2 py-2`}
        textAlign={"center"}
        placeholder='Search courses'
      /> */}
      <SearchBar
        placeholder='Search course...'
        onChangeText={(value) => setSearch(value)}
        value={search}
        platform={Platform.OS}
      />

      <View style={tw`flex flex-wrap flex-row`}>
        {topics.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => onSelectFromFilter(item)}
              style={tw`${
                String(selected).includes(String(item))
                  ? "bg-red-600"
                  : "bg-gray-100"
              } p-2 m-2 rounded-xl`}
              key={index}>
              <Text
                style={tw`${
                  String(selected).includes(String(item))
                    ? "text-white"
                    : "text-red-500"
                } font-semibold`}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

export default SearchPage;
