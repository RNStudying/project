import React, {useCallback, useEffect} from 'react';
import {FlatList, Pressable, View} from 'react-native';
import {Header} from '../components/Header/Header';
// import {useTotalFeedList} from '../selectors/feed';
import {FeedListItem} from '../components/FeedListItem';
import {useDispatch} from 'react-redux';
import {TypeFeedListDispatch, favoriteFeed, getFeedList} from '../actions/feed';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {useRootNavigation} from '../navigations/RootStackNavigation';

export const HomeScreen: React.FC = () => {
  // const feedList = useTotalFeedList();
  const dispatch = useDispatch<TypeFeedListDispatch>();
  const rootNavigation = useRootNavigation();
  const onPressHome = useCallback(() => {
    rootNavigation.navigate('AddFeed');
  }, []);

  useEffect(() => {
    dispatch(getFeedList());
  }, []);
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="HOME"></Header.Title>
        <Pressable onPress={onPressHome}>
          <FontAwesomeIcon icon={faPlus} size={25} />
        </Pressable>
      </Header>
      {/* <FlatList
        data={feedList}
        ItemSeparatorComponent={() => <View style={{marginTop: 24}} />}
        renderItem={({item}) => {
          return (
            <FeedListItem
              image={item.imageUrl}
              comment={item.content}
              isLiked={false}
              likeCount={item.likeHistory.length}
              writer={item.writer.name}
              createdAt={item.createdAt}
              onPressFeed={() => console.log('onPressFeed')}
              onPressFavorite={() => {
                console.log('onPressFavorite');
                dispatch(favoriteFeed(item));
              }}
            />
          );
        }}
      /> */}
    </View>
  );
};
