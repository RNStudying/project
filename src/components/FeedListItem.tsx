import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useCallback, useRef} from 'react';
import {
  Image,
  Pressable,
  View,
  useWindowDimensions,
  Text,
  Button,
  Animated,
} from 'react-native';
import {Spacer} from './Spacer';
import {DoubleTapButton} from './DoubleTabButton';
import {getMillisToDateString} from '../utils/DateUtils';

export const FeedListItem: React.FC<{
  image: string;
  isLiked: boolean;
  likeCount: number;
  writer: string;
  comment: string;
  createdAt: number;
  onPressFeed: () => void;
  onPressFavorite: () => void;
}> = props => {
  const {width} = useWindowDimensions();

  const scaleValue = useRef(new Animated.Value(0)).current;
  const alphaValue = useRef(new Animated.Value(0)).current;

  const onPressDoubleTab = useCallback(() => {
    console.log('onPressDoubleTab');

    if (props.isLiked) {
      console.log('hey?');
      return;
    }
    props.onPressFavorite();

    scaleValue.setValue(0);
    alphaValue.setValue(1);

    Animated.timing(scaleValue, {
      toValue: 2,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        alphaValue.setValue(0);
      }, 1000);
    });
  }, [scaleValue, alphaValue, props.isLiked]);

  return (
    <View>
      <View>
        <DoubleTapButton onPressDoubleTab={onPressDoubleTab}>
          <View style={{width: width, height: width}}>
            <Image source={{uri: props.image}} width={width} height={width} />
            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Animated.View
                style={{transform: [{scale: scaleValue}], opacity: alphaValue}}>
                <FontAwesomeIcon icon={faHeart} size={64} color={'red'} />
              </Animated.View>
            </View>
          </View>
        </DoubleTapButton>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Pressable onPress={props.onPressFavorite}>
            <View style={{paddingHorizontal: 12, paddingVertical: 6}}>
              <FontAwesomeIcon
                icon={faHeart}
                size={20}
                color={props.isLiked ? 'red' : 'black'}
              />
            </View>
          </Pressable>
          <Text style={{fontSize: 16}}>
            {getMillisToDateString(props.createdAt)}{' '}
          </Text>
        </View>
        <View style={{paddingHorizontal: 12}}>
          <Text style={{fontSize: 12}}>{`좋아요 ${props.likeCount}개`}</Text>
          <Spacer space={4} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 16}}>{props.writer} </Text>
            <Spacer space={8} />
            <Text style={{fontSize: 16}}>{props.comment} </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
