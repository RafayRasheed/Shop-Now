import React from 'react'
import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import { View,StatusBar, ScrollView ,Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { AllCatagories } from '../../assets/Data/data';
import { fonts, fontSizes } from "../../uitls/my_fonts";
import { ItemCategoryHalf } from '../common/item_info/item_category_half';
import {Ionicons} from '@expo/vector-icons';

export const CategoryScreen=({navigation, route})=>{

    const {theme, darkMode} = useSelector(state => state.theme)
    const width= Dimensions.get('window').width
    const {category}=route.params

    return(
        <SafeAreaView style={styles(theme).container}>
            <StatusBar  barStyle = {darkMode?"light-content":"dark-content"} backgroundColor = {theme.background} />
            
            <View style={{flexDirection:'row', alignItems:'center', paddingStart:10}}>
                <TouchableOpacity>
                    <Ionicons name={"arrow-back"} size={28} color={theme.text} onPress={()=>navigation.goBack()}/>
                </TouchableOpacity> 
                <Text style={styles(theme).textCat}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
            </View>

            <ScrollView style={{marginStart:-5}}>
                <ItemCategoryHalf Catogary={AllCatagories[category]} navigateTo={navigation.navigate}/>      
            </ScrollView>
        </SafeAreaView>
    )
}

const styles=(theme)=>StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:theme.background
    },
    textCat:{
        color:theme.text,
        fontFamily:fonts.headingLight,
        fontSize:fontSizes.xLarge,
        padding:10,
        paddingStart:20,
    },
    textNoFav:{
        color:theme.text,
        fontFamily:fonts.body,
        fontSize:fontSizes.xMedium,
    },

})