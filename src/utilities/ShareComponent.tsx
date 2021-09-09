import React from "react";
import { Share, View, Button } from "react-native";

export const onShare = async () => {
  try {
    console.log("shared...");
    const result = await Share.share({
      message: `for sharing this course with friends. Deeplink sharing is coming soon
      https://github.com/jitunayak`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};
