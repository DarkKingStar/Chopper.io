import {
  Animated,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import normalize from '../../../utils/helpers/normalize';
import useGreetings from '../../../utils/useGreetings';
import {Icons} from '../../../constants/icons';
import {Images} from '../../../constants/image';
import {Colors} from '../../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import HorizontalFlatList from '../../../component/HorizentalFlatList';
import HorizontalFlatListLoader from '../../../component/HorizentalFlatListLoader';
import isInternetConnected from '../../../utils/helpers/NetInfo';
import NetInfo from '@react-native-community/netinfo';
import _ from 'lodash';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  animeMoviesRequest,
  popularAnimeRequest,
  recentReleasedRequest,
  newSeasonRequest,
} from '../../../redux/reducer/AnimeReducer';

const genrelist = [
  {
    name: 'Action',
    route: 'GenreContent',
    genreId: 'action',
  },
  {
    name: 'Comedy',
    route: 'GenreContent',
    genreId: 'comedy',
  },
  {
    name: 'Isekai',
    route: 'GenreContent',
    genreId: 'isekai',
  },
  {
    name: 'School',
    route: 'GenreContent',
    genreId: 'school',
  },
  {
    name: 'Shounen',
    route: 'GenreContent',
    genreId: 'shounen',
  },
  {
    name: 'Slice of Life',
    route: 'GenreContent',
    genreId: 'slice-of-life',
  },
  {
    name: 'Sports',
    route: 'GenreContent',
    genreId: 'sports',
  },
  {
    name: 'Thriller',
    route: 'GenreContent',
    genreId: 'thriller',
  },
  {
    name: 'Workplace',
    route: 'GenreContent',
    genreId: 'workplace',
  },
  {
    name: 'More...',
    route: 'GenreList',
    genreId: false,
  },
];
const animeList = [
  {
    poster:
      'https://i.pinimg.com/564x/39/90/d9/3990d9a269712084403bd71e4a07563c.jpg',
    name: 'Tokyo Ghoul',
    episode: '03',
    season: '02',
  },
  {
    poster:
      'https://i.pinimg.com/564x/70/63/f2/7063f2d102de55037d34733085bb8ebc.jpg',
    name: 'Bleach',
    episode: '05',
    season: '01',
  },
  {
    poster:
      'https://i.pinimg.com/564x/5b/30/08/5b30086b59a38d0b63f804ffce31a87f.jpg',
    name: 'Naruto Shippudent',
    episode: '23',
    season: '01',
  },
  {
    poster:
      'https://i.pinimg.com/736x/10/8e/3b/108e3b1df00743bb3ce908a48c8e7e47.jpg',
    name: 'One Piece',
    episode: '1102',
    season: '01',
  },
];

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const greetings = useGreetings();
  const animeReducer = useSelector(state => state.AnimeReducer);
  const isFocused = useIsFocused();
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [recentReleasedLoading ,setRecentReleasedLoading] = useState(true);
  const [newSeasonLoading ,setNewSeasonLoading] = useState(true);
  const [popularAnimeLoading ,setPopularAnimeLoading] = useState(true);
  const [animeMoviesLoading ,setAnimeMoviesLoading] = useState(true);


  const animatedOpacity = scrollY.interpolate({
    inputRange: [0, 50], // adjust these values as per your need
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  
  useEffect(() => {
    const handleConnectivityChange = (isConnected) => {
      if (isFocused) {
        if (isConnected) {
          callFetchFunction(1);
        } else {
          console.log('Please Connect To Internet');
        }
      }
    };

    const debouncedHandleConnectivityChange = _.debounce(
      handleConnectivityChange,
      1000,
    );

    const unsubscribe = NetInfo.addEventListener(state => {
      debouncedHandleConnectivityChange(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, [isFocused]);

  const callFetchFunction = async (page) => {
      dispatch(popularAnimeRequest({page}));
      dispatch(recentReleasedRequest({page}));
      dispatch(newSeasonRequest({page}));
      dispatch(animeMoviesRequest({page}));
  };

  const retryRequestAfterDelay = (request, page) => {
    setTimeout(() => {
      dispatch(request({page}));
    }, 20000);
  };

  useEffect(() => {
    if (animeReducer) {
      const {status, recentReleased, popularAnime, animeMovies, newSeason} =
        animeReducer;
      const retryIfFailure = (requestType, request, results, page) => {
        if (status === requestType && !results?.results?.length) {
          retryRequestAfterDelay(request, page);
        }
      };
      retryIfFailure('Anime/recentReleasedFailure', recentReleasedRequest, recentReleased, 1);
      retryIfFailure('Anime/popularAnimeFailure', popularAnimeRequest, popularAnime, 1);
      retryIfFailure('Anime/animeMoviesFailure', animeMoviesRequest, animeMovies, 1);
      retryIfFailure('Anime/newSeasonFailure', newSeasonRequest, newSeason, 1);
    }
  }, [animeReducer?.status]);

  useEffect(() => {
    const setLoading = (status, setLoadingFunc) => {
      switch (status) {
        case 'Anime/recentReleasedSuccess':
          setRecentReleasedLoading(false);
          break;
        case 'Anime/newSeasonSuccess':
          setNewSeasonLoading(false);
          break;
        case 'Anime/popularAnimeSuccess':
          setPopularAnimeLoading(false);
          break;
        case 'Anime/animeMoviesSuccess':
          setAnimeMoviesLoading(false);
          break;
      }
    };
    setLoading(animeReducer?.status, setRecentReleasedLoading);
    setLoading(animeReducer?.status, setNewSeasonLoading);
    setLoading(animeReducer?.status, setPopularAnimeLoading);
    setLoading(animeReducer?.status, setAnimeMoviesLoading);
  }, [animeReducer?.status]);


  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        scrollEventThrottle={0}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        showsVerticalScrollIndicator={false}
        bounces={true}>
        <View
          style={{
            width: '100%',
          }}>
          <ImageBackground
            source={{uri: animeList[0].poster}}
            resizeMode="stretch"
            style={{flex: 1, margin: 0}}>
            <ImageBackground
              source={Images.overlayer}
              resizeMode="cover"
              style={{flex: 1, margin: 0, paddingHorizontal: normalize(3)}}>
              {/* settings button */}
              <Animated.View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginTop: normalize(6),
                  gap: normalize(10),
                  opacity: animatedOpacity,
                  transform: [
                    {
                      translateY: animatedOpacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                  ],
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Settings')}>
                  <Image
                    source={Icons.gear}
                    style={{width: normalize(25), height: normalize(25)}}
                  />
                </TouchableOpacity>
              </Animated.View>
              {/* profile image and greetings */}
              <Animated.View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: normalize(10),
                  gap: normalize(10),
                  opacity: animatedOpacity,
                  transform: [
                    {
                      translateY: animatedOpacity.interpolate({
                        inputRange: [0, 50],
                        outputRange: [1, 0],
                      }),
                    },
                  ],
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile')}>
                  <Image
                    source={{
                      uri: 'https://img.freepik.com/premium-photo/anime-male-avatar_950633-956.jpg?ga=GA1.1.1733710313.1706420280&',
                    }}
                    style={{
                      width: normalize(30),
                      height: normalize(30),
                      borderRadius: 100,
                    }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: normalize(18),
                    fontWeight: '800',
                    letterSpacing: normalize(1.5),
                  }}>
                  {greetings}
                </Text>
              </Animated.View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <FlatList
                  data={genrelist}
                  horizontal
                  initialNumToRender={3}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item}) => (
                    <View
                      style={{
                        marginHorizontal: normalize(4),
                        paddingTop: normalize(30),
                        paddingBottom: normalize(10),
                      }}>
                      <LinearGradient
                        colors={[Colors.red, Colors.red, Colors.yellow]}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}}
                        style={styles.bubble}>
                        <TouchableOpacity
                          style={styles.bubble}
                          onPress={() => navigation.navigate(item.route)}>
                          <Text
                            style={{
                              fontSize: normalize(12),
                              color: Colors.white,
                              fontWeight: '700',
                            }}>
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      </LinearGradient>
                    </View>
                  )}
                />
                {/* {categories.map((cate,catindex)=>(
                <View key={catindex} 
                style={{flex:1,
                flexDirection:'row',
                justifyContent:'space-evenly',
                marginTop:  normalize(10)
                }}>  
                  {cate.map((item,index)=>(
                    <LinearGradient
                    colors={[Colors.red,Colors.red, Colors.yellow]}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                    style={styles.bubble}
                    key={index}
                    >
                    <TouchableOpacity style={styles.bubble}>
                    <Text
                    style={{fontSize:normalize(12),color:Colors.black,fontWeight:'700'}}
                    >{item.name}</Text>
                  </TouchableOpacity>
                  </LinearGradient>
                  ))}
                </View>
                ))} */}
              </View>
            </ImageBackground>
          </ImageBackground>
        </View>
        {/* <View
        style={{marginHorizontal: normalize(10), marginTop:  normalize(20)}}
        >
          <Text
            style={styles.heading}
          >Continue Watching</Text>

        <HorizontalFlatList data={animeList}/> 
        </View> */}

        <View
          style={{marginHorizontal: normalize(10), marginTop: normalize(20)}}>
          <Text style={styles.heading}>Popular Anime</Text>
          {popularAnimeLoading ? (
            <HorizontalFlatListLoader data={[1, 2, 3, 4]} />
          ) : (
            <HorizontalFlatList
              data={animeReducer?.popularAnime?.results || []}
              value={'popularAnime'}
              fetchFunction={popularAnimeRequest}
            />
          )}
        </View>

        <View
          style={{marginHorizontal: normalize(10), marginTop: normalize(20)}}>
          <Text style={styles.heading}>Recent Releases</Text>
          {recentReleasedLoading ? (
            <HorizontalFlatListLoader data={[1, 2, 3, 4]} />
          ) : (
            <HorizontalFlatList
              data={animeReducer?.recentReleased?.results || []}
              value={'recentReleased'}
              fetchFunction={recentReleasedRequest}
            />
          )}
        </View>

        <View
          style={{marginHorizontal: normalize(10), marginTop: normalize(20)}}>
          <Text style={styles.heading}>New Season</Text>
          {newSeasonLoading ? (
            <HorizontalFlatListLoader data={[1, 2, 3, 4]} />
          ) : (
            <HorizontalFlatList
              data={animeReducer?.newSeason?.results || []}
              value={'newSeason'}
              fetchFunction={newSeasonRequest}
            />
          )}
        </View>

        <View
          style={{marginHorizontal: normalize(10), marginTop: normalize(20)}}>
          <Text style={styles.heading}>Anime Movies</Text>
          {animeMoviesLoading ? (
            <HorizontalFlatListLoader data={[1, 2, 3, 4]} />
          ) : (
            <HorizontalFlatList
              data={animeReducer?.animeMovies?.results || []}
              value={'animeMovies'}
              fetchFunction={animeMoviesRequest}
            />
          )}
        </View>

      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 126,
  },
  bubble: {
    borderRadius: normalize(25),
    width: normalize(110),
    height: normalize(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  heading: {
    fontSize: normalize(22),
    fontWeight: '700',
    color: Colors.white,
    marginBottom: normalize(10),
    marginLeft: normalize(10),
  },
});
