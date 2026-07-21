import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors, fontSize } from '../../theme/designSystem';

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(100),
        backgroundColor: colors.primaryColor,
        overflow: 'hidden',
    },
    letter: {
        color: colors.white,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
});

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export const avatarSizeMap: Record<AvatarSize, { container: number; font: number }> = {
    sm: { container: moderateScale(32), font: fontSize.sm },
    md: { container: moderateScale(44), font: fontSize.lg },
    lg: { container: moderateScale(56), font: fontSize.xxl },
    xl: { container: moderateScale(72), font: moderateScale(28) },
};

/** Generate a consistent background color based on the name */
const AVATAR_COLORS = [
    '#4F46E5', // indigo
    '#7C3AED', // violet
    '#DB2777', // pink
    '#059669', // emerald
    '#D97706', // amber
    '#DC2626', // red
    '#2563EB', // blue
    '#0891B2', // cyan
];

export const getAvatarColor = (name: string): string => {
    if (!name) return AVATAR_COLORS[0];
    const code = name.charCodeAt(0) + (name.charCodeAt(1) || 0);
    return AVATAR_COLORS[code % AVATAR_COLORS.length];
};
