import { FlatList, ImageBackground, SafeAreaView, StyleSheet,Animated as Anime, Text, View, useWindowDimensions, Image, } from 'react-native'
import React, { useRef, useState } from 'react'
import { Images } from '../constants/image'
import Button from '../component/Button'
import Paginator from '../component/Paginator'
import { Colors } from '../constants/colors'

const OnBoarding = ({navigation}) => {
    const {height, width} = useWindowDimensions();
    const [currentindex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);
    const scrollX = useRef(new Anime.Value(0)).current;
    const DATA = [
        "Free to Watch: Immerse Yourself in a World of Anime Without Any Cost! Any Fee!",
        "High-Quality Streaming: Elevate Your Anime Experience with Crystal Clear Video!",
        "Ad-Free Enjoyment: Dive into Your Favorite Anime Without Interruptions or Ads!",
      ];
    const viewableItemChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0]?.index);
      }).current;
    
    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    function renderItem({item, index}) {
    return (
        <SafeAreaView
        key={index}
        style={{
            width,
            flex: 1,
            justifyContent: 'flex-end',
        }}>
        <Text
            style={{
            color: Colors.white,
            fontSize: 30,
            fontWeight: '600',
            marginBottom: 50,
            width: '85%',
            marginLeft: 12,
            lineHeight: 42,
            textShadowColor: 'black', // Set the outline color
            textShadowOffset: { width: 2, height: 2 }, // Set the outline offset
            textShadowRadius: 5,
            }}>
            {<>
                <Text style={{color: Colors.yellow, 
                fontWeight: '900'
            }}>
                    {item.substring(0,item.indexOf(':'))+'\n'}</Text>
                <Text>{item.substring(item.indexOf(':')+2)}</Text>
            </>}
        </Text>
        </SafeAreaView>
    );
    }
    return (
    <View style={{flex:1}}>
        <ImageBackground source={Images.onbroadBg} style={{flex:1}}>
        
        <FlatList
          data={DATA}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item, index) => index.toString()}
          onScroll={Anime.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
            useNativeDriver: false,
          })}
          scrollEventThrottle={16}
          decelerationRate={0}
          onViewableItemsChanged={viewableItemChanged}
          viewabilityConfig={viewConfig}
          ref={sliderRef}
        />
            <Paginator
                data={DATA}
                scrollX={scrollX}
                viewstyle={{
                bottom: 20,
                alignSelf: 'center'
                }}
            />  
            <Button 
            title={"Get Started"}
            onClick={()=>navigation.navigate("Login")}
            buttonStyle={styles.btnStyle}
            textStyle={styles.btntextStyle}
            />
        </ImageBackground>
    </View>
  )
}

export default OnBoarding

const styles = StyleSheet.create({
    btnStyle:{
        width: '95%',
        height: 50,
        marginVertical: 10,
        backgroundColor: Colors.red,
    },
    btntextStyle:{
        color: Colors.white,
    }
})