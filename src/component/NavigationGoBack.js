import { TouchableOpacity, Image,  Text } from 'react-native'
import React, { useState } from 'react'
import normalize from '../utils/helpers/normalize'
import { Icons } from '../constants/icons'
import { Colors } from '../constants/colors'

const NavigationGoBack = ({navigation, pagename}) => {
  const [isPressed, setIsPressed] = useState(false)
  const handlepress = () => {
    setIsPressed(true);
    navigation.goBack();
  }  
  return (
    <TouchableOpacity 
        onPress={() => handlepress()}
        disabled={isPressed}
        style={{flexDirection:'row',alignItems:'center', paddingVertical:normalize(15)}}>
            <Image source={Icons.arrowBack} style={{width:normalize(15),height:normalize(15), marginHorizontal:normalize(10)}}/>
            <Text style={{fontSize:normalize(15),color:Colors.white,fontWeight:'600', marginRight:normalize(35)}}>{pagename}</Text>
    </TouchableOpacity>
  )
}

export default NavigationGoBack
