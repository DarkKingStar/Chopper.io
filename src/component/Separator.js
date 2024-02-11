import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/colors'

const Separator = () => {
  return (
    <View style={{flexDirection: 'row', marginVertical: 45, gap: 10, opacity: 0.5, alignItems: 'center', justifyContent: 'center'}}>
      <View style={styles.line}/>
      <Text style={{color: Colors.grey }}>or</Text>
      <View style={styles.line}/>
    </View>
  )
}

export default Separator

const styles = StyleSheet.create({
    line:{
        backgroundColor: Colors.grey,
        width:'20%',
        height: 1
    }
})