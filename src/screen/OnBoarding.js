import { FlatList, ImageBackground, StyleSheet,Animated as Anime, Text, View, useWindowDimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { Images } from '../constants/image'
import Button from '../component/Button'
import Paginator from '../component/Paginator'
import { Colors } from '../constants/colors'
import { useDispatch } from 'react-redux'
import { setStart} from '../redux/reducer/AuthReducer';
import { storeData } from '../redux/LocalStore'
import constants from '../constants/constants'


const DATA = [
    "Free to Watch: Immerse Yourself in a World of Anime Without Any Cost! Any Fee!",
    "High-Quality Streaming: Elevate Your Anime Experience with Crystal Clear Video!",
    "Ad-Free Enjoyment: Dive into Your Favorite Anime Without Interruptions or Ads!",
  ];

const OnBoarding = ({navigation}) => {
    const dispatch = useDispatch();
    const {height, width} = useWindowDimensions();
    const [currentindex, setCurrentIndex] = useState(0);
    const [buttonText,setButtonText] = useState("Next");

    const scrollToNextItem = () => {
        if (sliderRef.current) {
          const nextIndex = (currentindex + 1) % DATA.length; // Calculate the index of the next item
          sliderRef.current.scrollToIndex({ index: nextIndex }); // Scroll to the next item 
        }
      };
    const startTheApp = () =>{
        dispatch(setStart(1))
        storeData(constants.STARTING, "1");
    }
    const sliderRef = useRef(null);
    const scrollX = useRef(new Anime.Value(0)).current;
 
    const viewableItemChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0]?.index);
      
        if (viewableItems[0]?.index === DATA.length - 1) {
          setButtonText("Get Started");
        } else {
          setButtonText("Next");
        }
      }).current;
    
    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    function renderItem({item, index}) {
    return (
        <View
        key={index}
        style={{
            width,
            flex: 1,
            justifyContent: 'space-between',
           
        }}>
            <View style={{
                width:'120%',
                paddingTop: '10%',
                width: '85%',
            }}>

        <Text
            style={{
            color: Colors.white,
            fontSize: 30,
            fontWeight: '600',
            paddingLeft: 12,
            lineHeight: 42,
            textShadowColor: 'black', // Set the outline color
            textShadowOffset: { width: 2, height: 2 }, // Set the outline offset
            textShadowRadius: 2, // Set the outline radius
            }}>
            {<>
                <Text style={{color: Colors.yellow,
                    fontSize: 32,
                    fontWeight: '900',
            }}>
                    {item.substring(0,item.indexOf(':'))+'\n'}</Text>
                <Text style={{color: Colors.white,
                      fontSize: 28,
                 fontWeight: '900',
                }}>{item.substring(item.indexOf(':')+2)}</Text>
            </>}
        </Text>
        </View>
        </View>
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
            title={buttonText}
            onClick={()=> buttonText === "Next" ? scrollToNextItem() : startTheApp()}
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