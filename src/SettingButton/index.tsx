import { colors, spacing } from '@/theme/designSystem'
import { useRouter } from 'expo-router'
import { Settings2 } from 'lucide-react-native'
import { TouchableOpacity } from 'react-native'
import { styles } from './style'

const SettingButton = ({ partyId }: { partyId: string }) => {
    const router = useRouter();
    return (
        <TouchableOpacity
            onPress={() => router.push(`/partyProfile/${partyId}`)}
            style={styles.container}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
            <Settings2 size={spacing.md} color={colors.primaryColor} />
        </TouchableOpacity>
    )
}

export default SettingButton