import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { styles, avatarSizeMap, getAvatarColor, AvatarSize } from './style';

interface AvatarProps {
    /** Full name or display name — the first letter will be shown */
    name: string;
    /** Predefined size variant */
    size?: AvatarSize;
    /** Override background color (optional) */
    backgroundColor?: string;
    /** Extra styles for the outer container */
    style?: ViewStyle;
}

const Avatar: React.FC<AvatarProps> = ({
    name,
    size = 'md',
    backgroundColor,
    style,
}) => {
    const { container, font } = avatarSizeMap[size];
    const bgColor = backgroundColor ?? getAvatarColor(name);
    const letter = name?.trim()?.[0] ?? '?';
    const letter2 = name?.trim()?.[1] ?? '?';

    return (
        <View
            style={[
                styles.container,
                {
                    width: container,
                    height: container,
                    backgroundColor: bgColor,
                },
                style,
            ]}
        >
            <Text style={[styles.letter, { fontSize: font }]}>
                {letter}{letter2}
            </Text>
        </View>
    );
};

export default Avatar;
