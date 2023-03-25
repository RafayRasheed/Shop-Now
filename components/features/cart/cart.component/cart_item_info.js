import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Image, StyleSheet} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Spacer } from "../../common/common_components";
import { AntDesign } from '@expo/vector-icons';
import { fonts, fontSizes } from "../../../uitls/my_fonts";
import { removeCart, updateAmount } from "../../../../redux/cart_reducer";

export const CartItemInfo=({cartItem, index})=>{
    const {theme, darkMode}=useSelector(state=>state.theme) 
    const item=cartItem.item
    const dispatch=useDispatch()

    const [quantity, setQuantity] = useState(cartItem.quantity)
    const [totalPrice, setTotalPrice] = useState(cartItem.totalPrice)

    const Heading=({text, fontSize=fontSizes.small})=>(
        <Text style={{color:theme.textL, fontFamily:fonts.bodyBold, fontSize:fontSize}}>{text}</Text>
    )
    const Content=({text, fontSize=fontSizes.small+1})=>(
        <Text style={{color:theme.text, fontFamily:fonts.bodyBold, fontSize:fontSize}}>{text}</Text>
    )

    function increment(){
        cartItem.quantity+=1
        cartItem.totalPrice+=item.price

        dispatch(updateAmount(item.price))
        setQuantity(cartItem.quantity)
        setTotalPrice(cartItem.totalPrice)
    }

    function decriment(){
        
        if(quantity>1){
            cartItem.quantity-=1
            cartItem.totalPrice-=item.price

            dispatch(updateAmount(-1*(item.price)))
            setQuantity(cartItem.quantity)
            setTotalPrice(cartItem.totalPrice)
        }
    }

    useEffect(()=>{
        setQuantity(cartItem.quantity)
        setTotalPrice(cartItem.totalPrice)
    },[cartItem])

    return(
        <View style={styles(theme).container}>
            <Image style={styles(theme).image} 
                source= {item.images[0]}/>
                
            <View style={{flex:1,paddingStart:10, justifyContent:'space-between'}}>
                {/* Detail */}
                <View style={{paddingHorizontal:5, paddingTop:5}}>
                    <Text numberOfLines={1} style={{color:theme.text, fontFamily:fonts.heading, fontSize:fontSizes.xSmall}}>{item.name}</Text>
                    <Spacer padding={3}/>
                    <View style={{flexDirection:"row", justifyContent:'space-between', alignItems:'center'}}>
                        <View style={{flexDirection:"row"}}>
                            <Heading text={'Price: '}/>
                            <Content text={item.price} Rs/>
                        </View>
                        <View style={{flexDirection:"row"}}>
                            <Heading text={'Sub Total: '}/>
                            <Content text={totalPrice}/>
                        </View>
                    </View>
                </View>

                {/* Inc, Dec & Remove */}
                <View style={{flexDirection:'row',paddingEnd:5, justifyContent:'space-between', alignItems:'center' }}>
                    <View style={{flexDirection:'row',alignItems:'center' }}>
                        <TouchableOpacity activeOpacity={0.5} style={{padding:5}}  onPress={()=>decriment()}>
                            <AntDesign name="minus" size={25} color={theme.text} />
                        </TouchableOpacity>
                        
                        <Spacer paddingEnd={8}/>

                        <Text style={styles(theme).textQuantiy}>{quantity}</Text>
                        
                        <Spacer paddingEnd={8}/>

                        <TouchableOpacity activeOpacity={0.5} style={{padding:5}} onPress={()=>increment()}>
                           <AntDesign name="plus" size={22} color={theme.text} />
                        </TouchableOpacity>
                    </View>  

                    <TouchableOpacity activeOpacity={0.6} onPress={()=>dispatch(removeCart(cartItem))}>
                        <Text style={styles(theme).textRemove}>Remove</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
        
    )
} 
const styles=(theme)=>StyleSheet.create({
    container:{
        marginBottom:15,elevation:3,padding:5,flexDirection:'row',
        backgroundColor:theme.cardBack, borderRadius:10 
    },

    image:{
        borderBottomWidth:1,borderRadius:10,width: 100,alignSelf:'center', height: 100, resizeMode:'contain'
    },

    textRemove:{
        color:theme.textL, borderWidth:1,borderColor:theme.textL,borderRadius:5, paddingHorizontal:12,paddingVertical:2,
        fontFamily:fonts.bodyBold, fontSize:fontSizes.small,
    },

    textQuantiy:{
        color:theme.primary, borderWidth:1,borderColor:theme.primary,borderRadius:5, paddingHorizontal:10,
        fontFamily:fonts.headingLight, fontSize:fontSizes.large-2
    }





})