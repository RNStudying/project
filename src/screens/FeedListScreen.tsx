import React from 'react';
import {FlatList, Pressable, View} from 'react-native';
import {Header} from '../components/Header/Header';
import {FeedListItem} from '../components/FeedListItem';
import {
  useRootNavigation,
  useRootRoute,
} from '../navigations/RootStackNavigation';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import {useDispatch} from 'react-redux';
import {TypeFeedListDispatch, favoriteFeed} from '../actions/feed';

export const FeedListScreen: React.FC = () => {
  const route = useRootRoute<'FeedList'>();
  const navigation = useRootNavigation<'FeedList'>();
  const dispatch = useDispatch<TypeFeedListDispatch>();
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="FEED LIST"></Header.Title>
        <Pressable onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faClose} size={20} />
        </Pressable>
      </Header>

      <FlatList
        data={route.params.list}
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
      />
    </View>
  );
};
