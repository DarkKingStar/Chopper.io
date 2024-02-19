import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icons } from '../constants/icons'

const GoBackButton = ({navigation}) => {
  return (
    <View style={{ padding: 10, position: 'absolute'}}>
    <Pressable onPress={()=>navigation.goBack()}>
      <Image 
       style={{
        width:35,
        height: 35
       }}
       source={Icons.arrowBack}
      />
    </Pressable>
  </View>
  )
}

export default GoBackButton

const styles = StyleSheet.create({})