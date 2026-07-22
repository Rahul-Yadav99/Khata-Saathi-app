import { colors, spacing } from '@/theme/designSystem'
import { useEffect, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'

const SkeletonBox = ({ width, height, borderRadius = moderateScale(6), style }: {
    width: number | string,
    height: number,
    borderRadius?: number,
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

const CustomerCardSkeleton = () => {
    return (
        <View style={styles.card}>
            {/* Left: Avatar + text lines */}
            <View style={styles.leftSection}>
                {/* Circle avatar */}
                <SkeletonBox
                    width={moderateScale(38)}
                    height={moderateScale(38)}
                    borderRadius={moderateScale(19)}
                />
                <View style={styles.textGroup}>
                    {/* Party name */}
                    <SkeletonBox width={moderateScale(120)} height={moderateScale(13)} />
                    {/* Date line */}
                    <SkeletonBox
                        width={moderateScale(80)}
                        height={moderateScale(10)}
                        style={{ marginTop: moderateScale(5) }}
                    />
                </View>
            </View>
            {/* Right: Balance */}
            <SkeletonBox width={moderateScale(60)} height={moderateScale(13)} />
        </View>
    )
}

const CustomerCardSkeletonList = ({ count = 8 }: { count?: number }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <View key={index}>
                    <CustomerCardSkeleton />
                    {index < count - 1 && (
                        <View style={styles.separator} />
                    )}
                </View>
            ))}
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        paddingVertical: spacing.sm,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    textGroup: {
        justifyContent: 'center',
    },
    separator: {
        height: moderateScale(0.7),
        backgroundColor: colors.lightGray,
    },
})

export { CustomerCardSkeleton, CustomerCardSkeletonList }
export default CustomerCardSkeletonList
