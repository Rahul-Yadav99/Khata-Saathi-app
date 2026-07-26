import { colors, spacing } from "@/theme/designSystem";
import { typography } from "@/theme/typography";
import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
    header: {
        paddingVertical: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md
    },
    modalheader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: spacing.md
    },
    headerTitle: {
        ...typography.h4
    },
    priceText: {
        fontSize: moderateScale(45),
        fontWeight: "500",
    },
    personalText: {
        ...typography.body,
        fontWeight: '500'
    },
    priceContainer: {
        marginVertical: spacing.md
    },
    balanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.xs
    },
    deleteButton: {
        backgroundColor: colors.red,
        justifyContent: 'center',
        alignItems: 'center',
        height: moderateScale(40),
        width: moderateScale(40),
        borderRadius: moderateScale(20),
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        justifyContent: 'space-between',
        marginTop: spacing.lg,
    }
});