import { colors } from '@/theme/designSystem';
import React from 'react';
import { Text, TextInput, TextInputProps, View, ViewProps } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Label from './Label';

interface InputProps extends TextInputProps {
    label?: string;
    required?: boolean;
    error?: string;
    containerStyle?: ViewProps['style'];
    onChangeText?: (text: string) => void;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
    label,
    required = false,
    error,
    containerStyle,
    placeholder,
    placeholderTextColor,
    style,
    editable = true,
    leftIcon,
    rightIcon,
    ...props
}) => {
    return (
        <View style={containerStyle}>
            {label && (
                <Label
                    label={label}
                    required={required}
                    error={error}
                />
            )}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: error ? '#ef4444' : '#d4d4d8',
                    borderRadius: moderateScale(8),
                    paddingHorizontal: moderateScale(12),
                    opacity: editable ? 1 : 0.6,
                }}
            >
                {leftIcon && (
                    <View style={{ marginRight: moderateScale(8) }}>
                        {leftIcon}
                    </View>
                )}
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor || colors.placeholderColor}
                    editable={editable}
                    style={[
                        {
                            flex: 1,
                            paddingVertical: moderateScale(12),
                            fontSize: moderateScale(14),
                            color: colors.primaryTextColor,
                        },
                        style,
                    ]}
                    {...props}
                />
                {rightIcon && (
                    <View style={{ marginLeft: moderateScale(8), padding: moderateScale(6) }}>
                        {rightIcon}
                    </View>
                )}
            </View>
            {error && (
                <Text
                    style={{
                        color: '#ef4444',
                        fontSize: moderateScale(12),
                        marginTop: moderateScale(4),
                        fontWeight: '500',
                    }}
                >
                    {error}
                </Text>
            )}
        </View>
    );
};

export default Input;