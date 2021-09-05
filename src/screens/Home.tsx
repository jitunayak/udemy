import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Categories, Course} from "../models"
import {DataStore, Predicates, SortDirection} from "@aws-amplify/datastore";
import tw from "tailwind-react-native-classnames";
import CoursesList from "./CoursesList";

function Home({navigation}) {
    const [categories, setCategories] = useState<Categories[]>([]);
    const [coursesList, setCoursesList] = useState<Course[]>([]);
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        DataStore.query(Categories, Predicates.ALL,
            {sort: s=> s.createdAt(SortDirection.DESCENDING)})
            .then((categories) => {
                setCategories(categories);
                setLoaded(true)
                //console.log(categories)
            })
    }, []);


    return (
        <SafeAreaView style={tw`bg-white m-2`}>
            {
                loaded?<></>:<ActivityIndicator/>
            }
            <Text style={tw`text-2xl font-bold text-red-600  p-2`}>Udemy Home</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    categories.map((c, index) => {
                        return (
                            <CoursesList navigation={navigation} categoryId={c.id} key={index} categoryName={c.categoryName}/>
                        )
                    })
                }
                <Text style={tw`p-10 self-center`}>
                    @copyright 2021 Udemy
                </Text>
            </ScrollView>

        </SafeAreaView>
    );

}

export default Home;
