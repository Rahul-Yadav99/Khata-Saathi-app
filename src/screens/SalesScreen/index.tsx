import SafeScreen from '@/components/SafeScreen'
import { Text, View } from 'react-native'
import { styles } from './style'

const SalesScreen = () => {
    return (
        <SafeScreen>
            <View style={styles.container}>
                <Text>SalesScreen</Text>
            </View>
        </SafeScreen>
    )
}

export default SalesScreen