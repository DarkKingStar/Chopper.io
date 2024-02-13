import { Animated, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import normalize from '../../../utils/helpers/normalize'
import useGreetings from '../../../utils/useGreetings'
import { Icons } from '../../../constants/icons'
import { Images } from '../../../constants/image'
import { Colors } from '../../../constants/colors'
import LinearGradient from 'react-native-linear-gradient'
import HorizontalFlatList from '../../../component/HorizentalFlatList'

const categories =  [
  [{
    name:'Recent Updates',
    route:'/Category/RecentUpdate'
  },
  {
    name:'Most Popular',
    route:'/Category/MostPopular'
  }],
  [{
    name:'Anime Movies',
    route:'/Category/AnimeMovies'
  },
  {
    name:'Top Airings',
    route:'/Category/TopAirings'
  }],
  [{
    name:'Recent Releases',
    route:'/Category/RecentReleases'
  },
  {
    name:'More...',
    route:'/Category'
  }]
]
const animeList = [
  {
    poster:"https://i.pinimg.com/564x/39/90/d9/3990d9a269712084403bd71e4a07563c.jpg",
    name: 'Tokyo Ghoul',
    episode: '03',
    season: '02'
  },
  {
    poster:"https://i.pinimg.com/564x/70/63/f2/7063f2d102de55037d34733085bb8ebc.jpg",
    name:'Bleach',
    episode: '05',
    season: '01'
  },
  {
    poster:"https://i.pinimg.com/564x/5b/30/08/5b30086b59a38d0b63f804ffce31a87f.jpg",
    name: 'Naruto Shippudent',
    episode: '23',
    season: '01'
  },
  {
    poster:"https://i.pinimg.com/736x/10/8e/3b/108e3b1df00743bb3ce908a48c8e7e47.jpg",
    name: 'One Piece',
    episode: '1102',
    season: '01'
  },
  
]
const  suggestions =  [
  {
    poster:"https://i.pinimg.com/564x/81/c7/9c/81c79cb8cfcb320fb7890403fc9bc81d.jpg",
    name:'Kimetsu no Yaiba-Demon Slayer',
    season: '03'
  },
  {
    poster:"https://i.pinimg.com/564x/67/b6/90/67b690140f09b858dd942c7a35e434e2.jpg",
    name: 'Attack on Titan',
    season: '04'
  },
  {
    poster:"https://i.pinimg.com/564x/6b/77/e3/6b77e36e39f79036d6645810ed3a7fe2.jpg",
    name: 'One Punch Man',
    season: '02'
  },
  {
    poster:"https://i.pinimg.com/564x/b9/ef/0a/b9ef0ae3b860fd287e907491fddd560c.jpg",
    name: 'Hunter x Hunter',
    season: '06'
  },
  {
    poster:"https://i.pinimg.com/564x/0b/25/6b/0b256b6bf21a2607b9d3950b5b1a764f.jpg",
    name: 'Jujutsu Kaisen',
    season: '02'
  },
  {
    poster:"https://i.pinimg.com/564x/26/4e/c9/264ec9d43fb4c2c4fbc0a976b42cb05a.jpg",
    name: 'Fullmetal Alchemist: Brotherhood',
    season: '02'
  },
]
const actionanime = [...suggestions].reverse()

const Home = ({navigation}) => {

  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  const animatedOpacity = scrollY.interpolate({
    inputRange: [0, 50], // adjust these values as per your need
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={{flex:1,marginBottom:126}}>
      <Animated.ScrollView 
      scrollEventThrottle={0}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      showsVerticalScrollIndicator={false}
      >
        <View style={{
          width:'100%'
        }}>
          <ImageBackground source={{uri:animeList[0].poster}}>
            <ImageBackground source={Images.overlayer} resizeMode='cover' style={{flex:1}}>
              <Animated.View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent:'flex-end',
                  marginTop:normalize(6),
                  gap: normalize(10),
                  opacity: animatedOpacity,
                  transform: [{ translateY: animatedOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0]
                  })}]
                }}
              >
                <TouchableOpacity onPress={()=>{}}>
                  <Image source={Icons.gear} style={{width:normalize(25),height:normalize(25)}}/>
                </TouchableOpacity>
              </Animated.View>
              <Animated.View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: normalize(10),
                  gap: normalize(10),
                  opacity: animatedOpacity,
                  transform: [{ translateY: animatedOpacity.interpolate({
                    inputRange: [0, 50],
                    outputRange: [1, 0],
                  })}]
                }}
              >
              <Image source={{uri: "https://img.freepik.com/premium-photo/anime-male-avatar_950633-956.jpg?ga=GA1.1.1733710313.1706420280&"}}
                style={{width:normalize(30),height:normalize(30),borderRadius:100}}
              />
              <Text
              style={{
                fontSize: normalize(18),
                fontWeight: '800',
                letterSpacing: normalize(1.5)
              }}
              >{useGreetings()}</Text>
              </Animated.View>
              <View style={{marginTop:  normalize(10)}}>
                {categories.map((cate,catindex)=>(
                <View key={catindex} 
                style={{flex:1,
                flexDirection:'row',
                justifyContent:'space-evenly',
                marginTop:  normalize(10)
                }}>  
                  {cate.map((item,index)=>(
                    <LinearGradient
                    colors={[Colors.red,Colors.maroon,Colors.maroon, Colors.red]}
                    start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}
                    style={styles.bubble}
                    key={index}
                    >
                    <TouchableOpacity style={styles.bubble}>
                    <Text
                    style={{fontSize:normalize(12),fontWeight:'700'}}
                    >{item.name}</Text>
                  </TouchableOpacity>
                  </LinearGradient>
                  ))}
                </View>
                ))}
              </View>
            </ImageBackground>
          </ImageBackground>
        </View>
        <View
        style={{marginHorizontal: normalize(10), marginTop:  normalize(20)}}
        >
          <Text
            style={styles.heading}
          >Continue Watching</Text>

          <HorizontalFlatList data={animeList}/>
        </View>
        <View
        style={{marginHorizontal: normalize(10), marginTop:  normalize(20)}}
        >
          <Text
            style={styles.heading}
          >More of what you like</Text>
          <HorizontalFlatList data={suggestions}/>
        </View>
        <View
        style={{marginHorizontal: normalize(10), marginTop:  normalize(20)}}
        >
          <Text
            style={styles.heading}
          >Trending Action</Text>
          <HorizontalFlatList data={actionanime}/>
        </View>
      </Animated.ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  bubble:{
    borderRadius:  normalize(8),
    width: normalize(120),
    height: normalize(40),
    alignItems:'center',
    justifyContent:'center',
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  heading:{
    fontSize: normalize(20),
    fontWeight: '700',
    color: Colors.white,
    marginLeft: normalize(10),
  }
})