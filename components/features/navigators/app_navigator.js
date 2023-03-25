import React, { useContext } from 'react';
import { HomeScreen } from '../home/home_screen';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import { ThemeContext } from '../../theme/theme_context';
import { Settings } from '../settings/settings';
import { HomeStackScreens } from '../home/home_stack_screens';
import { useSelector } from 'react-redux'
import { FavoriteScreen } from '../favorite/favourite_screen';
import { CartScreen } from '../cart/cart_screen';
const Tab = createBottomTabNavigator();

const Icons={
  Home: 'md-home',
  Cart: 'md-cart',
  Favourites: 'md-heart',
  Settings: 'md-settings'
}


export const AppNavigator =()=>{
    // const {theme, darkMode} = useContext(ThemeContext)
    const {theme, darkMode} =useSelector(state => state.theme)
    const screenOptions =({route}) => {
        const iconName=Icons[route.name]
        return{
          tabBarIcon: ({color, size }) =>  <Ionicons name={iconName} size={size-2} color={color} />,
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.textL,
          tabBarStyle: {
            backgroundColor:theme.tabBarBack,
            borderTopWidth:1,
            borderTopColor:theme.tabBarWid   ,
            paddingBottom:4,
            paddingTop:5,
          },
          tabBarLabelStyle: {
              // fontSize: fontSizes.small-1,
          },
        }
      }

    return(
      <Tab.Navigator 
          initialRouteName='Home'
          screenOptions={screenOptions}
        >
        <Tab.Screen name="Home" component={HomeStackScreens} options={{headerShown:false}}/>
        <Tab.Screen name="Cart" component={CartScreen} options={{headerShown:false}}/>
        <Tab.Screen name="Favourites" component={FavoriteScreen} options={{headerShown:false}}/>
        <Tab.Screen name="Settings" component={Settings} options={{headerShown:false}}/>
      </Tab.Navigator>
    )
}