import React, { Component } from 'react';
import {Button, SafeAreaView, Image,Text, View} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import tw from "tailwind-react-native-classnames";

function WelcomeOnBoard(){
        return (
                <Onboarding
                    titleStyles={{ color: 'blue' }} // set default color for the title
                    pages={[
                        {
                            backgroundColor: '#1d1a1a',
                            image:  <Image resizeMode={"contain"}
                                           style={{width:400}}
                                           source={require('./../../assets/onboarding.png')} />,
                            title: 'Onboarding',
                            subtitle: 'Done with React Native Onboarding Swiper',
                            titleStyles: { color: 'red' }, // overwrite default color
                        },
                        {
                            backgroundColor: '#fe6e58',
                            image:  <Text style={tw`text-4xl`}>Hello and, welcome here</Text>,
                            title: 'The Title',
                            subtitle: 'This is the subtitle that sumplements the title.',
                        },
                        {
                            backgroundColor: '#999',
                            image:  <Image source={require('./../../assets/onboarding.png')} />,
                            title: 'Triangle',
                            subtitle: "Beautiful, isn't it?",
                        },
                    ]}
                />

        );

}

export default WelcomeOnBoard;
