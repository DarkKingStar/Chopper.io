import { FlatList, StyleSheet, Text,Image, TextInput, ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import normalize from '../../../utils/helpers/normalize'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icons } from '../../../constants/icons'
import { Colors } from '../../../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { animeSearchRequest } from '../../../redux/reducer/AnimeReducer'


const Search = () => {
  const dispatch = useDispatch();
  const animeReducer = useSelector(state => state.AnimeReducer);
  const [searchQuery,setSearchQuery] = useState("");
  const [inputFocus,setInputFocus] = useState(false);

  const callFetchFunction = async() => {
    if(searchQuery?.length>2){
      dispatch(animeSearchRequest({data:searchQuery}))
    }
  }

  useEffect(()=>{
    callFetchFunction();
  },[searchQuery])

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
        data={(searchQuery?.length>2 && animeReducer?.animeSearch?.results) || []}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Text key={item?.id|| item}> {item?.title}</Text>
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
  }
})