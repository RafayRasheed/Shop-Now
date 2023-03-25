import React from 'react'
import { createStackNavigator , TransitionPresets} from "@react-navigation/stack";
import { HomeScreen } from './home_screen';
import { ItemDetails } from './item_details_screen';
import { ImagesViewer } from '../common/image_viewer';
import { CategoryScreen } from './category_screen';
const HomeStack = createStackNavigator();

export const HomeStackScreens = () => {
    return(
        <HomeStack.Navigator 
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.ModalFadeTransition
                }}>
            <HomeStack.Screen
                name="HomeScreen"
                component={HomeScreen}
            />
            <HomeStack.Screen
                name="ItemDetails"
                component= {ItemDetails}
            />
            <HomeStack.Screen 
                name="ImagesViewer"
                component= {ImagesViewer}
            />
            <HomeStack.Screen 
                name="CategoryScreen"
                component= {CategoryScreen}
            />
 
 
        </HomeStack.Navigator>
    )
}