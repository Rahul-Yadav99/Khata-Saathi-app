import { colors, spacing } from '@/theme/designSystem'
import { useEffect, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

// ─── Reusable animated skeleton block ────────────────────────────────────────

const SkeletonBox = ({
    width,
    height,
    borderRadius = moderateScale(6),
    style,
}: {
    width: number | string
    height: number
    borderRadius?: number
    style?: object
}) => {
    const opacity = useRef(new Animated.Value(0.3)).current

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        )
        animation.start()
        return () => animation.stop()
    }, [opacity])

    return (
        <Animated.View
            style={[
                {
                    width,
                    height,
                    borderRadius,
                    backgroundColor: colors.lightGray,
                    opacity,
                },
                style,
            ]}
        />
    )
}

// ─── Row with label + value skeleton ─────────────────────────────────────────

const SkeletonRow = ({
    labelWidth = moderateScale(130),
    valueWidth = moderateScale(90),
}: {
    labelWidth?: number
    valueWidth?: number
}) => (
    <View style={styles.row}>
        <SkeletonBox width={labelWidth} height={moderateScale(14)} />
        <SkeletonBox width={valueWidth} height={moderateScale(14)} />
    </View>
)

// ─── Main skeleton component ──────────────────────────────────────────────────

const TransactionDetailSkeleton = () => {
    return (
        <View style={styles.container}>
            {/* Large amount block */}
            <View style={styles.priceContainer}>
                <SkeletonBox width={moderateScale(160)} height={moderateScale(14)} />
                <SkeletonBox
                    width={moderateScale(200)}
                    height={moderateScale(52)}
                    borderRadius={moderateScale(8)}
                    style={{ marginTop: moderateScale(8) }}
                />
            </View>

            {/* Info rows */}
            <SkeletonRow labelWidth={moderateScale(160)} valueWidth={moderateScale(100)} />
            <SkeletonRow labelWidth={moderateScale(120)} valueWidth={moderateScale(80)} />
            <SkeletonRow labelWidth={moderateScale(50)} valueWidth={moderateScale(140)} />
            <SkeletonRow labelWidth={moderateScale(130)} valueWidth={moderateScale(110)} />

            {/* Button row */}
            <View style={styles.buttonRow}>
                <SkeletonBox
                    width={'80%'}
                    height={moderateScale(44)}
                    borderRadius={moderateScale(10)}
                />
                <SkeletonBox
                    width={moderateScale(40)}
                    height={moderateScale(40)}
                    borderRadius={moderateScale(20)}
                />
            </View>
        </View>
    )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    priceContainer: {
        marginVertical: spacing.md,
        gap: spacing.xs,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        justifyContent: 'space-between',
        marginTop: spacing.lg,
    },
})

export default TransactionDetailSkeleton
