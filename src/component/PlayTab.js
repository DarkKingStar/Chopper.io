import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import normalize from '../utils/helpers/normalize';
import {Colors} from '../constants/colors';
import {Icons} from '../constants/icons';

const PlayTab = () => {
  const [isPlay, setIsPlay] = useState(false);

  return (
    <>
    <View style={styles.container}>
      <View
        style={{
          marginHorizontal: normalize(10),
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
          alignItems: 'center',
        }}>
        <Pressable onPress={()=>{}} style={{flex: 1, flexDirection: 'row', gap: normalize(10)}}>
          <Image
            source={{
              uri: 'https://staticg.sportskeeda.com/editor/2023/06/172fb-16862522395064-1920.jpg',
            }}
            style={styles.animepostor}
          />
          <View style={{flex: 1}}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
              Tokyo Ghouls
            </Text>
            <Text style={styles.SEtitle}>S02 E03</Text>
          </View>
        </Pressable>
        <TouchableOpacity onPress={() => setIsPlay(prev => !prev)}>
          <Image
            source={isPlay ? Icons.pauseButton : Icons.playButton}
            style={styles.playpause}
          />
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
};

export default PlayTab;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 53,
    zIndex: 1,
    left: 0,
    right: 0,
    height: normalize(50),
    backgroundColor: Colors.black,
    justifyContent: 'center',
  },
  playpause: {
    width: normalize(24),
    height: normalize(24),
  },
  animepostor: {
    width: normalize(60),
    height: 53,
  },
  title: {
    fontSize: normalize(13),
    fontWeight: '800',
    paddingRight: normalize(15),
    color: Colors.white,
  },
  SEtitle: {
    fontSize: normalize(10),
    fontWeight: '400',
    color: Colors.yellow,
  },
});
