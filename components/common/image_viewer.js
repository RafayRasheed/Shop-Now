import React, { useEffect, useRef, useState } from 'react'
import { Image, View , Dimensions, Animated, StyleSheet, Platform, StatusBar, SafeAreaView, Text, Modal, ScrollView} from 'react-native'
// import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import {Ionicons} from '@expo/vector-icons'
import colors from '../../uitls/colors';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export const ImagesViewer =({navigation, route})=>{
    
    // console.log(route)
    const scrollView=useRef(100)
    const {images} = route.params
    const i = route.params.index
    const [index, setIndex]= useState(i)
    // const [ratio, setRatio] = useState(1)
    const wid= Dimensions.get('window').width
    const image = images[index]
    const [ref, setRef] = useState(null);
    const [posX, setPosX] = useState([]);
    const [posY, setPosY] = useState([]);

    // const ratio=1
    const ratio=Image.resolveAssetSource(image).height/Image.resolveAssetSource(image).width
    const imgLength = images.length
    const [animationX, setAnimationX]= useState(new Animated.Value(0));
    const [showChange, setShowChange ] = useState(true)
    const [first, setFirst ] = useState(true)

    const [move, setMove ] = useState(false)
    const [start, setStart] = useState(0)
    // const [end, setEnd] = useState(0)

    // setRatio(Image.resolveAssetSource(image).height/Image.resolveAssetSource(image).width)
    const logOutZoomState = (event, gestureState, zoomableViewEventObject) => {
        setToFalse(false)
    }

    function slide(end){
        console.log(start-end)
    }
    function Start(){
        const pos= posX[i]
        ref.scrollTo({
            x: pos,
            y: 0,
            animated: false,
        });
    }

    function handlePressIn(){
        console.log(animationX)
        Animated.timing(animationX, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();

        setTimeout(()=>{
            setAnimationX(new Animated.Value(0))
        },200)
    }
  
    // Image.getSize(image, (width, height) => {
    //     console.log(width, height)

    //     setRatio(height/width)
    // })

    function onForward(){
        if(index <imgLength-1){
            
            // console.log('-------------');
            // console.log(posX);
            // console.log(posX[index]);
            const pos= posX[index+1]
            // console.log(pos);
            setIndex(index+1)

            ref.scrollTo({
                x: pos,
                y: 0,
                animated: true,
            });


            // Animated.timing(animationX, {
            //     toValue: -500,
            //     duration: 100,
            //     useNativeDriver: true,
            // }).start();


            // setTimeout(()=>{
            //     setAnimationX(new Animated.Value(500))
            //     setIndex(index+1)
            // },50)
        }
    }

    function onBack(){
        if(index>0){
            // console.log('-------------');
            // console.log(posX);
            // console.log(posX[index]);
            const pos= posX[index-1]
            // console.log(pos);
            setIndex(index-1)
            ref.scrollTo({
                x: pos,
                y: 0,
                animated: true,
            });


            // Animated.timing(animationX, {
            //     toValue: 500,
            //     duration: 100,
            //     useNativeDriver: true,
            // }).start();

            // setTimeout(()=>{
            //     setAnimationX(new Animated.Value(-500))
            //     setIndex(index-1)
            // },50)
        }
    }

    const swipeFromLeftOpen = () => {
        console.log('Swipe from left');
      };
    const swipeFromRightOpen = () => {
        console.log('Swipe from right');
    };
    
    const LeftSwipeActions = () => {
        console.log('LeftSwipeActions');
      };
    const rightSwipeActions = () => {
        console.log('rightSwipeActions');
    };
    function change(){
        // if(toFalse){
        //     setShowChange(!showChange)
        // }
        // else{setToFalse(true)}
    }

    return(
        <SafeAreaView style={styles.container}>
            {imgLength>1 && showChange && (
                <View style={[styles.containerChangeImage, styles.containerChangeLeft]}>
                    <Ionicons 
                        style={{paddingVertical: 25, opacity: index==0? 0.3: 1}} 
                        name={"ios-chevron-back-sharp"} size={40} color="#fff" onPress={onBack}/>
                </View>)
            }

          
            {imgLength>1 && showChange && (<View style={[styles.containerChangeImage, styles.containerChangeRight]}>
                <Ionicons 
                    style={{paddingVertical: 25,opacity: index==imgLength-1? 0.3: 1}} 
                    name={"ios-chevron-forward-sharp"} size={40} color="#fff" onPress={onForward} 
                />
                </View>)
            }
            {showChange && (
                <View style={styles.topBar}>
                <Ionicons name={"arrow-back"} size={30} color="#fff" onPress={()=>navigation.goBack()}/>
                {imgLength>1 && (<View style={{flexDirection: 'row'}}>
                    <Text style={{color: colors.white, fontSize: 25, alignSelf: 'center' }}>{index+1}/{imgLength}</Text>
                </View>)}
                <Ionicons name={"share-social"} size={25} color="#fff" />
                </View>
            )}


            <View style={{flex: 1,justifyContent: 'center'}} onTouchEnd={()=>change()}>
               
                    

                {/* <Animated.View  style={{transform: [{translateX: animationX}]}}>
                    <Image onLoadEnd={handlePressIn} 
                        key={index} resizeMode="contain"
                        style={{width:'100%', height:wid*ratio}}
                        source= {image}/>
                </Animated.View> */}

                <ScrollView scrollEnabled={false}
                    alignItems='center' horizontal={true} ref={ref=>setRef(ref)}>
                {images.map((image, index)=>
                
                <View 
                    onTouchStart={(event)=>setStart(event.nativeEvent.locationX)}  
                    onTouchMove={()=>setMove(true)} 
                    onTouchCancel={(event)=>slide(event.nativeEvent.locationX)}
                    onLayout={(event) => {
                    const layout = event.nativeEvent.layout;
                    // posX[index] = layout.width;
                    posX[index] = layout.x;
                    // posY[index] = layout.y;
                    setPosX(posX);
                    if(i==index && first){
                        setFirst(false)
                        Start()
                    }
                    // setPosY(posY)
              
                }} 
                 key={index} >
                    <Image onPress={()=>null}
                        key={index} resizeMode="contain"
                        style={{width:wid, height:wid*ratio}}
                        source= {image}/>
                    </View>

                )}
            </ScrollView>
            </View>
        </SafeAreaView>
    )
}
const styles=StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        flex:1,
        // width: '100%',
        // height: '100%',
        // position:'absolute',
        
    },

    topBar:{
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignContent: 'center',
        alignItems:'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',top:0, zIndex:2,
    },

    containerChangeImage: {
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        position: 'absolute',top:'45%',
        zIndex:1, alignItems: 'center',
        flexDirection: 'row',
    },

    containerChangeLeft:{
        borderTopEndRadius: 15,
        borderBottomEndRadius: 15,
        left: 0,
    },
    
    containerChangeRight:{
        borderTopStartRadius: 15,
        borderBottomStartRadius: 15,
        right: 0,
    },
})