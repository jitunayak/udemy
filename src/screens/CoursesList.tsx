import React, {Component, useEffect, useState} from "react";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {Course, Video} from "../models";
import tw from "tailwind-react-native-classnames";
import image from "../../assets/course-sample.png";
import {DataStore} from "@aws-amplify/datastore";
import {useTheme} from "@react-navigation/native";

function CoursesList({navigation, categoryId, categoryName}) {
    const [courses, setcourses] = useState<Course[]>([]);
    const {colors} = useTheme();

    useEffect(() => {
        //fetch courses
        const fetchVideos = async () => {
            const response = await DataStore.query(Course,
                (c) => c.categoriesID('eq', categoryId));
            ;
            //console.log(response);
            setcourses(response);
        };
        fetchVideos();
    }, [categoryId]);

    const moneyConversion = (x) => {
        x = x.toString();
        let lastThree = x.substring(x.length - 3);
        const otherNumbers = x.substring(0, x.length - 3);
        if (otherNumbers != '')
            lastThree = ',' + lastThree;
        const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return res;
    }

    const CourseItem = (item: Course) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Details", {
                        courseId: item.id,
                        courseName: item.title,
                        courseInstructor: item.instructor,
                    });
                }}
                style={[
                    tw`m-2 bg-gray-50 rounded-xl flex flex-col justify-around`,
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
                <View style={tw`rounded-lg`}>
                    <Text
                        style={tw`font-semibold  ${
                            item.paid
                                ? "p-2"
                                : "text-yellow-800 py-1 px-2 m-2 bg-yellow-100 w-12"
                        }`}>
                        {item.paid ? `₹ ${moneyConversion(item.cost)}` : "Free"}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <View style={tw`bg-white flex-1`}>
            <View style={tw`flex-row px-2 justify-between`}>
                <Text style={tw`text-lg my-2 font-semibold`}>{categoryName}</Text>
            </View>
            <FlatList
                data={courses}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(course) => course.id}
                renderItem={({item}) => CourseItem(item)}
            />
        </View>
    );
}

export default CoursesList;
