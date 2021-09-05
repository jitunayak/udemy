import React, {Component, useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {Course} from "../models";
import tw from "tailwind-react-native-classnames";
import image from "../../assets/course-sample.png";
import {DataStore} from "@aws-amplify/datastore";
import {useTheme} from "@react-navigation/native";

function CoursesList({navigation,categoryId,categoryName}) {

    const [courses, setcourses] = useState<Course[]>([]);
    const { colors } = useTheme();

    useEffect(() => {
        //fetch courses
        const fetchVideos = async () => {
            const response = await DataStore.query(Course,
                (c)=>c.categoriesID('eq', categoryId));
            setcourses(response);
        };
        fetchVideos()
    }, [categoryId]);


    const CourseItem = (item: Course) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Details", {
                        courseId: item.id,
                        courseName: item.title,
                        courseInstructor: item.instructor
                    })
                }}
                style={[
                    tw`m-2 bg-gray-100 rounded-xl flex flex-col justify-around`,
                    {width: 180, height: 220},
                ]}>
                <Image
                    style={[{height: 120, width: 180}, tw`rounded-t-xl`]}
                    resizeMode={"stretch"}
                    source={image}
                />
                <View style={tw`p-2`}>
                    <Text style={tw`text-base  font-semibold`}>{item.title}</Text>
                    <Text style={tw`text-gray-600 text-sm`}>{item.publishedDate}</Text>
                    <Text style={tw`text-gray-600`}>{item.instructor}</Text>
                </View>
                <Text style={tw`font-semibold p-2`}>{item.paid ? "$20" : "Free"}</Text>
            </TouchableOpacity>
        );
    };
    return (
        <View style={tw`bg-white flex-1`}>
            <View style={tw`flex-row px-2 justify-between`}>
                <Text style={tw`text-base font-semibold`}>{categoryName}</Text>
            </View>
            <FlatList
                data={courses}
                horizontal={true}
                keyExtractor={(course) => course.id}
                renderItem={({item}) => CourseItem(item)}
            />
        </View>)

}

export default CoursesList;
