import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import normalize from '../utils/helpers/normalize'
import { Colors } from '../constants/colors'
import { Icons } from '../constants/icons'

const VideoDesc = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>Tokyo Ghouls</Text>
          <Text style={styles.subTitle}>S01 E03</Text>
        </View>
        <View style={{flexDirection:'row', alignItems:'flex-end'}}>
          {/* <Text>100%</Text> */}
          <TouchableOpacity>
            <Image source={Icons.download} style={{width:normalize(25),height:normalize(25)}}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{height:1000}}> 

      </View>
    </View>
  )
}

export default VideoDesc

const styles = StyleSheet.create({
    container:{
      margin: normalize(10),
      
    },
    row:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title:{
      fontSize: normalize(14),
      fontWeight: '900',
      color: Colors.white
    },
    subTitle:{
      fontSize: normalize(12),
      fontWeight: '400',
      color: Colors.yellow,
    }
})