import { colors, spacing } from '@/theme/designSystem'
import { X } from 'lucide-react-native'
import { TouchableOpacity } from 'react-native'
import { styles } from './style'

const CloseButton = ({onPress}: {onPress: () => void}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={onPress}
        >
            <X size={spacing.md} color={colors.primaryColor} />
        </TouchableOpacity>
    )
}

export default CloseButton