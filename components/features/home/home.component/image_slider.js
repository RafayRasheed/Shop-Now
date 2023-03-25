import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Animated, Dimensions } from "react-native";
import { Seperator } from '../../common/common_components';


export const ImageSlider = ({images, height}) => {
    const[animationX, setAnimationX]= useState(new Animated.Value(0));
    const width= Dimensions.get('window').width
    // const height= Dimensions.get('window').height

    const [position, setPosition] = useState(0)
    function handlePressIn(to){
        Animated.timing(animationX, {
            toValue: to,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }
    useEffect(()=>{
        const toggle = setInterval(() => {
        handlePressIn(-width)
            setTimeout(() => {
                setPosition(position === images.length - 1 ? 0 : position + 1)
                setAnimationX(new Animated.Value(width))
            }, 200)
        }, 3000);
        return () => clearInterval(toggle);
    })
    
    return (
        <View>
            <Seperator s={2}/>
            <Animated.View style={{width:'100%',transform: [{translateX: animationX}]}}>
            <Image 
                onLoadEnd={handlePressIn(0)}
                // resizeMode="contain"
                style={{width: '100%', height: 150, resizeMode:'stretch' }} 
                source= {images[position].url}/>
            </Animated.View>
        </View>
       
        // {/* <Slideshow indicatorSize={0} arrowSize= {0} height={height}  position={position} dataSource={images} /> */}
       
    );
};

const styles = StyleSheet.create({});

