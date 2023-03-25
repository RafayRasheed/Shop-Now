import React, { useContext,useState, useRef, useEffect } from 'react'
import { Image, StyleSheet, View, Text ,TouchableOpacity} from 'react-native'
import { fonts, fontSizes } from '../../../uitls/my_fonts'
import { FontAwesome } from '@expo/vector-icons'; 
import colors from '../../../uitls/colors';
import { shortNumbers } from '../../common/common_functions';
import LottieView from "lottie-react-native";
import { useSelector, useDispatch } from 'react-redux'
import { addFavorite, removeFavorite } from '../../../../redux/favorite_reducer';


export const ItemInfo = ({item}) =>{
    // const {theme,darkMode} = useContext(ThemeContext)
    const {theme, darkMode} =useSelector(state => state.theme)
    const  [first, setFirst]  = useState(true);
    // const [isFavorite, setIsFavorite]=useState(true)
    const animation = useRef(null);
    const {favorite}= useSelector(state => state.favorite)
    const dispatch = useDispatch()
    const isFavorite = favorite.find(it=>it.id===item.id)

    useEffect(()=>{
        if(first){
            if(isFavorite){
                animation.current.play(62, 62);
            } 
            else{
                animation.current.play(181, 181);
            }
            setFirst(false)  
        }
        else{
            if(isFavorite){
                animation.current.play(16, 62);
            } 
            else{
          
                animation.current.play(110, 181);
            }
        }
    },[isFavorite])
    
    function changeFav(){
        if(isFavorite){
            dispatch(removeFavorite(item))
            return
        }
        dispatch(addFavorite(item))
    }
    return(
        <View style={styles(theme).container}>
            <TouchableOpacity style={{position:'absolute',zIndex:6,right:-5,top:-5}} onPress={()=>changeFav()}>
                <LottieView
                    ref={animation}
                    style={{height: 50, width: 50}}
                    source={require("../../../assets/Lottie/heart.json")}
                    autoPlay={false}
                    loop={false}
                />
            </TouchableOpacity>

            <Image style={{ borderBottomWidth:1,borderRadius:10 ,width: '100%',alignSelf:'center', height: '60%', resizeMode:'contain',  }} 
                source= {item.images[0]}/>
            <Text numberOfLines={1} style={styles(theme).textTitle}>{item.name}</Text>

            {/* Rating Detail & Sold */}
            <View style={styles(theme).containerVer}>
                <View style={{flexDirection:'row', }}>
                    <FontAwesome name="star" size={11} style={{paddingTop:2}}  color="#e6bc02" />
                    <Text style={styles(theme).textRating}> {item.rating}/5 ({shortNumbers(item.reviews)})</Text>
                </View>
                <Text style={styles(theme).textRating}> Sold: {shortNumbers(item.sold)}</Text>
            </View>

            {/* Price Detail & Sale */}
            <View style={styles(theme).containerVer}>
                <View style={{flexDirection:'row',}}>
                    <Text style={{fontSize:fontSizes.tiny,textAlignVertical: 'bottom',fontFamily:fonts.heading, color:theme.textC}}>Rs.</Text>
                    <Text style={{fontSize:fontSizes.small,fontFamily:fonts.heading, color:theme.textC,}}>{item.price}</Text>
                    <Text style={{paddingStart:3,paddingBottom:1,textDecorationLine: 'line-through',fontSize:fontSizes.tiny-1,textAlignVertical: 'bottom',fontFamily:fonts.heading, color:theme.textL}}>
                    {item.oldPrice}
                    </Text>
                </View>
                <Text style={{fontSize:fontSizes.tiny+0.5,fontFamily:fonts.heading,color:theme.danger,}}> -{item.discount}</Text>
            </View>

        
        </View>
    )
}

const styles=(theme)=>StyleSheet.create({
    container:{
        width:160,
        height:145,
        borderRadius:12,
        margin:5,
        marginTop:0, 
        padding:6,
        backgroundColor:theme.cardBack,
        elevation:3,
        shadowColor:theme.shadow        
    },

    containerVer:{
        flexDirection:'row', alignItems:'center', justifyContent:'space-between'
    },
    
    textTitle:{
        color:theme.text,
        fontFamily:fonts.heading,
        fontSize:fontSizes.tiny,
        alignSelf:'center',
        padding:2,
        paddingTop:3,
    },

    textRating:{
        fontSize:fontSizes.veryTiny+1, fontFamily:fonts.heading, color:theme.textL,
    },

    starIcon:{
        width:2,
        height:2,
    },

})