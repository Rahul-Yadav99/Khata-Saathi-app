import { colors, spacing } from '@/theme/designSystem'
import { Plus } from 'lucide-react-native'
import { TouchableOpacity, View } from 'react-native'
import Avatar from '../Avatar'
import { styles } from './style'

const Header = ({onPress}: {onPress: () => void}) => {
    return (
        <View style={styles.header}>
            <Avatar name="Rahul" size='sm' backgroundColor={colors.primaryColor} />
            <TouchableOpacity activeOpacity={0.7} style={styles.plusContainer} onPress={onPress}>
                <Plus color={colors.darkGray} size={spacing.md} />
            </TouchableOpacity>
        </View>
    )
}

export default Header