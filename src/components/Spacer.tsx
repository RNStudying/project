import React from 'react';
import {View} from 'react-native';

export const Spacer: React.FC<{
  horizontal?: boolean;
  margin: number;
}> = ({horizontal, margin}) => {
  if (horizontal) {
    return <View style={{marginLeft: margin}} />;
  }

  return <View style={{marginTop: margin}} />;
};
