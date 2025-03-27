import React, {useEffect} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';

// import {useTotalFeedList} from '../selectors/feed';
// import {FeedListItem} from '../components/FeedListItem';
// import {useDispatch} from 'react-redux';
// import {TypeFeedListDispatch, favoriteFeed, getFeedList} from '../actions/feed';
// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import {faPlus} from '@fortawesome/free-solid-svg-icons';
// import {useRootNavigation} from '../navigations/RootStackNavigation';
import Header from '../components/Header';
import {Spacer} from '../components/Spacer';

export const HomeScreen: React.FC = () => {
  // const feedList = useTotalFeedList();
  // const dispatch = useDispatch<TypeFeedListDispatch>();
  // const rootNavigation = useRootNavigation();
  // const onPressHome = useCallback(() => {
  //   rootNavigation.navigate('AddFeed');
  // }, []);

  useEffect(() => {
    // dispatch(getFeedList());
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header title="반갑습니다! 🎉" />
      <ScrollView
        bounces={false}
        style={{flex: 1, backgroundColor: '#FFF', paddingHorizontal: 10}}>
        <Pressable
          onPress={() => {
            console.log('상세 날씨로 이동');
          }}
          style={{backgroundColor: 'pink', height: 100}}>
          <Text>지금 날씨</Text>
          <Text>누르면 상세 날씨</Text>
        </Pressable>
        <Spacer margin={10} />

        <View style={{backgroundColor: 'skyblue', height: 300}}>
          <Text>캘린더</Text>
          <Text>날짜 누르면 작성하기</Text>
        </View>
        <Spacer margin={10} />
        <View
          style={{
            backgroundColor: '#50C3CD',
            minHeight: 100,
            paddingHorizontal: 20,
          }}>
          <Pressable
            onPress={() => {
              console.log('리스트 누름');
            }}
            style={{
              borderWidth: 1,
              height: 40,
              justifyContent: 'center',
            }}>
            <Text>오늘 리스트</Text>
          </Pressable>
        </View>
      </ScrollView>
      <Pressable
        onPress={() => {
          console.log('작성하러가기! 모달');
        }}
        style={{
          backgroundColor: 'red',
          borderRadius: 99,
          width: 70,
          height: 70,
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}>
        <Text>+ 작성하기 버튼 (메모 또는 일기)</Text>
      </Pressable>
    </View>
  );
};
