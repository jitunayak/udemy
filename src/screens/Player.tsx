import { AVPlaybackStatus, Video } from "expo-av";
import React, { useState } from "react";
import { Dimensions, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import ContentLoader, { Facebook } from "react-content-loader";

// @ts-ignore
export default function Player({ videoUrl, videoTitle, courseInstructor }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const url: string = videoUrl;
  const video = React.useRef(null);
  // @ts-ignore
  const [status, setStatus] = React.useState<AVPlaybackStatus>({});

  return (
    <View style={tw`w-full`}>
      {url.startsWith("http") ? (
        <Video
          ref={video}
          style={{ width: windowWidth, aspectRatio: 16 / 9 }}
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
      ) : (
        <>
          <View
            style={[
              tw`bg-red-200`,
              { width: windowWidth, aspectRatio: 16 / 9 },
            ]}></View>
        </>
      )}

      <View style={tw`p-2`}>
        <Text style={tw`font-medium text-lg`}>{videoTitle}</Text>
        <Text style={tw`text-sm mt-2 text-gray-600 font-medium`}>
          Created by{" "}
          <Text style={tw`text-red-400 font-semibold`}>{courseInstructor}</Text>
        </Text>
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
