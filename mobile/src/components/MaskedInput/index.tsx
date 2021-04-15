import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { TextInputMaskProps } from 'react-native-masked-text';
import { Feather, FontAwesome5 } from '@expo/vector-icons';

import { Container, MaskedTextInputArea } from './styles';

type PackTypes = 'feather' | 'font';

interface InputProps extends TextInputMaskProps {
  placeholder?: string;
  pack: PackTypes;
  icon: string;
  fontSize?: number;
  style?: StyleProp<ViewStyle>;
}

interface InputRef {
  focus(): void;
}

const MaskedInput: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { placeholder, pack, icon, fontSize, style, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current._inputElement.focus();
    },
  }));

  const selectIcon = (iconPack: PackTypes) => {
    switch (iconPack) {
      case 'font':
        return (
          <FontAwesome5
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
      <MaskedTextInputArea
        ref={inputElementRef}
        fontSize={fontSize}
        placeholder={placeholder}
        placeholderTextColor="#777"
        includeRawValueInChangeText
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(MaskedInput);
