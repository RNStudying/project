import {FeedInfo} from '../@types/FeedInfo';
import {RootReducer} from '../store';
import {sleep} from '../utils/sleep';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import {Platform} from 'react-native';

export const GET_FEED_LIST_REQUEST = 'GET_FEED_LIST_REQUEST' as const;
export const GET_FEED_LIST_SUCCESS = 'GET_FEED_LIST_SUCCESS' as const;
export const GET_FEED_LIST_FAILURE = 'GET_FEED_LIST_FAILURE' as const;

export const CREATE_FEED_REQUEST = 'CREATE_FEED_REQUEST' as const;
export const CREATE_FEED_SUCCESS = 'CREATE_FEED_SUCCESS' as const;
export const CREATE_FEED_FAILURE = 'CREATE_FEED_FAILURE' as const;

export const FAVORITE_FEED_REQUEST = 'FAVORITE_FEED_REQUEST' as const;
export const FAVORITE_FEED_SUCCESS = 'FAVORITE_FEED_SUCCESS' as const;
export const FAVORITE_FEED_FAILURE = 'FAVORITE_FEED_FAILURE' as const;

export const getFeedListRequest = () => {
  return {
    type: GET_FEED_LIST_REQUEST,
  };
};

export const getFeedListSuccess = (list: FeedInfo[]) => {
  return {
    type: GET_FEED_LIST_SUCCESS,
    list,
  };
};

export const getFeedListFailure = () => {
  return {
    type: GET_FEED_LIST_FAILURE,
  };
};

export const createFeedRequest = () => {
  return {
    type: CREATE_FEED_REQUEST,
  };
};
export const createFeedSuccess = (item: FeedInfo) => {
  return {
    type: CREATE_FEED_SUCCESS,
    item,
  };
};
export const createFeedFailure = () => {
  return {
    type: CREATE_FEED_FAILURE,
  };
};

export const getFeedList = (): TypeFeedListThunkAction => async dispatch => {
  dispatch(getFeedListRequest());

  // await sleep(500);
  const lastFeedList = await database()
    .ref('/feed')
    .once('value')
    .then(snapshot => snapshot.val());

  const result = Object.keys(lastFeedList).map(key => {
    return {
      ...lastFeedList[key],
      id: key,
      likeHistory: lastFeedList[key].likeHistory ?? [],
    };
  });
  dispatch(getFeedListSuccess(result));
};

export const createFeed =
  (
    item: Omit<FeedInfo, 'id' | 'writer' | 'createdAt' | 'likeHistory'>,
  ): TypeFeedListThunkAction =>
  async (dispatch, getState) => {
    dispatch(createFeedRequest());

    const createdAt = new Date().getTime();
    const userInfo = getState().userInfo.userInfo;
    const pickPhotoUrlList = item.imageUrl.split('/');
    const pickPhotoFileName = pickPhotoUrlList[pickPhotoUrlList.length - 1];

    const putFileUrl = await storage()
      .ref(pickPhotoFileName)
      .putFile(
        Platform.OS === 'ios'
          ? item.imageUrl.replace('file://', '')
          : item.imageUrl,
      )
      .then(result => storage().ref(result.metadata.fullPath).getDownloadURL());
    const feedDB = await database().ref(`/feed`);
    const saveItem: Omit<FeedInfo, 'id'> = {
      content: item.content,
      writer: {
        name: userInfo?.name || 'Unknown',
        uid: userInfo?.uid || 'Unknown',
      },
      imageUrl: putFileUrl,
      likeHistory: [],
      createdAt,
    };

    await feedDB.push().set({
      ...saveItem,
    });

    const lastFeedList = await feedDB
      .once('value')
      .then(snapshot => snapshot.val());

    Object.keys(lastFeedList).forEach(key => {
      const item = lastFeedList[key];

      if (item.creataedAt == createdAt && putFileUrl === item.imageUrl) {
        dispatch(
          createFeedSuccess({
            id: key,
            content: item.content,
            writer: item.writer,
            imageUrl: item.imageUrl,
            likeHistory: item.likeHistory ?? [],
            createdAt,
          }),
        );
      }
    });

    // await sleep(200);

    // dispatch(
    //   createFeedSuccess({
    //     id: 'ID_01',
    //     content: item.content,
    //     writer: {
    //       name: userInfo?.name ?? 'Unknown',
    //       uid: userInfo?.uid ?? 'Unknown',
    //     },
    //     imageUrl: item.imageUrl,
    //     likeHistory: userInfo.likeHistory ?? 'Unknown',
    //     createdAt: createAt,
    //   }),
    // );
  };
