import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  PermissionsAndroid,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

// import {useTotalFeedList} from '../selectors/feed';
// import {FeedListItem} from '../components/FeedListItem';
// import {useDispatch} from 'react-redux';
// import {TypeFeedListDispatch, favoriteFeed, getFeedList} from '../actions/feed';
// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import {faPlus} from '@fortawesome/free-solid-svg-icons';
// import {useRootNavigation} from '../navigations/RootStackNavigation';
import Header from '../components/Header';
import {Spacer} from '../components/Spacer';
import {useFocusEffect} from '@react-navigation/native';
import dayjs from 'dayjs';
import Geolocation from 'react-native-geolocation-service';

export const HomeScreen: React.FC = () => {
  // const feedList = useTotalFeedList();
  // const dispatch = useDispatch<TypeFeedListDispatch>();
  // const rootNavigation = useRootNavigation();
  // const onPressHome = useCallback(() => {
  //   rootNavigation.navigate('AddFeed');
  // }, []);

  const today = dayjs().format('YYYYMMDD');
  const baseTime = useMemo(
    () => ['0200', '0500', '0800', '1100', '1400', '1700', '2000', '2300'],
    [],
  );
  const currentTime = dayjs().format('HHmm');
  const closestBaseTime = useRef<string | null>(null);
  const setToday = useRef<string | null>(null);

  const timeCheck = useCallback(() => {
    for (let i = 0; i < baseTime.length; i++) {
      if (currentTime <= baseTime[i]) {
        closestBaseTime.current = baseTime[i];
        break;
      } else {
        break;
      }
    }

    // if (closestBaseTime.current === null) {
    //   closestBaseTime.current = baseTime[baseTime.length - 1];

    // }
  }, [baseTime, currentTime]);
  const [position, setPosition] = useState<{px: number; ny: number}>({
    px: 0,
    ny: 0,
  });
  const latitudeCheck = useCallback(async () => {
    console.log('LATITUDECHECK');
    Geolocation.getCurrentPosition(
      position => {
        console.log('POSTION:', position);
        const {latitude, longitude} = position.coords;
        console.log(
          `Latitude: ${Math.floor(latitude)}, Longitude: ${Math.floor(
            longitude,
          )}`,
        );
        setPosition({px: Math.floor(latitude), ny: Math.floor(longitude)});
      },
      error => {
        console.error(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
    // try {
    //   const granted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //     {
    //       title: '위치 권한 필요',
    //       message: '앱이 위치에 접근할 수 있도록 허용해주세요.',
    //       buttonNeutral: '나중에',
    //       buttonNegative: '취소',
    //       buttonPositive: '허용',
    //     },
    //   );
    //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //     Geolocation.getCurrentPosition(
    //       position => {
    //         const {latitude, longitude} = position.coords;
    //         console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    //       },
    //       error => {
    //         console.error(error);
    //       },
    //       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    //     );
    //   } else {
    //     console.log('위치 권한이 허용되지 않았습니다.');
    //   }
    // } catch (err) {
    //   console.warn(err);
    // }
  }, []);

  const getWeather = useCallback(() => {
    timeCheck();
    const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst
?serviceKey=%2BeKIiP9KuILfRQMYW6mwid1FuD6OBJvjLh02%2FwqpUdnFfeK6KePliqFYtnqxnSQALgi0pHrlQPK6XD%2BXh2tfyg%3D%3D&numOfRows=10&pageNo=1
&base_date=${today}&base_time=${closestBaseTime.current}&nx==${position.px}&ny=${position.ny}
`;
    fetch(url).then(res => {
      if (!res.ok) {
        throw res;
      } else {
        console.log('heheheheeh22:', res);
      }
    });
  }, [today, timeCheck, position.px, position.ny]);
  useFocusEffect(
    useCallback(() => {
      getWeather();
    }, [getWeather]),
  );
  useEffect(() => {
    latitudeCheck();
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
