import React from 'react'; // useMemo // useEffect,
import {
  Image,
  Pressable,
  Text,
  // FlatList,
  // Image,
  // Pressable,
  // useWindowDimensions,
  View,
} from 'react-native';
import Header from '../components/Header';
import {Spacer} from '../components/Spacer';
// import {Header} from '../components/Header/Header';
// import {useMyFeedList} from '../selectors/user';
// import {FeedInfo} from '../@types/FeedInfo';
import {useRootNavigation} from '../navigations/RootStackNavigation';
import {useSelector} from 'react-redux';
// import {getUserInfo, TypeUserDispatch} from '../actions/user';
// import {useDispatch} from 'react-redux';
// import {TypeUserDispatch, getMyFeedList} from '../actions/user';

export const MyPageScreen: React.FC = () => {
  // const data = useMyFeedList();
  // const {userInfo}=useDi
  // const {width} = useWindowDimensions();
  const rootNavigation = useRootNavigation();
  // const photoSize = useMemo(() => {
  //   return width / 3;

  // }, [width]);

  // userInfoReducer 에서 !
  const userInfo = useSelector((state: any) => state.userInfo);

  return (
    <View style={{flex: 1, backgroundColor: '#FFF', paddingHorizontal: 10}}>
      <Header title="MyPage" />
      <Text>프로필</Text>
      <View
        style={{
          backgroundColor: '#C2F5B5',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          alignItems: 'center',
        }}>
        <Pressable style={{}}>
          <Image
            source={{uri: `${userInfo.userInfo.profileImage}`}}
            style={{width: 50, height: 50, borderRadius: 50}}
          />
        </Pressable>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>이름 | 닉네임</Text>
          <Text>{userInfo.userInfo.name}</Text>
        </View>
        <Pressable style={{borderWidth: 1}}>
          <Text>닉네임 변경</Text>
        </Pressable>
      </View>
      <Spacer margin={10} />
      <Pressable
        onPress={() => {
          rootNavigation.navigate('Community');
        }}
        style={{backgroundColor: '#F266CD', flex: 3}}>
        <Text>커뮤니티</Text>
      </Pressable>
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
