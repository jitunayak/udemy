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

export default function Playlist() {
    const [videos, setVideos] = useState<Video>();
    const [videourl, setVideourl] = useState<String>();
    const [videoTitle, setVideoTitle] = useState<String>();
    const [videoId, setVideoId] = useState<String>();

    React.useEffect(() => {
        async function fetchvideos() {
            let response = (await DataStore.query(Video)).filter(
                (video) => video.courseID === "c05e96d0-d6e9-4a92-9bba-a27dad2957a2"
            );
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
                    tw` w-full ${item.id === videoId ? "bg-blue-200" : "bg-gray-100"}`,
                ]}>
                <View style={tw`p-4`}>
                    <Text style={tw`text-sm  font-semibold`}>{item.title}</Text>
                    <Text style={tw`text-gray-600 text-sm`}>{item.duration} minutes</Text>
                </View>
            </TouchableOpacity>
        );
    };
    // @ts-ignore
    return (
        <View>
            {videos ? <></> : <ActivityIndicator/>}
            <Text style={tw`text-lg font-semibold my-2`}>Course Name</Text>
            <Player videoUrl={videourl} videoTitle={videoTitle}/>
            <TouchableOpacity
                style={tw`m-2 flex-row justify-center rounded-lg bg-blue-400`}>
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
