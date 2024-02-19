import {
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useEffect, useRef, useState} from 'react';
  import normalize from '../utils/helpers/normalize';
  import {Colors} from '../constants/colors';
  import {Icons} from '../constants/icons';
  import Video from 'react-native-video';
  import NetInfo from "@react-native-community/netinfo";
  
  const  videoOptions = {
    q360p: "https://www087.vipanicdn.net/streamhls/fa49afeab0c675c5eb0b2f5b301c1329/ep.3.1703903294.360.m3u8",
    q480p: 	"https://www087.vipanicdn.net/streamhls/fa49afeab0c675c5eb0b2f5b301c1329/ep.3.1703903294.480.m3u8",
    q720p: "https://www087.vipanicdn.net/streamhls/fa49afeab0c675c5eb0b2f5b301c1329/ep.3.1703903294.720.m3u8",
    q1080p: "https://www087.vipanicdn.net/streamhls/fa49afeab0c675c5eb0b2f5b301c1329/ep.3.1703903294.1080.m3u8",
  }
  
  const PlayTab = () => {
    const [isPlay, setIsPlay] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const [playbackTime, setPlaybackTime] = useState(0);
    const videoRef = useRef(null);
  
    const [quality, setQuality] = useState('q720p');
    const [buffering, setBuffering] = useState(false);
  
   useEffect(() => {
      const unsubscribe = NetInfo.addEventListener(state => {
        let quality = 'q720p'; // default to high quality
        if (state.type === 'cellular') {
          switch (state.details.cellularGeneration) {
            case '2g':
              quality = 'q360p';
              break;
            case '3g':
              quality = 'q480p';
              break;
            case '4g':
              quality = 'q720p';
              break;
          }
        }
        setQuality(quality);
      });
  
      return () => unsubscribe();
    }, []);
  
    const handleBuffer = ({isBuffering}) => {
      setBuffering(isBuffering);
      if (isBuffering && quality !== 'q360p') {
        setQuality((prevQuality) => {
          switch (prevQuality) {
            case 'q1080p':
              return 'q720p';
            case 'q720p':
              return 'q480p';
            case 'q480p':
              return 'q360p';
            default:
              return prevQuality;
          }
        });
      }
    };
  
    const handleProgress = (progress) => {
      setPlaybackTime(progress.currentTime);
    };
  
    const handleLoad = (meta) => {
      if (videoRef.current) {
        videoRef.current.seek(playbackTime);
      }
    };
    return (
      <>
        {isModalOpen ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}>
            <View style={{flex: 1, backgroundColor: Colors.black}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{padding: normalize(5)}}>
                  <Text style={styles.title}>Tokyo Ghoul</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setIsModalOpen(false)}
                  style={{padding: normalize(5)}}>
                  <Image
                    source={Icons.arrowDown}
                    style={{width: normalize(20), height: normalize(20)}}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  padding: normalize(5),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.SEtitle}>S01 E03</Text>
              </View>
              <View style={{height:normalize(200)}}>
                <Video
                  ref={videoRef}
                  source={{
                    uri: videoOptions[quality],
                    type: 'm3u8',
                  }}
                  style={{flex:1}}
                  resizeMode="contain"
                  paused={!isPlay}
                  onProgress={handleProgress}
                  onLoad={handleLoad}
                  onBuffer={handleBuffer}
                />
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-evenly', alignItems: 'center'}}>
                <TouchableOpacity onPress={() =>{}}>
                  <Image
                    source={Icons.fastBackward}
                    style={styles.button}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{}}>
                  <Image
                    source={Icons.prev}
                    style={styles.button}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsPlay(prev => !prev)}>
                  <Image
                    source={isPlay ? Icons.pauseButton : Icons.playButton}
                    style={styles.playpause}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <Image
                    source={Icons.next}
                    style={styles.button}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <Image
                    source={Icons.fastForward}
                    style={styles.button}
                  />
              </TouchableOpacity>
              </View>
            </View>
          </Modal>
        ):
        <View style={styles.container}>
          <View
            style={{
              marginHorizontal: normalize(10),
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
              alignItems: 'center',
            }}>
            <Pressable
              onPress={() => setIsModalOpen(true)}
              style={{flex: 1, flexDirection: 'row', gap: normalize(10)}}>
              <Video
                ref={videoRef}
                source={{
                  uri: videoOptions[quality],
                  type: 'm3u8',
                }}
                style={styles.animepostor}
                resizeMode="cover"
                paused={!isPlay}
                onProgress={handleProgress}
                onLoad={handleLoad}
                onBuffer={handleBuffer}
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
        }
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
    button: {
      width: normalize(15),
      height: normalize(15),
    },
    animepostor: {
      width: normalize(50),
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
  