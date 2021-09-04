import React, {useState} from "react";
import {View, Text, Button, TouchableOpacity} from "react-native";
import {Video, AVPlaybackStatus} from "expo-av";
import tw from "tailwind-react-native-classnames";
import {Dimensions} from "react-native";

// @ts-ignore
export default function Player({videoUrl, videoTitle, courseInstructor}) {
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    const video = React.useRef(null);
    // @ts-ignore
    const [status, setStatus] = React.useState<AVPlaybackStatus>({});

    return (
        <View style={tw`w-full`}>
            <Video
                ref={video}
                style={{width: windowWidth, height: windowWidth * 0.58}}
                source={{
                    uri: videoUrl,
                }}
                useNativeControls={true}
                resizeMode='contain'
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                volume={0.7}
                shouldPlay={false}
            />

            <View style={tw`p-2`}>
                <Text style={tw`font-semibold text-lg`}>{videoTitle}</Text>
                <Text style={tw`text-sm`}>{courseInstructor}</Text>

                <View style={tw`flex-row`}>
                    {/* <TouchableOpacity
            style={tw`m-2`}
            onPress={() =>
              status?.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }>
            <Text
              style={tw`p-4  bg-red-500 flex-row justify-center text-white font-bold`}>
              {status.isPlaying ? "Resume " : "Play"}
            </Text>
          </TouchableOpacity> */}
                </View>

                {/* <Text>{!status.isLoaded ? "loading..." : "done"}</Text>
        <Text>Buffer : {status.isBuffering ? "yes" : "no"}</Text> */}
            </View>
        </View>
    );
}
