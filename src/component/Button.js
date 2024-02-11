import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Button = ({title, onClick, buttonStyle, textStyle}) => {
  return (
    <Pressable style={[styles.button, buttonStyle]} onPress={()=>onClick()}>
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
    button:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonText:{
        fontSize: 18,
        fontWeight: '600',
        textTransform: 'uppercase'
    }
})