import React, { useState, useRef, useEffect } from 'react'
import { Dimensions, Image, Text, StyleSheet, TouchableOpacity, View,  StatusBar, TextInput} from 'react-native'
import { ImagesShortViewer } from '../common/image_short_viewer'
import colors from '../../uitls/colors'
import { RatingStars } from './home.component/rating_stars'
import { shortNumbers } from '../common/common_functions'
import LottieView from "lottie-react-native";
import { fonts, fontSizes } from '../../uitls/my_fonts'
import { Spacer } from '../common/common_components'
import { ScrollView } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons, Ionicons ,Fontisto,AntDesign   } from '@expo/vector-icons'; 
import { useSelector, useDispatch } from 'react-redux'
import { addFavorite, removeFavorite } from '../../../redux/favorite_reducer'
import { AllCatagories } from '../../assets/Data/data'
import { ItemCategoryHalf } from '../common/item_info/item_category_half'
import { addCart} from '../../../redux/cart_reducer'

export const ItemDetails=({navigation, route})=>{
    // const {theme, darkMode} = useContext(ThemeContext)
    const {theme, darkMode} =useSelector(state => state.theme)

    const [i, setI]=useState(0)
    const {item} =route.params;

    const dispatch =useDispatch()

    const {favorite}= useSelector(state => state.favorite)
    const isFavorite = favorite.find(it=>it.id===item.id)

    const images = item.images
    const width= Dimensions.get('window').width 
    const  [first, setFirst]  = useState(true);
    const animation = useRef(null);

    const delivery=item.delivery
    const services=item.services
    const comments=item.comments

    const [totalPrice, setTotalPrice] = useState(item.price)
    const [noOfItems, setNoOfItems] = useState('1')

    useEffect(()=>{
        if (noOfItems){
            let s =parseInt(item.price)*parseInt(noOfItems)
            setTotalPrice(s.toString())
        }
    },[noOfItems])

        
    function calTotalPrice(noOfItems){
        setNoOfItems(noOfItems)
        if(noOfItems){
            return
        }
        setTotalPrice(item.price) 
    }
    function increment(){
        if(noOfItems){
            setNoOfItems((parseInt(noOfItems)+1).toString())
            return
        }
        setNoOfItems('1')
    }
    function decriment(){
        if(noOfItems && parseInt(noOfItems)>1){
            setNoOfItems((parseInt(noOfItems)-1).toString())
            return
        }
        setNoOfItems('1')
    }
    
    const Heading=({text, fontSize=fontSizes.small})=>(
        <Text style={{color:theme.textL, fontFamily:fonts.bodyBold, fontSize:fontSize}}>{text}</Text>
    )
    const Content=({text, fontSize=fontSizes.small+1})=>(
        <Text style={{color:theme.text, fontFamily:fonts.bodyBold, fontSize:fontSize}}>{text}</Text>
    )
    const Devider=()=>(
        <View style={{width, height:0.5, backgroundColor:theme.devider}}/>
    )
    
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

    function addToCart(){
        dispatch(addCart({id:item.id,quantity:parseInt(noOfItems),totalPrice:parseInt(totalPrice) ,item:item}))
        setNoOfItems('1')
    }

    return(
        <View style={{ flex:1, backgroundColor:theme.background}}>

            <StatusBar  barStyle = {darkMode?"light-content":"dark-content"} backgroundColor = {theme.background} />
            <TouchableOpacity style={{position:'absolute',zIndex:6,right:-9,  top:-11}} onPress={()=>changeFav()}>
                <LottieView
                    ref={animation}
                    style={{height: 75, width: 75}}
                    source={require("../../assets/Lottie/heart.json")}
                    autoPlay={false}
                    loop={false}
                /> 
            </TouchableOpacity>

            {/* Top Bar */}
            <View style={{backgroundColor:theme.background,padding:10, width, flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                <TouchableOpacity>
                    <Ionicons name={"arrow-back"} size={30} color={theme.text} onPress={()=>navigation.goBack()}/>
                </TouchableOpacity>      
                
                <TouchableOpacity>
                        <Ionicons name={"wallet-outline"} style={{marginRight:55}} size={28} color={theme.text} onPress={()=>null}/>
                </TouchableOpacity>
            </View>

            <ScrollView style={{paddingBottom:100}}>

                {/* Image */}
                <ImagesShortViewer navigate={navigation.navigate} images={images}/>

                <Spacer padding={5}/>

                {/* Title */}
                <View style={{paddingHorizontal:15}}>
                    <ScrollView horizontal={true} style={{}} showsHorizontalScrollIndicator={false} contentContainerStyle={{flexGrow: 1 ,justifyContent: 'center', alignItems:'center'}} >
                        <Text style={{color:theme.text,fontFamily:fonts.headingLight, fontSize:fontSizes.medium, }}>{item.name}</Text>
                    </ScrollView>
                </View>

                <Spacer padding={5}/>

                {/* Price Detail & Sale */}
                <View style={styles(theme).containerVer}>
                    <View style={{flexDirection:'row',}}>
                        <Text style={{fontSize:fontSizes.large,paddingBottom:2,textAlignVertical: 'bottom',fontFamily:fonts.heading, color:theme.textC}}
                            >Rs.</Text>
                        <Text style={{fontSize:fontSizes.xLarge+5,fontFamily:fonts.heading, color:theme.textC,}}>
                            {item.price}</Text>
                        <Text style={{paddingStart:5,paddingBottom:3,textDecorationLine: 'line-through',fontSize:fontSizes.medium,
                            textAlignVertical: 'bottom',fontWeight:'800', fontFamily:fonts.bodyBold, color:theme.textL}}>
                            {item.oldPrice}
                        </Text>
                    </View>
                    <Text style={{fontSize:fontSizes.xMedium,fontFamily:fonts.heading,color:theme.danger,paddingBottom:2, alignSelf:'flex-end'}}
                    > -{item.discount}</Text>
                </View>

                {/* Rating Detail & Sold */}
                <View style={styles(theme).containerVer}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flexDirection:'row', alignSelf:'center'}}>
                            <RatingStars  rating={item.rating}/>
                        </View>
                        <Text style={{fontSize:fontSizes.xMedium, fontFamily:fonts.headingLight, color:theme.text}}
                        >  {item.rating}</Text>
                        <Text style={{fontSize:fontSizes.xMedium, fontFamily:fonts.bodyBold, color:theme.text}}
                        >/5  </Text>
                        <Text style={{fontSize:fontSizes.xSmall+1, fontFamily:fonts.bodyBold, color:theme.text, alignSelf:'center'}}
                            >({shortNumbers(item.reviews)})</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:fontSizes.xSmall, fontFamily:fonts.headingLight, color:theme.text,}}
                            > Sold: </Text>
                        <Text style={{fontSize:fontSizes.xSmall, fontFamily:fonts.bodyBold, color:theme.text,}}
                            >{shortNumbers(item.sold)}</Text>
                    </View>
                </View>

                <Spacer padding={10}/>

                {/* Delivery */}
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <MaterialCommunityIcons style={{paddingHorizontal:5 }} name="truck-fast-outline" size={18} color={theme.textL} />
                    <Content  text={'Delivery'}/>
                </View>
                <Devider/>

                <View style={{width, paddingHorizontal:10}}>
                    <Spacer padding={5}/>
                    {/* Row 1 */}
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        {delivery.free &&(
                            <Text style={{alignSelf:'center',padding:2,paddingHorizontal:15,fontSize:fontSizes.xTiny, 
                            fontFamily:fonts.bodyBold, borderWidth:1, borderColor:theme.primary, color:theme.primary, borderRadius:10}}
                            >Free Delivery</Text>
                        )}
                        {!delivery.free && (
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Heading text={'Charges: '}/>
                                <Content text={shortNumbers(delivery.charges)+' Rs'}/>
                            </View>
                        )}
                        {!delivery.free && (
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Heading text={'Free On: '}/>
                                <Content text={shortNumbers(delivery.freeOn)+' items'}/>
                            </View>
                        )}
                        
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Heading text={'Receive: '}/>
                            <Content text={delivery.receive+' Days'}/>
                        </View>
                    </View>
                    <Spacer padding={0}/>
                    <View style={{flexDirection:'row', alignSelf:'center'}}>
                        <Heading text={delivery.cashOnDelivery?'Cash On Delivery Availabe':'Cash On Delivery Not Availabe'}/>
                    </View>
                </View>

                <Spacer padding={10}/>

                 {/* Services */}
                 <View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <MaterialIcons name="settings" style={{paddingHorizontal:5 }} size={16}  color={theme.textL} />
                        <Content  text={'Services'}/>
                    </View>
                    <Devider/>
                    <Spacer padding={10}/>
                    <View style={[styles(theme).containerVer,{paddingHorizontal:10}]}>

                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Heading text={'Return: '}/>
                            <Content text={services.return}/>
                        </View>

                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Heading text={'Warranty: '}/>
                            <Content text={services.warranty}/>
                        </View>
                    </View>
    
                </View>
                
                <Spacer padding={20}/>

                {/* Description */}
                <View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <MaterialIcons name="description" style={{paddingHorizontal:5 }} size={16}  color={theme.textL} />
                        <Content  text={'Description'}/>
                    </View>

                    <Devider/>

                    <Spacer padding={5}/>
                    <View style={{width, paddingHorizontal:10}}>
                        <Heading text={item.description}/>
                    </View>
                </View>
            
                <Spacer padding={15}/>

                {/* Specification */}
                <View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <MaterialIcons name="description" style={{paddingHorizontal:5 }} size={16}  
                            color={theme.textL} />
                        <Content  text={'Specification'}/>
                    </View>

                    <Devider/>

                    <Spacer padding={5}/>
                    <View style={{width, paddingHorizontal:10,}}>
                        <Heading text={item.specification}/>
                    </View>
                </View>

                <Spacer padding={15}/>

                {/* Store */}
                <View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <MaterialIcons  name="store" style={{paddingHorizontal:5 }} size={18}  
                            color={theme.textL} />
                        <Content  text={'Store'}/>
                    </View>

                    <Devider/>
                    <Spacer padding={7}/>

                    <View style={{flexDirection:'row',paddingHorizontal:10,  alignItems:'center', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row'}}>
                            {/* Image */}
                            <View style={{width: 50,height: 50,backgroundColor:theme.iconBack,justifyContent:'center',alignItems:'center',borderRadius:100}}>
                                <Image 
                                    resizeMode="contain"
                                    style={{width: 30, height: 30,}} 
                                    source= {require('../../assets/images/store.png')}/>
                            </View>
                            {/* Name */}
                            <View style={{alignSelf:'center', paddingStart:7, paddingBottom:3}}>
                                <Text style={{color:theme.text,fontFamily:fonts.headingLight, fontSize:fontSizes.xMedium, }}>Someone</Text>
                                <Text style={{color:theme.textL,fontFamily:fonts.bodyBold, fontSize:fontSizes.small, marginTop:-5}}>Someone</Text>
                            </View>
                        </View>

                        <TouchableOpacity activeOpacity={0.5}>
                            <Text style={{alignSelf:'center',padding:2,paddingHorizontal:15,fontSize:fontSizes.xTiny, 
                                fontFamily:fonts.bodyBold,borderWidth:1,borderRadius:10, borderColor:theme.primary, color:theme.primary, }}
                            >Visit Store</Text>
                        </TouchableOpacity>
                    </View>
                    <Spacer padding={7}/>
                    <Devider/>
                </View>
                
                <Spacer padding={15}/>


                {/* Custom TabBar */}
                <View style={{width, flexDirection:'row',borderBottomWidth:0,borderBottomColor: 
                theme.textL,justifyContent:'space-evenly'}}>
                    <TouchableOpacity activeOpacity={0.7} style={{width:width/2.5, borderBottomWidth:i==0?1.5:0,
                        borderBottomColor: theme.primary, alignItems:'center', justifyContent:'center'}}
                        onPress={()=>setI(0)}>
                        <Text style={{fontFamily:fonts.bodyBold, color:theme.textL,fontSize:fontSizes.xMedium, 
                        color:i==0?theme.textC:theme.textL}}>Reviews</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity activeOpacity={0.7} style={{width:width/2.5, borderBottomWidth:i==1?1.5:0,
                        borderBottomColor: theme.primary, alignItems:'center', justifyContent:'center'}}
                        onPress={()=>setI(1)}>
                    <Text style={{fontFamily:fonts.bodyBold, color:theme.textL,fontSize:fontSizes.xMedium,
                        color:i==1?theme.textC:theme.textL}}>More Products</Text>
                    </TouchableOpacity>
                </View>

                <Spacer padding={12}/>

                {/* <Devider/> */}
                {!i?comments.map((comment, index)=>
                    <View key={index}>
                        <Spacer padding={10}/>
                        <View style={[styles(theme).containerVer,{paddingHorizontal:10}]}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Content text={comment.name}/>
                                <Spacer paddingEnd={15}/>
                                <Heading text={comment.date}/>
                            </View>
    
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <RatingStars size={12} rating={comment.rating}/>
                            </View>
                        </View>
 
                        <View style={{width, paddingHorizontal:10}}>
                            <Heading text={comment.comment}/>
                        </View>
                        <Spacer padding={7}/>

                        {index!=comments.length-1 && <Devider/>}
                    </View>
                    ):
                    <ItemCategoryHalf currItemId={item.id} Catogary={AllCatagories[item.category]} navigateTo={navigation.navigate}/>
                }
                <Spacer padding={23}/>

            </ScrollView>


            {/* Bottom */}
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',backgroundColor:theme.backgroundP, padding:10,borderTopStartRadius:15, borderTopEndRadius:15}}>
                {/* Total Price */}
                <View>
                    <Heading fontSize={fontSizes.tiny} text={'Total Price'}/>
                    <View style={{flexDirection:'row',}}>
                        <Text style={{fontSize:fontSizes.medium,paddingBottom:2,textAlignVertical: 'bottom',fontFamily:fonts.heading, color:theme.primary}}
                            >Rs.</Text>
                        <Text style={{fontSize:fontSizes.xLarge,fontFamily:fonts.heading, color:theme.primary,paddingStart:2}}>{totalPrice}</Text>
                    </View>
                </View>

                {/* Add Cart */}
                <View style={{flexDirection:'row', alignItems:'center',}}>
                    <View style={{justifyContent:'center',marginEnd:-2 }}>
                        <TouchableOpacity activeOpacity={0.5} style={{paddingTop:4,paddingHorizontal:2}} onPress={()=>increment()}>
                           <AntDesign name="plus" size={22} color={theme.textL} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} style={{paddingTop:2,paddingHorizontal:2}}  onPress={()=>decriment()}>
                            <AntDesign name="minus" size={22} color={theme.textL} />
                        </TouchableOpacity>
                    </View>
                    <TextInput 
                        style={{borderWidth:1,fontFamily:fonts.bodyBold,fontSize:fontSizes.xMedium, textAlign:'center',color: colors.white,borderRadius:5,backgroundColor:theme.primary, 
                                marginHorizontal:10,borderColor:theme.primary, padding:5.5, marginEnd:10}}
                        numberOfLines={1}
                        keyboardType='numeric'
                        cusorColor={colors.white}
                        selectionColor={colors.white}
                        contentContainerStyle={{colors:colors.white, }}
                        onChangeText={(text)=> calTotalPrice(text)}
                        value={noOfItems}
                        maxLength={4}  //setting limit of input
                    />
                    <TouchableOpacity onPress={()=>addToCart()} activeOpacity={0.9} style={{backgroundColor:colors.darkgreen,borderTopStartRadius:5,borderBottomStartRadius:5,  padding:10}}>
                        <Text style={{color:colors.white,fontSize:fontSizes.xSmall,  }}>Add to Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  activeOpacity={0.9} style={{backgroundColor:theme.primary, padding:10, borderTopEndRadius:5, borderBottomEndRadius:5}}>
                        <Text  onPress={()=>null} style={{color:colors.white,fontSize:fontSizes.xSmall }}>Buy Now</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    )
}

const styles=(theme)=>StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white,
    },
    containerVer:{
        flexDirection:'row', alignItems:'center', justifyContent:'space-between',paddingHorizontal:7,marginTop:-4
    },
    
})