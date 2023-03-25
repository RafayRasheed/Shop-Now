import React, { useContext, useState } from 'react';
import { SafeAreaView,Text, StatusBar, StyleSheet, TouchableOpacity ,Image, View, ScrollView, Button} from 'react-native'
import { fonts, fontSizes } from '../../uitls/my_fonts'
import {Searchbar} from 'react-native-paper';
import {Ionicons} from '@expo/vector-icons'
import colors from '../../uitls/colors';
import { ImageSlider } from './home.component/image_slider';
import { Seperator } from '../common/common_components';
import { ItemInfo } from './home.component/item_info_small';
import { useSelector, useDispatch } from 'react-redux';
import {AllCatagories} from '../../assets/Data/data';


const sales = [
    {url: require('../../assets/images/sales/Sale1.jpg')},
    {url: require('../../assets/images/sales/Sale2.jpg')},
    {url: require('../../assets/images/sales/Sale3.jpg')},
    {url: require('../../assets/images/sales/Sale4.jpg')},
  ];
const categories=[
    {name:'Fashion',icon:require('../../assets/icons/categories/fashion.png')},
    {name:'Electronics',icon:require('../../assets/icons/categories/electronics.png')},
    {name:'Beauty',icon:require('../../assets/icons/categories/beauty.png')},
    {name:'Games',icon:require('../../assets/icons/categories/games.png')},
    {name:'Toys',icon:require('../../assets/icons/categories/toys.png')},
    {name:'Furniture',icon:require('../../assets/icons/categories/furniture.png')},
]

const Heading=({text, theme})=>(
    <Text style={styles(theme).textHeading}>{text}</Text>
)

const RightHeading=({text, theme})=>(
    <Text style={styles(theme).textRightHeading}>{text}</Text>
)

