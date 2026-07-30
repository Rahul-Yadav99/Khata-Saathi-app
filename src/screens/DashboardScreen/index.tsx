import SafeScreen from '@/components/SafeScreen'
import { Text, View } from 'react-native'
import { styles } from './style'

const DashboardScreen = () => {
    return (
        <SafeScreen>
            <View style={styles.container}>
                <Text>DashboardScreen</Text>
            </View>
        </SafeScreen>
    )
}

export default DashboardScreen