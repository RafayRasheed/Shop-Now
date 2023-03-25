import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import { Dimensions, TouchableOpacity } from "react-native";
import { StatusBar } from "react-native";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { cartClear } from "../../../redux/cart_reducer";
import colors from "../../uitls/colors";
import { fonts, fontSizes } from "../../uitls/my_fonts";
import { Spacer } from "../common/common_components";
import { CartItemInfo } from "./cart.component/cart_item_info";

const height=Dimensions.get('window').height

export const CartScreen=({navigation, route})=>{
    const {theme , darkMode}=useSelector(state=>state.theme)
    const {cart, amount}=useSelector(state=>state.cart)
    const dispatch=useDispatch()

    return(
        <SafeAreaView style={{flex:1,backgroundColor: theme.backgroundP, justifyContent:'space-between'}}>
            <StatusBar barStyle={darkMode?'light-content':'dark-content'} backgroundColor={theme.background}/>
            {/* Top */}
            <View style={{flex:1, backgroundColor:theme.background, borderBottomStartRadius:35, borderBottomEndRadius:35, elevation:3,shadowColor:theme.shadow}}>
                {/* My Cart Heading */}
                <View style={{paddingVertical:10,paddingHorizontal:20,flexDirection:'row', justifyContent:'space-between', alignItems:'flex-end'}}>
                    <Text style={{color:theme.text, fontFamily:fonts.headingLight, fontSize:fontSizes.xLarge}}>My Cart</Text>
                    <TouchableOpacity style={{}} activeOpacity={0.5} onPress={()=>dispatch(cartClear())}>
                        <Text style={{color:theme.primary, fontFamily:fonts.bodyBold, fontSize:fontSizes.medium}}>Clear All</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{padding:12}}>
                    {cart.map((cartItem, i)=>{
                        const item=cartItem.item
                        return(
                            <TouchableOpacity key={i} activeOpacity={0.6} onPress={()=>navigation.navigate('ItemDetails',{item})}>
                                <CartItemInfo cartItem={cartItem} index={i}/>
                            </TouchableOpacity> 
                        )
                    })}
                </ScrollView>
                <Spacer padding={15}/>
            </View>

            {/* Bottom */}
            <View style={{padding:15, justifyContent:'flex-end'}}>
                <Spacer padding={10}/>
                {/* Balance & Items*/}
                <View style={{flexDirection:'row', justifyContent:'space-between',}}>

                    <View>
                        <Text style={{color:theme.textL, fontFamily:fonts.bodyBold, fontSize:fontSizes.small}}>Items </Text>
                        <Text style={{color:theme.primary, fontFamily:fonts.headingLight, fontSize:fontSizes.large}}>{cart.length}</Text>
                    </View>
                    <View>
                        <Text style={{color:theme.textL, fontFamily:fonts.bodyBold, fontSize:fontSizes.small}}>Your Balance </Text>
                        <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                            <Text style={{color:theme.primary, fontFamily:fonts.headingLight, fontSize:fontSizes.xSmall, paddingBottom:2}}>Rs. </Text>
                            <Text style={{color:theme.primary, fontFamily:fonts.headingLight, fontSize:fontSizes.large}}>2011540</Text>
                        </View>
                    </View>

                </View>
                <Spacer padding={3}/>

                {/* Amount & Buy */}
                <View style={{flexDirection:'row', justifyContent:'space-between',}}>
                    <View>
                        <Text style={{color:theme.textL, fontFamily:fonts.bodyBold, fontSize:fontSizes.xSmall}}>Amount </Text>
                        <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                            <Text style={{color:theme.primary, fontFamily:fonts.headingLight, fontSize:fontSizes.xLarge, paddingBottom:2}}>Rs. </Text>
                            <Text style={{color:theme.primary, fontFamily:fonts.headingLight, fontSize:fontSizes.xLarge+7}}>{amount}</Text>
                        </View>
                    </View>
                
                    <TouchableOpacity activeOpacity={0.6} style={{justifyContent:'flex-end',paddingBottom:6}}>
                        <Text style={{color:theme.text,paddingVertical:5,paddingHorizontal:20,borderWidth:1, borderRadius:20, borderColor:theme.text , fontFamily:fonts.headingLight,fontSize:fontSizes.large-1,}}>Buy Now</Text>
                    </TouchableOpacity>
                </View>
                <Spacer padding={5}/>
            </View>
        </SafeAreaView>
    )
}