export const HomeScreen=({navigation})=>{
    // const { darkMode} = useContext(ThemeContext)
    const [key, setKey]=useState();
    const {theme, darkMode} = useSelector(state => state.theme)

    const myTheme = { 
        colors: {
          primary: theme.search,
        }
    }

    const Category=({category , index})=>{
        return(
            <View style={{width:80,alignItems:'center'}}>
                {/* Category Image */}
                <View style={{width: 50,height: 50,backgroundColor:theme.iconBack,justifyContent:'center',alignItems:'center',borderRadius:100}}>
                    <Image onLoadEnd={null}
                        key={index}
                        resizeMode="contain"
                        style={{width: 30, height: 30,}} 
                        source= {category.icon}/>
                </View>

                {/* Category Text/\ */}
                <Text numberOfLines={1} style={{paddingVertical:2,color: theme.text,textAlign:'center',fontSize:fontSizes.tiny, fontFamily:fonts.bodyBold}}>{category.name}</Text>
            </View>
         )
    }

    const Trending=({catName, index})=>{
        const name=catName.charAt(0).toLowerCase() + catName.slice(1)
        const cat=AllCatagories[name]
        if (cat){
            return(
                <View key={index}>
                    {/* Trending Heading */}
                    <View  key={index} style={{ padding:8,paddingBottom:2,flexDirection: 'row', justifyContent:'space-between',alignItems:'center'}}>
                        <Heading text={'Trending on '+catName} theme={theme}/>
                        <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('CategoryScreen', {category:name})}>
                            <RightHeading text={'VIEW ALL'} theme={theme}/>
                        </TouchableOpacity>
                    </View>

                    {/* Trending*/}
                    <ScrollView contentContainerStyle={{flexGrow: 1 ,justifyContent: 'space-between'}} 
                        style={styles(theme).scrollViewHori}  
                        showsHorizontalScrollIndicator={false} horizontal>
                        {cat.map((item, i)=>
                            <TouchableOpacity key={i} activeOpacity={0.6} onPress={()=>navigation.navigate('ItemDetails',{item})}>
                                <ItemInfo item={item}/>
                            </TouchableOpacity>)
                        }
                    </ScrollView>

                    <Seperator s={5}/>
                </View>
            )
        }
        return null
    }



    return (
        <SafeAreaView style={[styles(theme).container]}>
            <StatusBar  barStyle = {darkMode?"light-content":"dark-content"} backgroundColor = {theme.background} />
            
            {/* Top Bar */}
            <View style={styles(theme).containerTopBar}>
                
                <View style={{width:'75%',paddingStart:10}}> 
                    <Searchbar 
                        icon= {()=><Ionicons name='search-sharp' size={18}  color={theme.search}/>}
                        placeholder='Search' placeholderTextColor={theme.search} theme={myTheme}
                        iconColor={theme.search} value = {key} inputStyle={styles(theme).searchBarInput}
                        style={styles(theme).searchBar} onChangeText= {(value)=> {setKey(value)}}
                        onSubmitEditing = {()=> {console.log('ok')}}
                    /> 
                </View>
                <TouchableOpacity activeOpacity={0.5} onPress={()=>null}>
                    <Text style={{position:'absolute', zIndex:5, backgroundColor:colors.red, borderRadius:20, 
                                paddingHorizontal:5, color:colors.white, fontSize:fontSizes.tiny, start:22, top:-4}}>1</Text>
                    <Ionicons name='ios-notifications-sharp' size={25} style={{paddingStart:8}} color={colors.gold}/>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons name={"wallet-outline"} style={{paddingHorizontal:8}} size={27} color={theme.text} onPress={()=>null}/>
                </TouchableOpacity>

            </View>

            {/* Home */}
            <ScrollView>
                <ImageSlider images={sales} height={150}/>

                {/* Categories Heading */}
                <View  style={{ padding:8,paddingBottom:2,flexDirection: 'row', justifyContent:'space-between',alignItems:'center'}}>
                    <Heading text={'Top Categories'} theme={theme}/>
                    <TouchableOpacity activeOpacity={0.5}>
                        <RightHeading text={'MORE'} theme={theme}/>
                    </TouchableOpacity>
                </View>

                {/* Categories */}
                <ScrollView  contentContainerStyle={{flexGrow: 1 ,justifyContent: 'space-between'}} 
                    style={styles(theme).scrollViewHori}  
                    showsHorizontalScrollIndicator={false} horizontal>
                    {
                        categories.map((category, i)=>{
                            const name=category.name.charAt(0).toLowerCase() + category.name.slice(1)
                            const all=AllCatagories[name]
                            return(
                                <TouchableOpacity key={i} activeOpacity={0.6} onPress={()=>all?navigation.navigate('CategoryScreen', {category:name}):null}>
                                <Category category={category} index={i} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>

                <Seperator s={5}/>

                
                {categories.map((category, i)=><Trending catName={category.name} index={i} />)}

               
                {/* <View style={{paddingTop:100, alignSelf:'center'}}>
                    <Button color={theme.primary} onPress={()=>setDarkMode(!darkMode)} style={{}} title='Theme'/>
                </View> */}

           
            </ScrollView>

        </SafeAreaView>
    )
}

const styles =(theme)=> StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.background,
    },
    containerTopBar:{
        width:'100%',paddingVertical:5,flexDirection:'row',justifyContent:'space-between',
        alignItems:'center'
    },
    searchBar:{
        height:37, backgroundColor: theme.searchBar, borderRadius:100 ,shadowColor:theme.shadow,
    },
    searchBarInput:{
        color: theme.text,fontSize:fontSizes.small, fontFamily:fonts.bodyBold 
    },
    textHeading:{
        color:theme.text, fontFamily:fonts.heading, fontSize:fontSizes.medium
    },
    textRightHeading:{
        color:theme.primary,paddingHorizontal:2, fontFamily:fonts.bodyBold, fontSize:fontSizes.small
    },
    scrollViewHori:{
        paddingVertical:7, flexGrow:0 ,backgroundColor:theme.background, elevation:1 ,
        shadowColor:theme.shadow
    }

})