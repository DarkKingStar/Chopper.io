import { FlatList, StyleSheet, Text,Image, TextInput, ScrollView, View } from 'react-native'
import React from 'react'
import normalize from '../../../utils/helpers/normalize'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icons } from '../../../constants/icons'
import { Colors } from '../../../constants/colors'

const Search = () => {
  return (
    <ScrollView style={{flex:1}}>
      <View style={styles.search}>
      <TextInput 
        placeholder='Type here to Search Anime...'
        style={styles.searchinput}
      />
      <TouchableOpacity style={styles.searchbtn}>
        <Image source={Icons.search} style={{width:normalize(20),height:normalize(20)}}/>
      </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Search

const styles = StyleSheet.create({
  search:{
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: normalize(0.5),
    borderColor: Colors.white,
    margin:normalize(5),
    borderRadius: normalize(12)
  },
  searchinput:{
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(10),   
    flex: 1,
    fontSize: normalize(14),
    color: Colors.white
  },
  searchbtn:{
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: normalize(15)
  }
})