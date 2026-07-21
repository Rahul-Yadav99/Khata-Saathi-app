import { colors, spacing } from '@/theme/designSystem';
import { typography } from '@/theme/typography';
import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: spacing.md,
    },
    boxContainer: {
        flexDirection: "row",
        overflow: 'hidden',
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: spacing.md
    },
    headerText: {
        ...typography.h5,
        color: colors.primaryTextColor,
        marginBottom: spacing.sm
    },
    creditBox: {
        height: moderateScale(80),
        width: '49%',
        borderRadius: spacing.md,
        borderWidth: 0.5,
        padding: spacing.sm,
        borderColor: colors.green,
        backgroundColor: colors.backgroundGreen
    },
    debitBox: {
        height: moderateScale(80),
        width: '49%',
        borderRadius: spacing.md,
        borderWidth: 0.5,
        padding: spacing.sm,
        borderColor: colors.red,
        backgroundColor: colors.backgroundRed
    },
    creditText: {
        color: colors.green,
        fontSize: moderateScale(12),

    },
    debitText: {
        color: colors.red,
        fontSize: moderateScale(12),
        // fontWeight: 'bold',
    },
    amountText: {
        fontSize: moderateScale(16),
        fontWeight: 'bold',
        color: colors.primaryTextColor,
    },
    arrow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: spacing.xs,
        marginTop: spacing.sm,
    },
    itemSeparatorComponent: {
        height: moderateScale(0.5),
        backgroundColor: colors.disabledColor
    }
});