import SafeScreen from '@/components/SafeScreen'
import { Text, View } from 'react-native'
import { styles } from './style'

const MoreScreen = () => {
    return (
        <SafeScreen>
            <View style={styles.container}>
                <Text>MoreScreen</Text>
            </View>
        </SafeScreen>
    )
}

export default MoreScreen