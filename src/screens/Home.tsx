import React, {useEffect, useState} from "react";
import {
    RefreshControl,
    SafeAreaView,
    ScrollView,
    Text,
} from "react-native";
import {Categories} from "../models";
import {DataStore, Predicates, SortDirection} from "@aws-amplify/datastore";
import tw from "tailwind-react-native-classnames";
import CoursesList from "./CoursesList";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

function Home({navigation}) {
    const [categories, setCategories] = useState<Categories[]>([]);
    const [refreshing, setRefreshing] = React.useState(true);

    useEffect(() => {
        DataStore.query(Categories, Predicates.ALL, {
            sort: (s) => s.createdAt(SortDirection.DESCENDING),
        }).then((categories) => {
            setCategories(categories);
            setRefreshing(false)
        });
    }, [refreshing]);

    return (
        <SafeAreaView style={tw`m-2`}>
            <Text style={tw`text-2xl font-bold text-red-600  p-2`}>Udemy Home</Text>
            <ScrollView showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => setRefreshing(true)}
                            />}>
                {categories.map((c, index) => {
                    return (
                        <CoursesList
                            navigation={navigation}
                            categoryId={c.id}
                            key={index}
                            categoryName={c.categoryName}
                        />
                    );
                })}
                <Text style={tw`p-10 self-center`}>@copyright 2021 Udemy</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Home;
