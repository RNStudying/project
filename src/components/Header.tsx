import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';

import {Pressable, Text, View} from 'react-native';
import {Spacer} from './Spacer';

const Header = ({
  title,
  leftIcon = false,
  onPressLeft = () => {},
}: {
  title: string;
  leftIcon?: boolean;
  onPressLeft?: () => void;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: leftIcon ? 0 : 10,
      }}>
      {leftIcon && (
        <>
          <Pressable onPress={onPressLeft} style={{padding: 10}}>
            <FontAwesomeIcon icon={faChevronLeft} size={20} />
          </Pressable>
          <Spacer horizontal margin={10} />
        </>
      )}
      <View style={{}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;
