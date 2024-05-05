import VideoDesc from './VideoDesc';
import {
  Animated,
  BackHandler,
  Dimensions,
  PanResponder,
  Image,
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import normalize from '../utils/helpers/normalize';
import {Colors} from '../constants/colors';
import {Icons} from '../constants/icons';
import Video from 'react-native-video';
import {Picker} from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import {SecondstoTime} from '../utils/helpers/UnitConverter';
import Orientation from 'react-native-orientation-locker';
import {Images} from '../constants/image';
import { showNavigationBar, hideNavigationBar } from 'react-native-navigation-bar-color';

const videoOptions = {
  q360p: {
    url: 'https://www087.vipanicdn.net/streamhls/fa49afeab0c675c5eb0b2f5b301c1329/ep.3.1703903294.360.m3u8',
    name: '360p',
  },
  q480p: {
    url: 'https://www087.vipanicdn.net/streamhls/fa49afeab0c675c5eb0b2f5b301c1329/ep.3.1703903294.480.m3u8',
    name: '480p',
  },
  q720p: {
    url: 'https://www087.vipanicdn.net/streamhls/fa49afeab0c675c5eb0b2f5b301c1329/ep.3.1703903294.720.m3u8',
    name: '720p',
  },
  q1080p: {
    url: 'https://www087.vipanicdn.net/streamhls/fa49afeab0c675c5eb0b2f5b301c1329/ep.3.1703903294.1080.m3u8',
    name: '1080p',
  },
};

const PlayTab = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [isMinimize, setIsMinimize] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isShowControls, setIsShowControls] = useState(true);
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  const [swipeDownComplete,setSwipeDownComplete] = useState(true);

  const [quality, setQuality] = useState('q480p');

  const [playbackTime, setPlaybackTime] = useState(0.0);
  const [duration, setDuration] = useState(0);

  const lastTapTimeRef = useRef(null);

  const [skipSeconds, setSkipSeconds] = useState(5.0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  const slideAnimation = useRef(new Animated.Value(0)).current;

  const videoRef = useRef(0);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  /**
   * Remove event listeners for keyboardDidShow and keyboardDidHide events.
   *
   * @returns {void}
   */
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  /**
   * Adds a listener for the hardware back button and enables it to toggle
   * between fullscreen and minimized states when pressed.
   *
   * @returns {void}
   */
  useEffect(() => {
    const handleBackButton = () => {
      if (isFullscreen) {
        setIsFullscreen(false);
        return true;
      } else if (!isMinimize) {
        setIsMinimize(true);
        return true;
      } else {
        return false;
      }
    };
    const backHandlerSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );
    return () => {
      backHandlerSubscription.remove();
    };
  }, [isMinimize, isFullscreen]);

  /**
   * Updates the visibility of the navigation bar when the video is
   * fullscreen or minimized.
   *
   * @return {void}
   */
  useEffect(() => {
    if(isFullscreen)
      hideNavigationBar();
    else
      showNavigationBar();
  }, [isFullscreen, isShowControls]);

  /**
   * Updates the device orientation when the video goes fullscreen or
   * minimized.
   *
   * @return {void}
   */
  useEffect(() => {
    if (isFullscreen) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }, [isFullscreen]);

  

  /**
   * Hides the controls after 5 seconds if the video is playing and
   * the option modal is not open.
   *
   * @return {void}
   */
  useEffect(() => {
    let controlsTimeout;

    const hideControls = () => {
      setIsShowControls(false);
    };

    if ((isShowControls && isPlay) && !isOptionOpen) {
      controlsTimeout = setTimeout(hideControls, 5000);
    }

    return () => {
      clearTimeout(controlsTimeout);
    };
  }, [isShowControls, isPlay, isOptionOpen]);

  /**
   * Animates the slideAnimation value to 0 or 1 based on isMinimize.
   *
   * @return {void}
   */
  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: isMinimize ? 0 : 1,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [isMinimize]);

  /**
   * @description Creates a PanResponder instance that listens for swipe up and down
   * gestures to minimize or maximize the player view.
   */
  const panResponder = useRef(
    PanResponder.create({
      /**
       * Determines if the pan responder should be set based on gesture state.
       *
       * @param {Object} _ - unused event
       * @param {Object} gestureState - the state of the pan gesture
       * @return {boolean} boolean indicating whether the pan responder should be set
       */
      onMoveShouldSetPanResponder: (_, gestureState) =>
        gestureState.dy > 3 && gestureState.vy > 1 || gestureState.dy < 3 && gestureState.vy < 1,
      /**
       * Handler for the pan responder move event.
       *
       * @param {Object} _ - unused event
       * @param {Object} gestureState - the state of the pan gesture
       */
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > Dimensions.get('window').height * 0.2) {//  swipe down
          setIsMinimize(true);
        } else if (gestureState.dy < -Dimensions.get('window').height * 0.2) { // swipe up
          setIsMinimize(false);
          setSwipeDownComplete(false);
        }
      },
      /**
       * Handle the release of the PanResponder
       *
       * @param {Object} _ - placeholder for the unused event
       * @param {Object} gestureState - the state of the gesture
       */
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > Dimensions.get('window').height * 0.2) { //  swipe down
          setIsMinimize(true);
        } else if (gestureState.dy < -Dimensions.get('window').height * 0.2) { //swipe up
          setIsMinimize(false);
          setSwipeDownComplete(false);
        }
      },
    }),
  ).current;

  /**
   * @description Adds a listener to the animation and cleans it up on unmount.
   * Checks if the animation value is 0, if it is set the swipeDownComplete to true.
   *
   * @returns {void}
   */
  useEffect(() => {
    const animationListener = slideAnimation.addListener(({ value }) => {
      if (value === 0) {
        setSwipeDownComplete(true);
      }
    });
    return () => {
      slideAnimation.removeListener(animationListener);
    };
  }, [slideAnimation]);

  /**
   * Handles the video press event and toggles controls based on tap delay.
   *
   * @return {type} undefined
   */
  const handleVideoPress = () => {
    const now = new Date().getTime();
    const DOUBLE_TAP_DELAY = 300; // Adjust as needed for your use case (in milliseconds)

    if (now - lastTapTimeRef.current < DOUBLE_TAP_DELAY) {
      console.log('Double tap!');
      setIsPlay(prev => !prev);
    }else{
      console.log('Single tap!');
      setIsShowControls(prev => !prev)
    }

    lastTapTimeRef.current = now;
  };
  


  /**
   * @description Handles video load event and sets the duration.
   * Sets the video current time to the playback time.
   *
   * @param {object} meta - video metadata
   * @param {number} meta.duration - video duration in seconds
   * @returns {void}
   */
  const handleLoad = meta => {
    setDuration(meta.duration);
    if (videoRef.current) {
      videoRef.current.seek(playbackTime);
    }
  };

  /**
   * @description Skip video to specific time
   * @param {number} value - time in seconds to skip to
   * @returns {void}
   */
  const skipvideo = (value) => {
    if (videoRef.current && value < 0) {
      videoRef.current.seek(0.0);
    } else if (videoRef.current) {
      videoRef.current.seek(value);
      setPlaybackTime(value);
    }
  };

  /**
   * @description Handles video progress event and updates the current playback
   * time.
   *
   * @param {object} progress - video progress data
   * @param {number} progress.currentTime - current playback time in seconds
   * @returns {void}
   */
  const handleProgress = progress => {
    setPlaybackTime(progress.currentTime);
  };

  /**
   * @description Animated value for swipe down animation, used to move
   * play tab down when minimized
   * @type {Animated.Value}
   */
  const swipeDownAnimation = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').height,0],
  });
  /**
   * @description Animated value for swipe up animation, used to move
   * play tab up when minimized
   * @type {Animated.Value}
   */
  const swipeUpAnimation = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      0,
      -Dimensions.get('window').height,
    ],
  });


  return (
    <Animated.View
    {...(isFullscreen ? {} : panResponder.panHandlers)}
      style={[
        swipeDownComplete ? styles.minimizedcontainer : isMinimize ? [styles.openmodalcontainer, { height: 0, bottom:0, marginBottom:53 }] : [styles.openmodalcontainer,{top:0}],
        {
          bottom: swipeDownComplete && isKeyboardVisible ? 0 : 53,
          transform: [  isMinimize ?
            {
              translateY: swipeUpAnimation
            }:{
              translateY: swipeDownAnimation
            }
          ],
        },
      ]}
      onAnimationEnd={() => setIsMinimize(false)}
      >
      <StatusBar hidden={isFullscreen && !isShowControls} />
      {!isMinimize && (isShowControls || !isVideoLoaded) && (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              position: 'absolute',
              zIndex: 4,
              width: '100%',
              marginTop: normalize(10),
            }}>
            {isFullscreen ? (
              <View
                style={{
                  padding: normalize(5),
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Text
                  style={styles.title}
                  numberOfLines={1}
                  ellipsizeMode="middle">
                  Tokyo Ghoul
                </Text>
                <Text style={styles.SEtitle}>S01 E03</Text>
              </View>
            ) : (
              <View>
              </View>
            )}
            {!isFullscreen && (
              <TouchableOpacity
                onPress={() => setIsMinimize(true)}
                style={{paddingHorizontal: normalize(5)}}>
                <Image
                  source={Icons.arrowDown}
                  style={{width: normalize(20), height: normalize(20)}}
                />
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
      {/* Main View tag for all three way to render the tabScreen minimize, maximize and fullscreen */}
      <View style={styles.playTabcontainer}>
        <View
          style={
            swipeDownComplete && !isFullscreen
              ? {
                  flexDirection: 'row',
                  marginHorizontal: normalize(8),
                }
              : {height: isFullscreen ? '100%' : normalize(200)}
          }>
          <Pressable
            onLongPress={()=>isMinimize ? setIsMinimize(false) || setSwipeDownComplete(false) : setIsFullscreen(prev=>!prev)}
            
            onPress={() =>
              swipeDownComplete
                ? setIsMinimize(false) || setSwipeDownComplete(false)
                : handleVideoPress()
            }
            style={
              swipeDownComplete
                ? {flexDirection: 'row', gap: normalize(10), flex: 1}
                : {height: isFullscreen ? '100%' : normalize(200)}
            }>
            {isVideoLoaded || isPlay ? (
              // main video component
              <Video
                ref={videoRef}
                source={{
                  uri: videoOptions[quality]?.url,
                  type: 'm3u8',
                }}
                style={swipeDownComplete ? styles.videoFrame : {flex: 1}}
                resizeMode={
                  isFullscreen ? 'contain' : swipeDownComplete ? 'cover' : 'contain'
                }
                paused={!isPlay}
                rate={playbackSpeed}
                onProgress={handleProgress}
                onLoad={meta => {
                  handleLoad(meta);
                  setIsVideoLoaded(true);
                }}
              />
            ) : (
              <Image
                source={Images.videobg}
                style={
                  swipeDownComplete
                    ? styles.videoFrame
                    : {
                        width: '100%',
                        height: isFullscreen ? '100%' : normalize(200),
                      }
                }
                resizeMode="cover"
              />
            )}
            {/* items in for bottom PlayTab */}
            {swipeDownComplete && (
              <View style={{flex: 1}} {...panResponder.panHandlers}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.title}>
                  Tokyo Ghouls
                </Text>
                <Text style={styles.SEtitle}>S02 E03</Text>
              </View>
            )}
          </Pressable>
          {swipeDownComplete && (
            <TouchableOpacity onPress={() => setIsPlay(prev => !prev)}>
              <Image
                source={isPlay ? Icons.pauseButton : Icons.playButton}
                style={styles.playpause}
              />
            </TouchableOpacity>
          )}
        </View>
        {isShowControls && !isMinimize && (
          // Video overlayer for options and slider
          <View
            style={{
              width: '100%',
              position: 'absolute',
              height: isFullscreen ? '100%' : normalize(200),
              justifyContent: 'flex-end',
            }}>
            {/* Video Slider */}
            {isVideoLoaded && <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                backgroundColor: 'rgba(0,0,0,0.5)',
                alignItems: 'center',
              }}>
              <Text>{SecondstoTime(playbackTime)}</Text>
              <Slider
                style={{
                  width: '80%',
                  alignSelf: 'center',
                  height: normalize(20),
                  transform: [{ scaleY: 2 }]
                }}
                minimumValue={0}
                maximumValue={duration}
                value={playbackTime}
                onValueChange={value => setPlaybackTime(value)}
                onSlidingComplete={value => videoRef.current.seek(value)}
                minimumTrackTintColor={Colors.red}
                maximumTrackTintColor={Colors.grey}
                thumbTintColor={Colors.white}
                thumbImage={Icons.videothumb}
              />
              <Text>{SecondstoTime(duration)}</Text>
            </View>
            }
            {/* Video Options tab */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
                paddingVertical: normalize(10),
              }}>
              <TouchableOpacity onPress={() => setIsOptionOpen(prev => !prev)}>
                <Image source={Icons.videosettings} style={styles.button} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image source={Icons.prev} style={styles.button} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => skipvideo(playbackTime - skipSeconds)}>
                <Image source={Icons.fastBackward} style={styles.button} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsPlay(prev => !prev)}>
                <Image source={isPlay ? Icons.pauseButton : Icons.playButton} style={styles.playpause}/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => skipvideo(playbackTime + skipSeconds)}>
                <Image source={Icons.fastForward} style={styles.button} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image source={Icons.next} style={styles.button} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsFullscreen(prev => !prev)}>
                <Image
                  source={
                    isFullscreen ? Icons.fullscreenExit : Icons.fullscreen
                  }
                  style={styles.button}
                />
              </TouchableOpacity>
              
            </View>
            {/* Settings Modal - three dots */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={isOptionOpen}
              onRequestClose={() => setIsOptionOpen(false)}>
              <TouchableWithoutFeedback onPress={() => setIsOptionOpen(false)}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableWithoutFeedback onPress={() => {}}>
                    <View
                      style={{
                        margin: normalize(10),
                        rowGap: normalize(10),
                        width: normalize(160),
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        padding: normalize(20),
                      }}>
                      <View>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontWeight: '600',
                            marginBottom: normalize(10),
                          }}>
                          Quality
                        </Text>
                        <Picker
                          style={{backgroundColor: Colors.maroon}}
                          selectedValue={quality}
                          onValueChange={(item, index) => setQuality(item)}>
                          <Picker.Item
                            label="Select a Quality"
                            enabled={false}
                          />
                          <Picker.Item label="360p" value="q360p" />
                          <Picker.Item label="480p" value="q480p" />
                          <Picker.Item label="720p" value="q720p" />
                          <Picker.Item label="1080p" value="q1080p" />
                        </Picker>
                      </View>
                      <View>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontWeight: '600',
                            marginBottom: normalize(10),
                          }}>
                          Speed
                        </Text>
                        <Picker
                          style={{backgroundColor: Colors.maroon}}
                          selectedValue={playbackSpeed}
                          onValueChange={(item, index) =>
                            setPlaybackSpeed(item)
                          }>
                          <Picker.Item
                            label="Select a Playback Speed"
                            enabled={false}
                          />
                          <Picker.Item label="0.5x" value={0.5} />
                          <Picker.Item label="1.0x" value={1.0} />
                          <Picker.Item label="1.25x" value={1.25} />
                          <Picker.Item label="1.5x" value={1.5} />
                          <Picker.Item label="2.0x" value={2.0} />
                        </Picker>
                      </View>
                      <View>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontWeight: '600',
                            marginBottom: normalize(10),
                          }}>
                          Skip Seconds
                        </Text>
                        <Picker
                          style={{backgroundColor: Colors.maroon}}
                          selectedValue={skipSeconds}
                          onValueChange={(value, index) =>
                            setSkipSeconds(value)
                          }>
                          <Picker.Item
                            label="Select a Skip Seconds"
                            enabled={false}
                          />
                          <Picker.Item label="5s" value={5.0} />
                          <Picker.Item label="10s" value={10.0} />
                          <Picker.Item label="15s" value={15.0} />
                          <Picker.Item label="30s" value={30.0} />
                        </Picker>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
        )}
      </View>
      {!isMinimize && !isFullscreen && (
      <View  style={{marginTop: normalize(200)}}>
        <VideoDesc />
        <ScrollView>
        </ScrollView>
      </View>
      )}
    </Animated.View>
  );
};

export default PlayTab;

const styles = StyleSheet.create({
  minimizedcontainer: {
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    height: normalize(50),
    backgroundColor: Colors.black,
    justifyContent: 'center',
  },
  openmodalcontainer: {
    backgroundColor: Colors.black,
    left: 0,
    right: 0,
    zIndex: 1,
    height: '100%',
    position: 'absolute',
  },
  playTabcontainer: {
    ...StyleSheet.absoluteFill,
  },
  playpause: {
    width: normalize(24),
    height: normalize(24),
  },
  button: {
    width: normalize(15),
    height: normalize(15),
  },
  videoFrame: {
    width: normalize(50),
    height: normalize(30),
  },
  title: {
    fontSize: normalize(15),
    fontWeight: '800',
    color: Colors.white,
    textShadowRadius: normalize(3),
    textShadowColor: Colors.black
  },
  SEtitle: {
    fontSize: normalize(12),
    fontWeight: '400',
    color: Colors.yellow,
    textShadowRadius: normalize(3),
    textShadowColor: Colors.maroon  
  },
});
