import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Overlay, AirbnbRating } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getAsyncStorageData,
  storeAsyncStorageData,
} from "../utilities/LocalStorageUtulity";

export default function SettingsPage() {
  const [image, setImage] = useState<string>("");
  const [showDeveloperModal, setshowDeveloperModal] = useState(false);
  const IMAGE_KEY = "image_url";

  const rating = [
    "Contact Helpdesk",
    "Email us",
    "Okay",
    "Thank you",
    "Loved it",
  ];
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
    getAsyncStorageData(IMAGE_KEY)
      .then((uri) => setImage(uri))
      .catch((err) => Alert.alert("Could not find photo in local cache"));
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      await storeAsyncStorageData(IMAGE_KEY, result.uri);
    }
  };
  const LogOutButton = () => {
    return (
      <TouchableOpacity style={tw`mt-4`}>
        <Text
          style={tw`text-red-800 bg-red-50 p-2 font-semibold text-base text-center w-full`}>
          Logout
        </Text>
      </TouchableOpacity>
    );
  };

  const DeveloperMsg = () => {
    return (
      <Overlay
        isVisible={showDeveloperModal}
        onBackdropPress={() => setshowDeveloperModal(false)}>
        <View style={tw`h-60 mx-2`}>
          <Text style={tw`text-xl font-semibold text-purple-800 text-center`}>
            Developed by Jitu Nayak
          </Text>
          <Text style={tw`text-purple-400 text-center`}>
            Developer email: jitunayak715@gmail.com
          </Text>
          <Text style={tw`px-2`}>
            I am a solo developer who sacrifised all his weekends to keep this
            application healthy
          </Text>
          <Text style={tw`text-center p-4`}>Write a Thank you email</Text>
          <AirbnbRating
            count={5}
            reviews={rating}
            defaultRating={5}
            size={40}
          />
        </View>
      </Overlay>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={tw`font-bold text-2xl p-2`}>Settings Page</Text>
        <View style={tw`flex-row p-2`}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={[
                tw`self-center`,
                {
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                },
              ]}
            />
          ) : (
            <View
              style={[
                tw`bg-red-100 rounded-full justify-center`,
                { height: 100, width: 100 },
              ]}>
              <Feather
                name='camera-off'
                style={tw`self-center `}
                size={40}
                color='gray'
                onPress={pickImage}
              />
            </View>
          )}

          <Feather
            name='edit-2'
            style={tw`p-2`}
            size={20}
            color='gray'
            onPress={pickImage}
          />
          <View style={tw`flex-wrap self-center py-2`}>
            <Text style={tw`text-xl py-2 `}>Jitu Nayak</Text>
            <Text style={tw`text-base text-gray-500`}>+91-9999999999</Text>
            <Text style={tw`text-base text-gray-500 `}>
              Email : jitunayak715@gmail.com
            </Text>
          </View>
        </View>

        {/* section */}
        <Text style={tw`text-base p-2 font-semibold`}>My Items</Text>
        <View style={tw`flex-row p-4 bg-gray-100 mb-1`}>
          <Feather name='play-circle' size={25} color='purple' />
          <Text style={tw`self-center px-4 text-base `}>My purchages</Text>
        </View>
        <View style={tw`flex-row p-4 bg-gray-100 mb-1`}>
          <Feather name='bookmark' size={25} color='purple' />
          <Text style={tw`self-center px-4 text-base`}>Bookmarks</Text>
        </View>

        {/* section */}
        <Text style={tw`text-base p-2 font-semibold`}>Help Desk</Text>
        <View style={tw`flex-row p-4 bg-gray-100 mb-1`}>
          <MaterialCommunityIcons
            name='email-edit-outline'
            size={25}
            color='purple'
          />
          <Text style={tw`self-center px-4 text-base`}>Email us</Text>
        </View>
        <View style={tw`flex-row p-4 bg-gray-100 mb-1`}>
          <Feather name='phone-call' size={25} color='purple' />
          <Text style={tw`self-center px-4 text-base`}>Dail via phone</Text>
        </View>

        {/* section */}
        <Text style={tw`text-base p-2 font-semibold`}>About us</Text>
        <View style={tw`flex-row p-4 bg-gray-100 mb-1`}>
          <Feather name='info' size={25} color='purple' />
          <Text style={tw`self-center px-4 text-base `}>About the company</Text>
        </View>
        <TouchableOpacity
          onPress={() => setshowDeveloperModal(true)}
          style={tw`flex-row p-4 bg-gray-100 mb-1`}>
          <Feather name='tool' size={25} color='purple' />
          <Text style={tw`self-center px-4 text-base`}>Developers</Text>
        </TouchableOpacity>
        <DeveloperMsg />
        <LogOutButton />
        <Text style={tw`text-center text-gray-400 p-2`}>
          Read Terms and Conditions
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
