import { colors, spacing } from "@/theme/designSystem";
import { typography } from "@/theme/typography";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    transactionType: {
        ...typography.body,
        color: colors.primaryColor,
        fontWeight: "600",
        textTransform: 'capitalize'
    },
    transactionDate: {
        ...typography.body,
    },
    balanceAfterTransaction: {
        ...typography.body,
        color: colors.primaryColor
    },
    amount: {
        ...typography.h5
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm
    },
    amountContainer: {
        gap: spacing.xs
    },
   
})