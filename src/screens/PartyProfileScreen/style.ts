import { colors, spacing } from "@/theme/designSystem";
import { typography } from "@/theme/typography";
import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
        gap: spacing.md,
        justifyContent: "space-between"
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,

    },
    HeaderTitle: {
        ...typography.h4
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        paddingVertical: spacing.sm,
        borderWidth: moderateScale(1),
        borderColor: colors.lightGray,
        borderRadius: moderateScale(12),
        paddingHorizontal: spacing.sm,
        backgroundColor: colors.white,
        marginBottom: spacing.md
    },
    editbutton: {
        height: moderateScale(32),
        width: moderateScale(32),
        backgroundColor: colors.lightGray,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(16)
    },
    isEditBorder: {
        borderColor: colors.primaryColor
    }
})