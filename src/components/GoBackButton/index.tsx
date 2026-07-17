import { colors, spacing } from '@/theme/designSystem'
import { useRouter } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import { TouchableOpacity } from 'react-native'
import { styles } from './style'

const GoBackButton = () => {
    const router = useRouter();
    return (
        <TouchableOpacity
            onPress={() => router.back()}
            style={styles.container}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
            <ChevronLeft size={spacing.md} color={colors.primaryColor} />
        </TouchableOpacity>
    )
}

export default GoBackButton