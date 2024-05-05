import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../constants/colors';
import NavigationGoBack from '../component/NavigationGoBack';
import {useIsFocused} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { animeDetailsRequest, animeEpisodesRequest } from '../redux/reducer/AnimeReducer';
import AnimeDetailsLoader from '../component/AnimeDetailsLoader';
import normalize from '../utils/helpers/normalize';
import _ from 'lodash';
import { Images } from '../constants/image';
import { Icons } from '../constants/icons';

const AnimeDetails = ({navigation, route}) => {
  const [isMore,settIsMore] = useState(false);
  const [page,setPage] = useState(1);
  const [epno,settEpno] = useState("");

  
  const animeReducer = useSelector(state => state.AnimeReducer);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const params = route?.params;
  const animeId = params?.animeId
  const animeName = params?.animeName;
  const animeDetails = animeReducer?.animeDetails?.results;
  const animeEpisodes = animeReducer?.animeEpisodes?.results;


    useEffect(()=>{
      if(isFocused && animeId && animeReducer?.status !== "Anime/animeDetailsRequest"){
        dispatch(animeDetailsRequest({id: animeId}));
      }
    },[isFocused])

    useEffect(()=>{
      if(animeReducer?.status === "Anime/animeDetailsSuccess" && animeDetails?.animeId != animeId){
        loadAnimeEpisodes(animeId, page, 12, animeDetails?.id);
      }
    },[animeReducer?.status])

    useEffect(()=>{
      if(animeDetails?.id
        &&
        animeDetails?.animeid == animeId 
        &&
        animeReducer?.animeEpisodes?.animeId == animeId
      ){
        loadAnimeEpisodes(animeId, page, 12, animeDetails?.id);
      }
    },[page])

    const loadAnimeEpisodes = (animeId, page, rows, id) => {
      dispatch(animeEpisodesRequest({animeid: animeId, page:page, rows:rows, id:id}));
    }

    const PrevPage = ()=>{
      if(page!=1){
        setPage(page-1)
      }
    }
    const NextPage = ()=>{
        if(animeEpisodes?.length == 12){
          setPage(page+1)
        }
    }
    const changePage = (value)=>{
        if(!isNaN(value)){
          setPage(value);
        }
    }
    return (
    <View>
       <NavigationGoBack navigation={navigation} pagename={animeName}/>
        <View>
        {animeDetails?.animeid != animeId || animeReducer?.animeEpisodes?.animeId != animeId ? 
        <View style={{width:"90%", alignSelf: 'center', marginBottom: normalize(190),paddingBottom: normalize(10)}}>
        <AnimeDetailsLoader/>
        </View>
        : 
          <View style={{width:"90%", alignSelf: 'center', marginBottom: normalize(190),paddingBottom: normalize(10)}}>
            <FlatList 
              data={animeEpisodes} 
              keyExtractor={(item, index)=>index.toString()}
              numColumns={4} 
              contentContainerStyle={{gap: normalize(10)}}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                <>
                  <Image source={{uri: animeDetails?.image}} style={styles.poster} resizeMode='contain'/>
                  <View style={{marginVertical: normalize(10), alignItems: 'center'}}>
                    <Text style={styles.itemname}>{animeDetails?.otherName}</Text>
                    <Text style={[styles.itemname,{marginTop: normalize(5)}]}>Genres:{
                      animeDetails?.genres?.map((item, index)=>{
                        return (
                          <Text key={index} style={styles.genres}> {item}</Text>
                        )
                      })
                    }</Text>
                    <Text style={styles.status}>{animeDetails?.status}</Text>
                    <Text style={styles.status2}>{animeDetails?.type}</Text>
                    <Text numberOfLines={isMore?null:3} style={styles.description}>{animeDetails?.description}</Text>
                    <TouchableOpacity onPress={()=>settIsMore(!isMore)}>
                      <Text style={styles.seeMore}>{isMore ? "See Less" : "See More"}</Text>
                    </TouchableOpacity>
                  </View>
                  <View  style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={styles.episodeTitle}>Episodes [ {animeDetails?.totalEpisodes} ]</Text>
                    <View style={{flexDirection: 'row'}}>
                      <TextInput
                       style={styles.episodeinput} placeholder={`1-${animeDetails?.totalEpisodes} Ep`}
                      value={epno}
                      onChangeText={(value)=>{settEpno(value)}}
                      />
                      <TouchableOpacity style={styles.jumpbutton} onPress={()=>changePage(parseInt((parseInt(epno)/12)+1))}>
                        <Image source={Icons.jump} style={styles.jumpicon}/>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              }
              renderItem={({item, index})=>(
                <TouchableOpacity key={index} style={[styles.episodeContainer,{backgroundColor: item?.number == epno ? Colors.red : Colors.darkGrey}]}>
                  <Text style={styles.episode}>Ep {item?.number}</Text>
                </TouchableOpacity>
              )}
              ListFooterComponent={
                <View style={{marginVertical: normalize(10),flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center'}}>
                  <TouchableOpacity style={styles.pagebuttons} onPress={()=>PrevPage()}>
                    <Image source={Icons.arrowBack} style={styles.pageicon}/>
                  </TouchableOpacity>
                  <View>
                    <Text style={styles.pagetext}>Page - {page}</Text>
                  </View>
                  <TouchableOpacity style={styles.pagebuttons} onPress={()=>NextPage()}>
                    <Image source={Icons.arrowFront} style={styles.pageicon}/>
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
        }
        </View>
    </View>
  )
}

export default AnimeDetails

const styles = StyleSheet.create({
  poster:{
    height:normalize(300),
    width:"80%",
    alignSelf: 'center',
    borderTopLeftRadius:normalize(5),
    borderTopRightRadius:normalize(5)
  },
  itemname:{
    textAlign:'center',
    fontSize: normalize(12),
    width:"80%",
    fontWeight: '700',
    color:Colors.white,
  },
  status:{
    textAlign:'center',
    fontSize: normalize(12),
    width:"80%",
    marginTop: normalize(3),
    textTransform: 'uppercase',
    fontWeight: '700',
    color:Colors.green,
  },
  status2:{
    textAlign:'center',
    fontSize: normalize(12),
    width:"80%",
    marginTop: normalize(3),
    textTransform: 'uppercase',
    fontWeight: '700',
    color:Colors.yellow,
  },
  description:{
    textAlign:'center',
    fontSize: normalize(12),
    width:"80%",
    marginTop: normalize(3),
    fontWeight: '700',
    color:Colors.grey,
  },
  seeMore:{
    textAlign:'center',
    fontSize: normalize(12),
    width:"80%",
    textTransform: 'uppercase',
    fontWeight: '700',
    color:Colors.white,
  },
  genres:{
    color:Colors.sky,
  },
  episodeTitle:{
    color:Colors.red,
    fontSize: normalize(13),
    fontWeight: '700',
    textTransform: 'uppercase',
    margin: normalize(10),
  },
  episodeContainer:{
    backgroundColor: Colors.darkGrey,
    width: normalize(60),
    borderRadius: normalize(5),
    padding: normalize(10),
    marginHorizontal: normalize(5),
  },
  episode:{
    color:Colors.white,
    fontSize: normalize(10),
    fontWeight: '700',
    alignSelf: 'center',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  episodeinput:{
    borderWidth: normalize(1),
    borderColor: Colors.red,
    borderTopLeftRadius: normalize(5),
    borderBottomLeftRadius: normalize(5),
    padding: normalize(5),
    fontSize: normalize(10),
    paddingHorizontal: normalize(10),
    color:Colors.white,
    width: normalize(68),
    height: normalize(30),
  },
  jumpbutton:{
    backgroundColor: Colors.red,
    paddingHorizontal: normalize(10),
    borderTopRightRadius: normalize(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: normalize(5),
  },
  jumpicon:{
    width: normalize(10),
    height: normalize(10),
  },
  pagebuttons:{
    justifyContent: 'center',
    borderWidth: normalize(1),
    borderColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    padding: normalize(5),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(5),
    marginHorizontal: normalize(5),
  },
  pageicon:{
    width: normalize(15),
    height: normalize(15),
  
  },

})