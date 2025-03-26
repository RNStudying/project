import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {sleep} from '../utils/sleep';
import {RootReducer} from '../store';
import {FeedInfo} from '../@types/FeedInfo';
import {UserInfo} from '../@types/UserInfo';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

// 'as const;' 이유 :  typeScript 타입에서 string이 아닌 변하지 않는 상수값이라는 점을 명시하는 것
export const SET_USER_INFO = 'SET_USER_INFO' as const;

export const GET_MY_FEED_REQUEST = 'GET_MY_FEED_REQUEST' as const;
export const GET_MY_FEED_SUCCESS = 'GET_MY_FEED_SUCCESS' as const;
export const GET_MY_FEED_FAILURE = 'GET_MY_FEED_FAILURE' as const;

export const setUserInfo = (user: UserInfo) => {
  return {
    type: SET_USER_INFO,
    user,
  };
};

export const getMyFeedRequst = () => {
  return {
    type: GET_MY_FEED_REQUEST,
  };
};
export const getMyFeedSuccess = (list: FeedInfo[]) => {
  return {
    type: GET_MY_FEED_SUCCESS,
    list,
  };
};
export const getMyFeedFailure = () => {
  return {
    type: GET_MY_FEED_FAILURE,
  };
};

export const signIn =
  (idToken: string): TypeUserThunkAction =>
  async dispatch => {
    console.log('??');
    // await sleep(1000);
    dispatch(
      setUserInfo({
        uid: 'TEST_INFO',
        name: 'TEST_NAME',
        profileImage: 'TEST_IMAGE',
      }),
    );
    const googleSigninCredential = auth.GoogleAuthProvider.credential(idToken);
    const signinResult = await auth().signInWithCredential(
      googleSigninCredential,
    );

    const userDB = await database().ref(`/users/${signinResult.user.uid}`);

    const user = await userDB.once('value').then(snapshot => snapshot.val());
    console.log('user!!!', user);
    const now = new Date().getTime();
    if (user === null) {
      await userDB.set({
        name: signinResult.user.displayName,
        profileImage: signinResult.user.photoURL,
        uid: signinResult.user.uid,
        createdAt: now,
        lastLoginAt: now,
      });
    } else {
      await userDB.update({
        lastLoginAt: now,
      });
    }

    dispatch(
      setUserInfo({
        uid: signinResult.user.uid,
        name: signinResult.user.displayName ?? 'Unknow Name',
        profileImage: signinResult.user.photoURL ?? '',
      }),
    );
  };

export const getMyFeedList =
  (): TypeUserThunkAction => async (dispatch, getState) => {
    dispatch(getMyFeedRequst());

    await sleep(500);
    const lastFeedList = await database()
      .ref('/feed')
      .once('value')
      .then(snapshot => snapshot.val());

    const result = Object.keys(lastFeedList)
      .map(key => {
        return {
          ...lastFeedList[key],
          id: key,
          likeHistory: lastFeedList[key].likeHistory ?? [],
        };
      })
      .filter(item => item.writer.uid === getState().userInfo.userInfo?.uid);

    dispatch(getMyFeedSuccess(result));
  };

export type TypeUserDispatch = ThunkDispatch<
  RootReducer,
  undefined,
  TypeUserInfoActions
>;

export type TypeUserThunkAction = ThunkAction<
  Promise<void>,
  RootReducer,
  undefined,
  TypeUserInfoActions
>;

export type TypeUserInfoActions =
  | ReturnType<typeof setUserInfo>
  | ReturnType<typeof getMyFeedRequst>
  | ReturnType<typeof getMyFeedSuccess>
  | ReturnType<typeof getMyFeedFailure>;
