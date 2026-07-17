import { colors, spacing } from "@/theme/designSystem";
import { typography } from "@/theme/typography";
import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        paddingVertical: spacing.sm,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    partyName: {
        ...typography.h5,
        color: colors.primaryTextColor
    },
    date: {
        ...typography.body
    },
    balance: {
        alignContent: 'center',
        justifyContent: 'center',
        padding: spacing.sm,
        borderRadius:spacing.xs
    },
    avatar: {
        flexDirection: 'row', gap: spacing.sm, alignItems: 'center'
    },
    balanceText: {
        fontSize: moderateScale(11),
        fontWeight: '500'
    }
})