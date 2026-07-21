import { colors, spacing } from "@/theme/designSystem";
import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
    header: {
        paddingVertical: spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    plusContainer: {
        height: moderateScale(32),
        width: moderateScale(32),
        backgroundColor: colors.lightGray,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(16)
    }
});