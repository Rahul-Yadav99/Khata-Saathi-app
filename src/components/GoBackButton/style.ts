import { colors } from '@/theme/designSystem';
import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundLightBlue,
        height: moderateScale(40),
        width: moderateScale(40),
        borderRadius: moderateScale(12),
        justifyContent: 'center',
        alignItems: 'center',
    },
});