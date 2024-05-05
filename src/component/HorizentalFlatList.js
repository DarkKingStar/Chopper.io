import React, { useEffect, useState } from 'react';
import {Image} from 'react-native-elements';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Touchable, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import normalize from '../utils/helpers/normalize';
import { useDispatch, useSelector } from 'react-redux';
import HorizontalFlatListLoader from './HorizentalFlatListLoader';
import isInternetConnected from '../utils/helpers/NetInfo';
import NetInfo from '@react-native-community/netinfo';
import _ from 'lodash';

const HorizontalFlatList = ({
    navigation,
    data,
    value,
    fetchFunction,
}) => {
  const [page,setPage] = useState(1);
  const dispatch = useDispatch();
  const animeReducer =  useSelector(state => state.AnimeReducer);
  const [hasPageNext,setHasPageNext] = useState(false);
  const [hasFailed,setHasFailed] = useState(false);
  useEffect(()=>{
    // console.log("hasNextPage ",value,":===========",animeReducer[value].hasNextPage);
    if(animeReducer[value]?.hasNextPage!==undefined || animeReducer[value]?.hasNextPage !==null)
    {
      setHasPageNext(animeReducer[value]?.hasNextPage)
    }
  },[animeReducer[value]])

  const callFetchFunction = async(page) => {
    setPage(page);
    dispatch(fetchFunction({page: page}));
  
  }

  const handleConnectivityChange = async isConnected => {
    if (isConnected && hasPageNext && hasFailed) {
      // If internet is reconnected and there is a next page, call fetch with page + 1
      callFetchFunction(page + 1);
      setHasFailed(false);
    }
  };

   // Debounce the handleConnectivityChange function to avoid rapid calls
   const debouncedHandleConnectivityChange = _.debounce(handleConnectivityChange, 1000);

   useEffect(() => {
     const unsubscribe = NetInfo.addEventListener(state => {
       debouncedHandleConnectivityChange(state.isConnected);
     });
 
     return () => {
       unsubscribe();
     };
   });


  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        scrollEnabled={data?.length>3}
        initialNumToRender={data?.length>3?4:data?.length}
        decelerationRate={0.9}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const subtitle = item?.episodeNumber!=undefined?"E"+item.episodeNumber: (item?.released!=undefined?item.released:(item?.recentEpisodes!=undefined? "E"+item.recentEpisodes.split(" ")[1] : ""))
          return(<TouchableOpacity style={styles.item} onPress={() => navigation.navigate("AnimeDetails", { animeId: item?.id, animeName: item?.title })}>
            <Image source={{uri:item?.image}} style={styles.poster} resizeMode='stretch' PlaceholderContent={<ActivityIndicator color={Colors.red} size="large"/>}/>
            <Text style={styles.itemname} numberOfLines={1} ellipsizeMode='tail'>{item?.title}</Text>
            <Text style={styles.itemSE} numberOfLines={1} ellipsizeMode='tail'>{subtitle}</Text>
          </TouchableOpacity>)
        }}
        ListFooterComponent={ hasPageNext && <HorizontalFlatListLoader data={[1]}/>}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={() => hasPageNext && callFetchFunction(page+1)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item: {
    backgroundColor: Colors.black,
    borderWidth: normalize(0.45),
    borderRadius: normalize(5),
    width: normalize(105),
    borderColor: Colors.darkGrey,
    marginHorizontal: normalize(3),
    paddingBottom: normalize(10)
  },
  poster:{
    height:normalize(135),
    borderTopLeftRadius:normalize(5),
    borderTopRightRadius:normalize(5),
    backgroundColor: 'rgba(0,0,0,0.15)'
  },
  itemname:{
    textAlign:'center',
    fontSize: normalize(12),
    fontWeight: '700',
    marginTop: normalize(3),
    color:Colors.white,
    paddingHorizontal: normalize(10)
  },
  itemSE:{
    fontSize: normalize(11),
    textAlign:'center',
    fontWeight: '900',
    color: Colors.yellow
  }
});

export default HorizontalFlatList;
