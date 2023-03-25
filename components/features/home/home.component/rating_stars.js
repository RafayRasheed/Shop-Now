import React from "react";
import {FontAwesome } from '@expo/vector-icons'
import colors from '../../../uitls/colors'

const Star =({name, size})=>(
    <FontAwesome  name={name} size={size} style={{paddingEnd:2, paddingTop:3}} color={colors.goldenrod}/>
)
export const RatingStars=({rating, size=17})=>{
    const full_star = Number(String(rating)[0])
    const diff = rating -full_star
    const half_star = diff>0.2 && diff<0.9? true: false
    const blank_star= half_star? 5-full_star-1: 5-full_star
    var fullStarArray=[]
    var blankStarArray=[]

    for(let i = 0; i < full_star; i++){
        fullStarArray.push(
            <Star key={'star'+i} size={size} name='star'/>
        )
    }
    for(let i = 0; i < blank_star; i++){
        blankStarArray.push(
            <Star key={'star-o'+i} size={size} name='star-o'/>
        )
    }
    return(
       <>
         {fullStarArray}
         {half_star && <Star size={size} name='star-half-o'/>}
         {blankStarArray}
       </>
    )
}