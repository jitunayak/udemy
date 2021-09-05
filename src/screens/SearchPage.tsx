import React, { Component } from 'react';
import {SafeAreaView, Text, TextInput, View} from 'react-native';
import tw from "tailwind-react-native-classnames";

function SearchPage(){
        return (
            <SafeAreaView>
                <TextInput style={tw`bg-gray-200 p-4 text-lg font-semibold`}
                           textAlign={"center"} placeholder="Search courses"/>
            </SafeAreaView>
        );

}

export default SearchPage;
