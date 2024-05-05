import { FlatList, StyleSheet, Text,Image, TextInput, ScrollView, View, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import normalize from '../../../utils/helpers/normalize'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icons } from '../../../constants/icons'
import { Colors } from '../../../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { animeSearchRequest } from '../../../redux/reducer/AnimeReducer'
import { colors } from 'react-native-elements'
import { useIsFocused } from '@react-navigation/native'


const Search = ({navigation}) => {
  const dispatch = useDispatch();
  const animeReducer = useSelector(state => state.AnimeReducer);
  const [searchQuery,setSearchQuery] = useState("");
  const [inputFocus,setInputFocus] = useState(false);
  const searchList = animeReducer?.animeSearch?.results || [];
  const isFocused = useIsFocused();

  useEffect(()=>{
    if(isFocused){
      callFetchFunction();
    }
  },[searchQuery])
  const callFetchFunction = async() => {
    if(searchQuery != ""){
      dispatch(animeSearchRequest({data:searchQuery}))
    }
  }
  return (
    <View>
      <View style={[styles.search,{borderColor: inputFocus ? Colors.red : Colors.white}]}>
      <TextInput 
        placeholder='Type here to Search Anime...'
        value={searchQuery}
        onChange={(e)=>setSearchQuery(e.nativeEvent.text)}
        style={styles.searchinput}
        onFocus={()=>setInputFocus(true)}
        onBlur={()=>setInputFocus(false)}
      />
      <TouchableOpacity style={styles.searchbtn} onPress={()=>callFetchFunction()}>
        <Image source={inputFocus ? Icons.searchActive : Icons.search} style={{width:normalize(20),height:normalize(20)}}/>
      </TouchableOpacity>
      </View>
      <FlatList
        data={searchList}
        style={{marginBottom: inputFocus ? normalize(105) : normalize(150)}}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity  key={item?.id} style={styles.itemContainer} onPress={()=>navigation.navigate("AnimeDetails",{animeId:item?.id,animeName:item?.title})}>
            <Image source={{ uri: item?.image }} style={{ width: normalize(40), height: normalize(60) }}  resizeMode='cover'/>
            <View style={{flex:1,flexDirection:'coloum',marginLeft:normalize(10),justifyContent: 'space-between'}}>
                <Text style={{}}>{item?.title}</Text>
                <Text style={{}}>{item?.status}</Text>
                <Text 
                style={{textTransform:'uppercase',
                 backgroundColor: item?.subOrDub == 'sub'? Colors.sky : Colors.green,
                 padding: normalize(2),
                 borderRadius: normalize(8),
                 color: colors.black,
                 textAlign:'center',
                 width: normalize(30), 
                 marginBottom:normalize(4),
                 }}>{item?.subOrDub}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
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
    flex:1,
    fontSize: normalize(14),
    color: Colors.white
  },
  searchbtn:{
    justifyContent: 'center',
    paddingHorizontal: normalize(15)
  },
  itemContainer:{
    flexDirection: 'row',
    marginHorizontal: normalize(10),
    borderBottomWidth: normalize(0.5),
    borderColor: Colors.grey
  }
})