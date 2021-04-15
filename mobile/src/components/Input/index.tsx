import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { TextInputProps, StyleProp, ViewStyle } from 'react-native';
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';

import { Container, TextInputArea } from './styles';

type PackTypes = 'feather' | 'ant' | 'material' | 'font';

interface InputProps extends TextInputProps {
  placeholder?: string;
  pack: PackTypes;
  icon: string;
  fontSize?: number;
  style?: StyleProp<ViewStyle>;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { placeholder, pack, icon, fontSize, style, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  const selectIcon = (iconPack: PackTypes) => {
    switch (iconPack) {
      case 'ant':
        return (
          <AntDesign
            name={icon}
            color="#ED3F47"
            size={20}
            style={{ marginRight: 15, marginLeft: 23 }}
          />
        );

      case 'font':
        return (
          <FontAwesome5
            name={icon}
            color="#ED3F47"
            size={20}
            style={{ marginRight: 15, marginLeft: 23 }}
          />
        );

      case 'material':
        return (
          <MaterialCommunityIcons
            name={icon}
            color="#ED3F47"
            size={20}
            style={{ marginRight: 15, marginLeft: 23 }}
          />
        );

      default:
        return (
          <Feather
            name={icon}
            color="#ED3F47"
            size={20}
            style={{ marginRight: 15, marginLeft: 23 }}
          />
        );
    }
  };

  return (
    <Container style={style}>
      {selectIcon(pack)}
      <TextInputArea
        ref={inputElementRef}
        fontSize={fontSize}
        placeholder={placeholder}
        placeholderTextColor="#777"
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
