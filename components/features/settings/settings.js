import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Switch, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import { fonts, fontSizes } from '../../uitls/my_fonts'
import { setMode } from '../../../redux/theme_reducer';
import { useSelector, useDispatch } from 'react-redux';

const fashion =[
    {id:1,name:'Watch Infinity Calling',rating:3.1,reviews:342000, sold:512000,price:1299, oldPrice:1599,
    discount:'10%', images:[require('../../assets/images/fashion/watch.png'),require('../../assets/images/fashion/bag.jpg'),require('../../assets/images/meakup/hair_dryer.jpg'), require('../../assets/images/meakup/whitening_cream.jpg')],
    discription:'',specification:'', stock:510, soldBy:{name:'Mr_RR', id:''},
    services:{return:2, warranty:0}, 
    delivery:{free:true ,charges:120 ,receive:2, freeOn:4, cashOnDelivery:true},
    },

    {id:2,name:'Leather Bag',rating:4.3,reviews:41, sold:55,price:1199, oldPrice:1449,
    discount:'15%', images:[require('../../assets/images/fashion/bag.jpg')]},

    {id:3,name:'Sun Glasses',rating:5.0,reviews:21, sold:40,price:899, oldPrice:1199,
    discount:'30%', images:[require('../../assets/images/fashion/glasses.jpg')]},

    {id:4,name:'Hoodie',rating:3.5,reviews:411, sold:754,price:1599, oldPrice:1200,
    discount:'35%', images:[require('../../assets/images/fashion/hoodie.jpg')]},

    {id:5,name:'Neckles',rating:4.9,reviews:501, sold:'1k',price:3999, oldPrice:4999,
    discount:'30%', images:[require('../../assets/images/fashion/neckles.jpg')]},
]

export const Settings=()=>{
    // const {theme, darkMode, setDarkMode}=useContext(ThemeContext)
    const dispatch = useDispatch()
    const {theme, darkMode} = useSelector(state => state.theme)
    // const {favorite}= useSelector(state => state.favorite)
    // console.log(favorite)
    // useEffect(() => {
    //     setIsEnabled(darkMode)
    //   },[darkMode]);
    return(
        <SafeAreaView style={styles(theme).container}>
            <StatusBar  barStyle = {darkMode?"light-content":"dark-content"} backgroundColor = {theme.background} />
            
            <View style={styles(theme).horizontalView}>
                <Text style={styles(theme).textHeading}>Dark Mode</Text>
                <Switch
                    trackColor={{false: theme.textL, true: theme.primary}}
                    thumbColor={theme.cardBack}
                    style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                    ios_backgroundColor={theme.cardBack}
                    onValueChange={()=>dispatch(setMode(!darkMode))}
                    value={darkMode}
                />
            </View>
            {/* <TouchableOpacity onPress={()=>dispatch(addFavorite(fashion[0]))}>
                <Text>add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>dispatch(removeFavorite(fashion[0]))}>
                <Text>remove</Text>
            </TouchableOpacity> */}
        </SafeAreaView>
    )
}
const styles=(theme)=>StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: theme.background,
    },
    horizontalView:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        alignItems:'center'


    },
    textHeading:{
        fontFamily:fonts.headingLight,
        fontSize:fontSizes.medium,
        color:theme.text,

    },
})