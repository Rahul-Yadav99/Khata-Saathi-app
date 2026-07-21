import { colors, spacing } from "@/theme/designSystem";
import { typography } from "@/theme/typography";
import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
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
    
});