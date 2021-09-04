import { DataStore } from "@aws-amplify/datastore";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View, Image } from "react-native";
import { Course } from "../models";
import tw from "tailwind-react-native-classnames";
// @ts-ignore
import image from "../../assets/course-sample.png";

export default function Courses() {
  const [courses, setcourses] = useState<Course[]>([]);

  useEffect(() => {
    //fetch courses
    const fetchVideos = async () => {
      const response = await DataStore.query(Course);
      setcourses(response);
    };
    fetchVideos();
  }, []);

  const CourseItem = (item: Course) => {
    return (
      <View
        style={[
          tw`m-2 bg-gray-200 rounded-xl flex flex-col justify-between`,
          { width: 180, height: 220 },
        ]}>
        <Image
          style={[{ height: 100, width: 180 }, tw`rounded-t-xl`]}
          resizeMode={"stretch"}
          source={image}
        />
        <View style={tw`p-2`}>
          <Text style={tw`text-sm  font-semibold`}>{item.title}</Text>
          <Text style={tw`text-gray-600 text-sm`}>{item.publishedDate}</Text>
          <Text style={tw`text-gray-600`}>{item.instructor}</Text>
        </View>
        <Text style={tw`font-semibold p-2`}>{item.paid ? "$20" : "Free"}</Text>
      </View>
    );
  };
  return (
    <View style={tw`bg-white`}>
      <View style={tw`flex-row px-2 justify-between`}>
        <Text style={tw`text-xl font-bold`}>Courses</Text>
        <View style={tw`rounded-full bg-gray-200 p-2`}>
          <Text style={tw``}>{`See all >`}</Text>
        </View>
      </View>
      <FlatList
        data={courses}
        horizontal={true}
        keyExtractor={(course) => course.id}
        renderItem={({ item }) => CourseItem(item)}
      />
    </View>
  );
}
