import { colors, spacing } from "@/theme/designSystem";
import { typography } from "@/theme/typography";
import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
    userName: {
        ...typography.h5,
        color: colors.primaryTextColor
    },
    userNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md
    },
    header: {
        marginVertical: spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    personalText: {
        ...typography.body,
        fontWeight: '500'
    },
    priceText: {
        fontSize: moderateScale(45),
        fontWeight: "500",

    },
    priceContainer: {
        marginVertical: spacing.md
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.md
    },
    icon: {
        height: moderateScale(60),
        width: moderateScale(60),
        borderRadius: moderateScale(30),
        backgroundColor: colors.lightGray,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainer: {
        gap: spacing.sm,
        alignItems: 'center'
    },
    iconText: {
        ...typography.body
    }
});