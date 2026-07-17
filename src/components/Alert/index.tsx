import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  ActivityIndicator,
} from 'react-native';
import { styles } from './style';
import { colors, spacing } from '@/theme/designSystem';

/**
 * Props interface for the CustomAlert component
 */
interface CustomAlertProps {
  /**
   * Controls whether the alert modal is visible
   */
  visible: boolean;

  /**
   * Title text displayed at the top of the alert
   */
  title?: string;

  /**
   * Main message content of the alert
   */
  message?: string;

  /**
   * Text label for the cancel/dismiss button
   * @default "Cancel"
   */
  cancelText?: string;

  /**
   * Text label for the confirm/action button
   * @default "Confirm"
   */
  confirmText?: string;

  /**
   * Callback function triggered when the cancel button is pressed
   */
  onCancel?: () => void;

  /**
   * Callback function triggered when the confirm button is pressed
   */
  onConfirm?: () => void;

  loading?: boolean;
}

/**
 * CustomAlert Component
 *
 * A reusable, production-grade alert modal component that works similar to
 * React Native's default Alert but with enhanced styling and customization options.
 *
 * Features:
 * - Centered modal with semi-transparent overlay
 * - Customizable title and message
 * - Two action buttons with custom text
 * - Modern UI with rounded corners, shadows, and proper spacing
 * - TypeScript support with full prop documentation
 * - Responsive design that adapts to different screen sizes
 *
 * @component
 * @example
 * ```tsx
 * const [visible, setVisible] = useState(false);
 *
 * const handleConfirm = () => {
 *   console.log('User confirmed');
 *   setVisible(false);
 * };
 *
 * const handleCancel = () => {
 *   console.log('User cancelled');
 *   setVisible(false);
 * };
 *
 * return (
 *   <>
 *     <TouchableOpacity onPress={() => setVisible(true)}>
 *       <Text>Show Alert</Text>
 *     </TouchableOpacity>
 *
 *     <CustomAlert
 *       visible={visible}
 *       title="Delete Order?"
 *       message="Are you sure you want to delete this order? This action cannot be undone."
 *       cancelText="Keep It"
 *       confirmText="Delete"
 *       onCancel={handleCancel}
 *       onConfirm={handleConfirm}
 *     />
 *   </>
 * );
 * ```
 */
const Alert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  onCancel,
  onConfirm,
  loading = false,
}) => {
  // State to track button press for visual CustomAlertProps 
  const [pressedButton, setPressedButton] = useState<'cancel' | 'confirm' | null>(
    null,
  );

  /**
   * Handles cancel button press
   */
  const handleCancelPress = () => {
    setPressedButton('cancel');
    onCancel?.();
    // Reset pressed state after a brief delay
    setTimeout(() => setPressedButton(null), 150);
  };

  /**
   * Handles confirm button press
   */
  const handleConfirmPress = () => {
    setPressedButton('confirm');
    onConfirm?.();
    // Reset pressed state after a brief delay
    setTimeout(() => setPressedButton(null), 150);
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={onCancel}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Title Section */}
          {title && <Text style={styles.titleText}>{title}</Text>}

          {/* Message Section */}
          {message && <Text style={styles.messageText}>{message}</Text>}

          {/* Button Container */}
          <View style={styles.buttonContainer}>
            {/* Cancel Button */}
            <TouchableOpacity
              style={[
                styles.button,
                styles.cancelButton,
                pressedButton === 'cancel' && styles.cancelButtonActive,
              ]}
              onPress={handleCancelPress}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>{cancelText}</Text>
            </TouchableOpacity>

            {/* Confirm Button */}
            <TouchableOpacity
              style={[
                styles.button,
                styles.confirmButton,
                pressedButton === 'confirm' && styles.confirmButtonActive,
              ]}
              onPress={handleConfirmPress}
              activeOpacity={0.7}
              disabled={loading}
            >
              {loading ? <ActivityIndicator size={spacing.md} color={colors.white} /> : <Text style={styles.confirmButtonText}>{confirmText}</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Alert;
