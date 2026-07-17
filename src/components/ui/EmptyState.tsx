import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Inbox } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors, spacing } from '@/theme/designSystem';
import { typography } from '@/theme/typography';
import Button from './Button';

interface EmptyStateProps {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    actionLabel?: string;
    onAction?: () => void;
    containerStyle?: ViewStyle;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = 'No Data Found',
    description,
    icon,
    actionLabel,
    onAction,
    containerStyle,
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.iconContainer}>
                {icon || <Inbox size={moderateScale(48)} color={colors.placeholderColor} />}
            </View>
            <Text style={styles.title}>{title}</Text>
            {description && <Text style={styles.description}>{description}</Text>}
            {actionLabel && onAction && (
                <Button 
                    title={actionLabel} 
                    onPress={onAction} 
                    variant="secondary" 
                    style={styles.actionButton} 
                    fullWidth={false}
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
        opacity: 0.8,
    },
    title: {
        ...typography.h4,
        color: colors.primaryTextColor,
        marginBottom: spacing.xs,
        textAlign: 'center',
    },
    description: {
        ...typography.body,
        color: colors.secondaryTextColor,
        textAlign: 'center',
        marginBottom: spacing.lg,
    },
    actionButton: {
        marginTop: spacing.sm,
    },
});

export default EmptyState;
