import { colors } from '@/theme/designSystem';
import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
    container: {
        height: moderateScale(32),
        width: moderateScale(32),
        backgroundColor: colors.lightGray,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(16)
    },
});