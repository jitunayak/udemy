import {DataStore} from "aws-amplify";
import React, {useState} from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import {Video} from "../models";
import Player from "./Player";
import { Feather } from '@expo/vector-icons';
export default function Playlist({navigation, route}) {
    const [videos, setVideos] = useState<Video[]>([]);
    const [videourl, setVideourl] = useState<String>();
    const [videoTitle, setVideoTitle] = useState<String>();
    const [videoId, setVideoId] = useState<String>();

    React.useEffect(() => {
        async function fetchvideos() {
            // let response = (await DataStore.query(Video)).filter(
            //     (video) => video.courseID === "c05e96d0-d6e9-4a92-9bba-a27dad2957a2"
            // );
            const testCourseId = "c05e96d0-d6e9-4a92-9bba-a27dad2957a2";
            let response = await DataStore.query(Video, video=> video.courseID('eq',route.params.courseId))
            // @ts-ignore
            setVideos(response);
            setVideourl(response[0].url);
            setVideoTitle(response[0].title);
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
                    tw`${item.id === videoId ? "bg-blue-200" : "bg-gray-100 "} 
                    flex-row justify-between border-b-2 border-gray-200`,
                ]}>
                <View style={tw`p-4`}>
                    <Text style={tw`text-sm  font-semibold`}>{item.title}</Text>
                    <Text style={tw`text-gray-600 text-sm`}>{item.duration} minutes</Text>
                </View>
                <Feather style={tw`self-center px-4`} name="play-circle" size={24} color="black" />
            </TouchableOpacity>
        );
    };
    return (
        <View style={tw`bg-white h-full`}>
            {videos ? <></> : <ActivityIndicator/>}
            <Text style={tw`text-lg font-semibold m-2 text-gray-800`}>{route.params.courseName}</Text>
            <Player videoUrl={videourl} videoTitle={videoTitle} courseInstructor={route.params.courseInstructor}/>
            <TouchableOpacity
                style={tw`m-2 flex-row justify-center rounded-lg bg-blue-400 `}>
                <Feather style={tw`self-center`} name="book" size={24} color="white" />
                <Text style={tw`p-4 text-white font-bold`}>Free to enroll</Text>
            </TouchableOpacity>
            <Text style={tw`text-lg font-semibold px-2`}>Playlist</Text>
            <FlatList
                data={videos}
                keyExtractor={(course) => course.id}
                renderItem={({item}) => VideoItem(item)}
            />
        </View>
    );
}
