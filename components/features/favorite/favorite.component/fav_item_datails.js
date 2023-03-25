import React, { useContext,useState, useRef, useEffect } from 'react'
import { Image, StyleSheet, View, Text ,TouchableOpacity, Dimensions, ScrollView} from 'react-native'
import { fonts, fontSizes } from '../../../uitls/my_fonts'
import colors from '../../../uitls/colors';
import { shortNumbers } from '../../common/common_functions';
import LottieView from "lottie-react-native";
import { useSelector, useDispatch } from 'react-redux'
import { addFavorite, removeFavorite } from '../../../../redux/favorite_reducer';
import { Spacer } from '../../common/common_components';
import { RatingStars } from '../../home/home.component/rating_stars';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { ImagesShortViewer } from '../../common/image_short_viewer';

const width = Dimensions.get('window').width
export const ItemDatailsFull = ({item}) =>{
    // const {theme,darkMode} = useContext(ThemeContext)
    const {theme, darkMode} =useSelector(state => state.theme)
    const  [first, setFirst]  = useState(true);
    // const [isFavorite, setIsFavorite]=useState(true)
    const animation = useRef(null);
    const {favorite}= useSelector(state => state.favorite)
    const dispatch = useDispatch()

    const isFavorite = favorite.find(it=>it.id===item.id)
    const delivery=item.delivery

    const Heading=({text})=>(
        <Text style={{color:theme.textL, fontFamily:fonts.bodyBold, fontSize:fontSizes.small-1}}>{text}</Text>
    )
    const Content=({text})=>(
        <Text style={{color:theme.text, fontFamily:fonts.headingLight, fontSize:fontSizes.small}}>{text}</Text>
    )

    useEffect(()=>{
        if(isFavorite){
            animation.current.play(62, 62);
            return
        } 
        animation.current.play(181, 181);
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

            <TouchableOpacity style={{position:'absolute',zIndex:6,right:-5,top:-10}} onPress={()=>changeFav()}>
                <LottieView
                    ref={animation}
                    style={{height: 75, width: 75}}
                    source={require("../../../assets/Lottie/heart.json")}
                    autoPlay={false}
                    loop={false}
                />
            </TouchableOpacity>
            <Image style={{ borderBottomWidth:1,borderRadius:10 ,width: '100%',alignSelf:'center', height: 140, resizeMode:'contain',  }} 
                source= {item.images[0]}/>
            
       
            {/* Title */}
            <View style={{paddingHorizontal:15, alignItems:'center'}}>
                <Text numberOfLines={1} style={{color:theme.text,fontFamily:fonts.heading, 
                    fontSize:fontSizes.xMedium, }}>{item.name}</Text>
            </View>



            {/* Price Detail & Sale */}
            <View style={[styles(theme).containerVer, {marginTop:0}]}>
                <View style={{flexDirection:'row',}}>
                    <Text style={{fontSize:fontSizes.xSmall,paddingBottom:2,textAlignVertical: 'bottom',
                        fontFamily:fonts.heading, color:theme.textC}}
                        >Rs.</Text>
                    <Text style={{fontSize:fontSizes.xLarge,fontFamily:fonts.heading, color:theme.textC,}}>
                        {item.price}</Text>
                    <Text style={{paddingStart:5,paddingBottom:3,textDecorationLine: 'line-through',
                        fontSize:fontSizes.small,textAlignVertical: 'bottom',fontWeight:'800', 
                        fontFamily:fonts.bodyBold, color:theme.textL}}>
                        {item.oldPrice}
                    </Text>
                </View>
                <Text style={{fontSize:fontSizes.xSmall,fontFamily:fonts.heading,color:theme.danger,
                    paddingBottom:2, alignSelf:'flex-end'}}
                > -{item.discount}</Text>
            </View>

             {/* Rating Detail & Sold */}
            <View style={[styles(theme).containerVer, {marginTop:-5}]}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flexDirection:'row', alignSelf:'center'}}>
                        <RatingStars rating={item.rating}/>
                    </View>
                    <Text style={{fontSize:fontSizes.medium, fontFamily:fonts.headingLight, color:theme.text}}
                    >  {item.rating}</Text>
                    <Text style={{fontSize:fontSizes.medium, fontFamily:fonts.bodyBold, color:theme.text}}
                    >/5  </Text>
                    <Text style={{fontSize:fontSizes.small, fontFamily:fonts.bodyBold, color:theme.text, 
                        alignSelf:'center', paddingBottom:2}}
                        >({shortNumbers(item.reviews)})</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:fontSizes.small, fontFamily:fonts.heading, color:theme.text,}}
                        > Sold: </Text>
                    <Text style={{fontSize:fontSizes.small, fontFamily:fonts.bodyBold, color:theme.text,}}
                        >{shortNumbers(item.sold)}</Text>
                </View>
            </View>

            {/* Delivery */}
            <View style={styles(theme).containerVer}>
                {delivery.free &&(
                    <Text style={{alignSelf:'center',marginTop:4,paddingHorizontal:12,fontSize:fontSizes.tiny, 
                    fontFamily:fonts.bodyBold, borderWidth:1, borderColor:theme.primary, color:theme.primary, borderRadius:10}}
                    >Free  Delivery</Text>
                )}
                {!delivery.free && (
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Heading text={'Delivery Charges: '}/>
                        <Content text={shortNumbers(delivery.charges)+' Rs'}/>
                    </View>
                )}
                
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Heading text={'Receive: '}/>
                    <Content text={delivery.receive+' Days'}/>
                </View>
            </View>
            <Spacer padding={2}/>
        </View>
    )
}



const styles=(theme)=>StyleSheet.create({
    container:{
        width:width-24,
        borderRadius:12,
        margin:12,
        marginTop:0, 
        padding:6,
        backgroundColor:theme.cardBack,
        elevation:3,
        shadowColor:theme.shadow        
    },

    containerVer:{
        flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingStart:2, paddingEnd:5
    },
    
    textTitle:{
        color:theme.text,
        fontFamily:fonts.headingBold,
        fontSize:fontSizes.tiny,
        alignSelf:'center',
        padding:2,
        paddingTop:3,
    },

    textRating:{
        fontSize:fontSizes.veryTiny+1, fontFamily:fonts.heading, color:theme.textL,
    },



})