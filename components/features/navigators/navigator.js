import React from 'react'
import { AppNavigator } from './app_navigator'
import { NavigationContainer } from '@react-navigation/native';

export const Navigator =()=>{
    return(
        <NavigationContainer>
            <AppNavigator/>
        </NavigationContainer>
    )  
}