export const favoriteFeedRequest = () => {
  return {
    type: FAVORITE_FEED_REQUEST,
  };
};
export const favoriteFeedSuccess = (
  feedId: FeedInfo['id'],
  myId: string,
  action: 'add' | 'del',
) => {
  return {
    type: FAVORITE_FEED_SUCCESS,
    feedId,
    myId,
    action,
  };
};
export const favoriteFeedFailure = () => {
  return {
    type: FAVORITE_FEED_FAILURE,
  };
};

export const favoriteFeed =
  (item: FeedInfo): TypeFeedListThunkAction =>
  async (dispatch, getState) => {
    dispatch(favoriteFeedRequest());

    // 나의 피드 가져오기
    const myId = getState().userInfo.userInfo?.uid || null;

    if (myId === null) {
      dispatch(favoriteFeedFailure());
      return;
    }

    const feedDB = database().ref(`/feed/${item.id}`);
    const feedItem = (await feedDB
      .once('value')
      .then(snapshot => snapshot.val())) as FeedInfo;

    if (typeof feedItem.likeHistory === 'undefined') {
      await feedDB.update({
        likeHistory: [myId],
      });
      dispatch(favoriteFeedSuccess(item.id, myId, 'add'));
    } else {
      const hasMyId =
        feedItem.likeHistory.filter(likeUserId => likeUserId === myId).length >
        0;
      if (hasMyId) {
        await feedDB.update({
          likeHistory: feedItem.likeHistory.filter(
            likeUserId => likeUserId !== myId,
          ),
        });
        dispatch(favoriteFeedSuccess(item.id, myId, 'del'));
      } else {
        await feedDB.update({
          likeHistory: feedItem.likeHistory.concat([myId]),
        });
        dispatch(favoriteFeedSuccess(item.id, myId, 'add'));
      }
    }

    // await sleep(1000);

    // 내가 좋아요 했는지 체크
    //   const hasMyId =
    //     item.likeHistory.filter(likeUserId => likeUserId === myId).length > 0;

    //   if (hasMyId) {
    //     // 있을 경우 빼는 액션
    //     dispatch(favoriteFeedSuccess(item.id, myId, 'del'));
    //   } else {
    //     // 없을 경우 추가 액션
    //     dispatch(favoriteFeedSuccess(item.id, myId, 'add'));
    //   }
  };

// 디스패치에 대한 타입정리
export type TypeFeedListDispatch = ThunkDispatch<
  RootReducer,
  undefined,
  TypeFeedListActions
>;

export type TypeFeedListThunkAction = ThunkAction<
  void, //return type
  any, //state (redux state)
  any, //
  TypeFeedListActions //action
>;

// 이걸 해야 dispatch에서 사용할 수 있다
export type TypeFeedListActions =
  | ReturnType<typeof getFeedListRequest> //getFeedListRequest return값을 나열한다
  | ReturnType<typeof getFeedListSuccess>
  | ReturnType<typeof getFeedListFailure>
  | ReturnType<typeof createFeedRequest>
  | ReturnType<typeof createFeedSuccess>
  | ReturnType<typeof createFeedFailure>
  | ReturnType<typeof favoriteFeedRequest>
  | ReturnType<typeof favoriteFeedSuccess>
  | ReturnType<typeof favoriteFeedFailure>;
