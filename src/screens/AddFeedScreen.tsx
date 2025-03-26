import React, {useCallback, useMemo, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClose, faPlus} from '@fortawesome/free-solid-svg-icons';

import {Header} from '../components/Header/Header';
import {useRootNavigation} from '../navigations/RootStackNavigation';
import {useDispatch} from 'react-redux';
import {TypeFeedListDispatch, createFeed} from '../actions/feed';

export const AddFeedScreen: React.FC = () => {
  const rootNavigation = useRootNavigation();
  const SafeAreaInsets = useSafeAreaInsets();
  const dispatch = useDispatch<TypeFeedListDispatch>();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState<string>('');
  const onPressBack = useCallback(() => {
    rootNavigation.goBack();
  }, []);

  const canSave = useMemo(() => {
    if (selectedPhoto === null) return false;
    if (inputMessage === '') return false;

    return true;
  }, [selectedPhoto, inputMessage]);

  const onPressGetPhoto = useCallback(async () => {
    const result = await ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    });

    setSelectedPhoto(result.path);
  }, []);

  const onPressSave = useCallback(async () => {
    if (!canSave) return;
    if (selectedPhoto === null) return;
    await dispatch(
      createFeed({
        imageUrl: selectedPhoto,
        content: inputMessage,
      }),
    );

    rootNavigation.goBack();
  }, [canSave, selectedPhoto, inputMessage]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="ADD FEED"></Header.Title>
        <Pressable onPress={onPressBack}>
          <FontAwesomeIcon icon={faClose} size={24} />
        </Pressable>
      </Header>

      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          paddingHorizontal: 20,
          paddingVertical: 11,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Pressable onPress={onPressGetPhoto}>
            {selectedPhoto !== null ? (
              <Image
                source={{uri: selectedPhoto}}
                width={100}
                height={100}
                style={{borderRadius: 4}}
              />
            ) : (
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: 'lightgray',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                }}>
                <FontAwesomeIcon icon={faPlus} size={32} color="gray" />
              </View>
            )}
          </Pressable>

          <View
            style={{
              flex: 1,
              marginLeft: 8,
              borderWidth: 1,
              borderRadius: 4,
              borderColor: 'gray',
            }}>
            <TextInput
              value={inputMessage}
              onChangeText={(text: any) => setInputMessage(text)}
              onSubmitEditing={onPressSave}
              placeholder="입력해주세요"
              style={{height: 100, fontSize: 16, paddingLeft: 10}}
              textAlignVertical="top"
              placeholderTextColor={'gray'}
            />
          </View>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Pressable onPress={onPressSave}>
          <View style={{backgroundColor: canSave ? 'black' : 'gray'}}>
            <View
              style={{
                height: 52,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{color: canSave ? 'lightgray' : 'black', fontSize: 18}}>
                저장하기
              </Text>
            </View>
            <View style={{marginTop: SafeAreaInsets.bottom}} />
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};
