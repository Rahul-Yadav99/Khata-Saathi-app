import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { AlertCircle } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors, spacing } from '@/theme/designSystem';
import { typography } from '@/theme/typography';
import Button from './Button';

interface ErrorStateProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
    containerStyle?: ViewStyle;
}

const ErrorState: React.FC<ErrorStateProps> = ({
    title = 'Something went wrong',
    message = 'We encountered an error while loading the data. Please try again.',
    onRetry,
    containerStyle,
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.iconContainer}>
                <AlertCircle size={moderateScale(48)} color={'#EF4444'} />
            </View>
            <Text style={styles.title}>{title}</Text>
            {message && <Text style={styles.message}>{message}</Text>}
            {onRetry && (
                <Button 
                    title="Try Again" 
                    onPress={onRetry} 
                    variant="primary" 
                    style={styles.retryButton} 
                    fullWidth={false}
                    size='small'
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.xl,
        marginVertical: spacing.lg,
    },
    iconContainer: {
        marginBottom: spacing.md,
        backgroundColor: '#FEF2F2',
        padding: spacing.md,
        borderRadius: moderateScale(40),
    },
    title: {
        ...typography.h4,
        color: '#991B1B',
        marginBottom: spacing.xs,
        textAlign: 'center',
    },
    message: {
        ...typography.body,
        color: colors.secondaryTextColor,
        textAlign: 'center',
        marginBottom: spacing.lg,
    },
    retryButton: {
        marginTop: spacing.sm,
    },
});

export default ErrorState;
