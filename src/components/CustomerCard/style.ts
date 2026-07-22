import { colors, spacing } from "@/theme/designSystem";
import { typography } from "@/theme/typography";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        paddingVertical: spacing.sm,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    partyName: {
        ...typography.h5,
        color: colors.primaryTextColor,
        textTransform:'capitalize'
    },
    date: {
        ...typography.body
    },
    balance: {
        alignContent: 'center',
        justifyContent: 'center',
        padding: spacing.sm,
        borderRadius: spacing.xs
    },
    avatar: {
        flexDirection: 'row', gap: spacing.sm, alignItems: 'center'
    },
    balanceText: {
        ...typography.h5,
        fontWeight: 500
    }
})