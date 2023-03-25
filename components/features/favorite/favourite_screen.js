import React from 'react'
import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native';
import { View,StatusBar, ScrollView ,Text, TouchableOpacity } from "react-native";
import { useSelector } from 'react-redux';
import { fonts, fontSizes } from "../../uitls/my_fonts";
import { ItemDatailsFull } from './favorite.component/fav_item_datails';


export const FavoriteScreen=({navigation})=>{

    const {favorite}= useSelector(state => state.favorite)
    const {theme, darkMode} = useSelector(state => state.theme)
    const width= Dimensions.get('window').width
    
    return(
        <SafeAreaView style={styles(theme).container}>
            <StatusBar  barStyle = {darkMode?"light-content":"dark-content"} backgroundColor = {theme.background} />
            <Text style={styles(theme).textFav}>Favorites</Text>
            {favorite.length?( 
                <ScrollView >
                    {favorite.map((item, i)=>
                        <TouchableOpacity  key={i}  activeOpacity={0.6} onPress={()=>navigation.navigate('ItemDetails', {item})}>
                            <ItemDatailsFull item={item}/>
                        </TouchableOpacity>
                    )}
                </ScrollView>
                ):
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Text style={styles(theme).textNoFav}>No Favorites!</Text> 
                </View> 
            
            }
            
        </SafeAreaView>
    )
}

const styles=(theme)=>StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:theme.background
    },
    textFav:{
        color:theme.text,
        fontFamily:fonts.heading,
        fontSize:fontSizes.large,
        padding:10,
        paddingStart:20,
    },
    textNoFav:{
        color:theme.text,
        fontFamily:fonts.body,
        fontSize:fontSizes.xMedium,
    },
    scrollView:{
        padding:10,
    }


})