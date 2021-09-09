import { DataStore } from "@aws-amplify/datastore";
import { useTheme } from "@react-navigation/native";
import React, { Component, useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";

import image from "../../assets/course-sample.png";
import { Course } from "../models";
import { moneyConversion } from "../utilities/Commonutilities";

function CostOfCourse(props: { paid: boolean | undefined; s: string }) {
  return (
    <View style={tw`flex-row`}>
      {!props.paid && (
        <Text
          style={tw`font-semibold p-2 text-red-900 line-through self-center`}>
          {`₹ ${props.s}`}
        </Text>
      )}

      <Text
        style={tw`font-semibold  ${
          props.paid
            ? "p-2 text-red-900"
            : "text-yellow-800 py-1 px-2 m-2 bg-yellow-100 w-12"
        }`}>
        {props.paid ? `₹ ${props.s}` : "Free"}
      </Text>
    </View>
  );
}

function CoursesList({ navigation, categoryId, categoryName }) {
  const [courses, setcourses] = useState<Course[]>([]);
  const { colors } = useTheme();

  useEffect(() => {
    //fetch courses
    const fetchVideos = async () => {
      const response = await DataStore.query(Course, (c) =>
        c.categoriesID("eq", categoryId)
      );
      //console.log(response);
      setcourses(response);
    };
    fetchVideos();
  }, [categoryId]);

  const CourseItem = (item: Course) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Details", {
            courseId: item.id,
            courseName: item.title,
            courseInstructor: item.instructor,
            isPaid: item.paid,
            courseCost: moneyConversion(item.cost ?? 0),
          });
        }}
        style={[
          tw`m-2 bg-white rounded-xl flex-col justify-between`,
          { width: 200 },
        ]}>
        <Image
          style={[{ height: 120, width: 200 }, tw`rounded-t-sm`]}
          resizeMode={"stretch"}
          source={{ uri: item.thumbnail }}
        />
        <View style={tw`p-2`}>
          <Text style={tw`text-base  font-semibold`}>{item.title}</Text>
          <Text style={tw`text-gray-600 text-sm`}>{item.publishedDate}</Text>
          <Text style={tw`text-gray-600`}>{item.instructor}</Text>
        </View>
        <CostOfCourse paid={item.paid} s={moneyConversion(item.cost ?? 0)} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={tw`bg-white flex-1`}>
      <View style={tw`flex-row px-2 justify-between`}>
        <Text style={tw`text-lg my-2 font-semibold`}>{categoryName}</Text>
      </View>
      <FlatList
        data={courses}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(course) => course.id}
        renderItem={({ item }) => CourseItem(item)}
      />
    </View>
  );
}

export default CoursesList;
