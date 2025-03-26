import React, {useEffect, useMemo} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  View,
  useWindowDimensions,
} from 'react-native';
import {Header} from '../components/Header/Header';
// import {useMyFeedList} from '../selectors/user';
import {FeedInfo} from '../@types/FeedInfo';
import {useRootNavigation} from '../navigations/RootStackNavigation';
import {useDispatch} from 'react-redux';
import {TypeUserDispatch, getMyFeedList} from '../actions/user';

export const MyPageScreen: React.FC = () => {
  // const data = useMyFeedList();
  const {width} = useWindowDimensions();
  const rootNavigation = useRootNavigation();
  const photoSize = useMemo(() => {
    return width / 3;
  }, [width]);

  const dispatch = useDispatch<TypeUserDispatch>();
  useEffect(() => {
    dispatch(getMyFeedList());
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="MY PAGE"></Header.Title>
      </Header>
      {/* <FlatList<FeedInfo> //타입정리
        data={data}
        numColumns={3}
        renderItem={({item}) => {
          return (
            <Pressable
              onPress={() => {
                rootNavigation.navigate('FeedList', {list: data});
              }}>
              <Image
                source={{uri: item.imageUrl}}
                width={photoSize}
                height={photoSize}
              />
            </Pressable>
          );
        }}
      /> */}
    </View>
  );
};
