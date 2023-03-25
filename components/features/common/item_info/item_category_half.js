import React, { useContext,useState, useRef, useEffect } from 'react'
import { Image, StyleSheet, View, Text ,TouchableOpacity, FlatList} from 'react-native'
import { ThemeContext } from '../../../theme/theme_context'
import { fonts, fontSizes } from '../../../uitls/my_fonts'
import { FontAwesome } from '@expo/vector-icons'; 
import colors from '../../../uitls/colors';
import { shortNumbers } from '../common_functions';
import LottieView from "lottie-react-native";
import { useSelector, useDispatch } from 'react-redux'
import { addFavorite, removeFavorite } from '../../../../redux/favorite_reducer';
import { Dimensions } from 'react-native';
import { ItemInfoHalf } from './item_info_half';
import { Spacer } from '../common_components';

const width=Dimensions.get('window').width;

export const ItemCategoryHalf = ({Catogary,currItemId, navigateTo, darBack}) =>{
    const {theme, darkMode} =useSelector(state => state.theme)

    return (
        <View style={{flex:1, flexWrap:'wrap',flexDirection:'row', paddingBottom:6, backgroundColor:theme.background, paddingTop:10}}>
            {Catogary.map((item, index)=>{
                if(item.id==currItemId){
                    return null
                }
                return(
                    <View  key={index} style={{flexBasis:'50%', paddingBottom:6}}>
                        <TouchableOpacity  key={index} activeOpacity={0.8} onPress={()=>navigateTo('ItemDetails', {item})}>
                            <ItemInfoHalf  item={item} />
                        </TouchableOpacity>
                    </View>
                )
            })
            }
            <Spacer padding={10}/>
        </View>)
}
