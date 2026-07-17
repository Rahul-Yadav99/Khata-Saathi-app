import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors, spacing, fontSize } from '@/theme/designSystem';
import { typography } from '@/theme/typography';

export const styles = StyleSheet.create({
  // Overlay - semi-transparent background
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  // Modal container with shadow and rounded corners
  modalView: {
    width: '85%',
    maxWidth: moderateScale(350),
    backgroundColor: colors.white,
    borderRadius: spacing.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: moderateScale(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: moderateScale(4),
    elevation: moderateScale(8),
  },

  // Title styling
  titleText: {
    ...typography.h4,
    marginBottom: moderateScale(spacing.sm),
    textAlign: 'center',
  },

  // Message styling
  messageText: {
    ...typography.body,
    marginBottom: spacing.md,
    textAlign: 'center',
    lineHeight: moderateScale(20),
  },

  // Button container - flex layout for responsive design
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },

  // Base button styling
  button: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: moderateScale(44),
  },

  // Cancel button - secondary style
  cancelButton: {
    backgroundColor: colors.backgroundGray,
    borderWidth: moderateScale(1),
    borderColor: colors.disabledColor,
  },

  // Confirm button - primary style
  confirmButton: {
    backgroundColor: colors.primaryColor,
  },

  // Button text styling - cancel button
  cancelButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.primaryTextColor,
  },

  // Button text styling - confirm button
  confirmButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.white,
  },

  // Active state styling for cancel button
  cancelButtonActive: {
    backgroundColor: colors.disabledColor,
  },

  // Active state styling for confirm button
  confirmButtonActive: {
    backgroundColor: '#4338CA',
    opacity: 0.85,
  },
});

