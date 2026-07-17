import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Check } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors, spacing, fontSize } from '../../theme/designSystem';
import { typography } from '../../theme/typography';

interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  containerStyle?: ViewStyle;
  checkboxStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onCheckedChange,
  label,
  containerStyle,
  checkboxStyle,
  labelStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={() => onCheckedChange(!checked)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.checkbox,
          checked && styles.checkboxChecked,
          checkboxStyle,
        ]}
      >
        {checked && <Check size={moderateScale(14)} color="white" strokeWidth={3} />}
      </View>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(4),
    borderWidth: moderateScale(1),
    borderColor: colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  checkboxChecked: {
    backgroundColor: colors.primaryColor,
    borderColor: colors.primaryColor,
  },
  label: {
    ...typography.body
  },
});

export default Checkbox;
