function underShortNumbers(l1, str, len, name){
    if(len==l1){
        if(str[1]=='0'){
            return str[0]+name
        }
        return str[0]+'.'+str[1] +name
    }
    else if(len==l1+1){
        return str[0]+str[1] +name
    }
    return str[0]+str[1] +str[3]+name
}

export const shortNumbers = (num) => {
    // rev=item.reviews
    
    str=String(num)
    len=str.length
    if(len<4){
        return str
    }
    else if(len>=4 && len<7){
        return underShortNumbers(4, str, len, 'k')
    }
    else if(len>=7 && len<10){
        return underShortNumbers(7, str, len, 'M')
    }
    else if(len>=10 && len<13){
        return underShortNumbers(10, str, len, 'B')
    }
    return underShortNumbers(13, str, len, 'T')
}