import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { DataStore } from "aws-amplify";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";

import { Video } from "../models";
import Player from "./Player";

// @ts-ignore
export default function Playlist({ navigation, route }) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [videourl, setVideourl] = useState<String>();
  const [videoTitle, setVideoTitle] = useState<String>();
  const [videoId, setVideoId] = useState<String>();
  const { colors } = useTheme();

  React.useEffect(() => {
    async function fetchvideos() {
      // let response = (await DataStore.query(Video)).filter(
      //     (video) => video.courseID === "c05e96d0-d6e9-4a92-9bba-a27dad2957a2"
      // );
      const testCourseId = "c05e96d0-d6e9-4a92-9bba-a27dad2957a2";
      let response = await DataStore.query(Video, (video) =>
        video.courseID("eq", route.params.courseId)
      );

      setVideos(response);
      setVideourl(response[0]?.url);
      setVideoTitle(response[0]?.title);
      // console.log(response);
    }

    fetchvideos();
  }, []);

  const VideoItem = (item: Video) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setVideourl(item.url);
          setVideoTitle(item.title);
          setVideoId(item.id);
        }}
        style={[
          tw`flex-row justify-start border-b-2 border-gray-200 p-4`,
          {
            backgroundColor: `${
              item.id === videoId ? `${colors.card}` : "#F3F4F6"
            }`,
          },
        ]}>
        <View style={tw`flex-auto`}>
          <Text style={tw`text-sm`}>{item.title}</Text>
          <Text style={tw`text-gray-400 text-sm`}>{item.duration} minutes</Text>
        </View>
        <Feather
          style={tw`self-center mr-2`}
          name='play-circle'
          size={24}
          color='black'
        />
      </TouchableOpacity>
    );
  };
  if (videos) {
    <ActivityIndicator />;
  }
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      {/* <Text style={tw`text-2xl font-semibold m-2 text-gray-800 px-2`}>
        {route.params.courseName}
      </Text> */}
      <Player
        videoUrl={videourl}
        videoTitle={videoTitle}
        courseInstructor={route.params.courseInstructor}
      />
      <TouchableOpacity
        style={[
          tw`m-2 flex-row justify-center rounded-md `,
          {
            backgroundColor: `${colors.primary}`,
          },
        ]}>
        <Feather style={tw`self-center`} name='book' size={24} color='white' />
        <Text style={tw`p-4 text-white font-bold`}>
          {route.params.isPaid
            ? ` Buy for ₹${route.params.courseCost}`
            : " Free to enroll"}
        </Text>
      </TouchableOpacity>
      <View style={tw`flex-row p-2`}>
        <Feather name='list' size={25} color='black' />
        <Text style={tw`text-lg font-semibold px-2`}>Playlist</Text>
      </View>
      <FlatList
        data={videos}
        keyExtractor={(course) => course.id}
        renderItem={({ item }) => VideoItem(item)}
      />
    </SafeAreaView>
  );
}
