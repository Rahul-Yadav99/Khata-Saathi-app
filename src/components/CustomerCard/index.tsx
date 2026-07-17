import { colors } from '@/theme/designSystem'
import { formatDate } from '@/utils/formatDate'
import { Text, TouchableOpacity, View } from 'react-native'
import Avatar from '../Avatar'
import { styles } from './style'

const CustomerCard = ({ item }: any) => {
    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.card}>
            <View style={styles.avatar}>
                <Avatar name={item?.partyName ?? 'G'} size='sm' />
                <View>
                    <Text style={styles.partyName}>{item?.partyName ?? 'Guest'}</Text>
                    <Text style={styles.date}>{formatDate(item?.updatedAt)}</Text>
                </View>
            </View>
            <View style={[styles.balance, { backgroundColor: item?.currentBalance >= 0 ? colors.backgroundGreen : colors.backgroundRed }]}>
                <Text style={[styles.balanceText, { color: item?.currentBalance >= 0 ? colors.green : colors.red }]}>₹ {Math.abs(item?.currentBalance ?? 0)}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CustomerCard