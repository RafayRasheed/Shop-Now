import React from 'react'
import {ActivityIndicator, View } from 'react-native'
import LottieView from "lottie-react-native";
export const Seperator=({s})=>(<View style={{paddingTop:s}}/>)

export const Loading =({color})=>(

    <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,  justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size={50} color={color}/>
        {/* <LottieView
            source={require("../../assets/Lottie/heart.json")}
            autoPlay={true}
            loop={false}
        /> */}
    </View>
)

export const Devider=({backgroundColor})=>(
    <View style={{width, height:0.5, backgroundColor:backgroundColor}}/>
)

export const Spacer=({padding=0, paddingEnd=0})=>(
    <View style={{paddingTop:padding, paddingEnd:paddingEnd}}/>
)