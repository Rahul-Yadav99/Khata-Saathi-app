import { colors } from '@/theme/designSystem'
import { formatDate } from '@/utils/formatDate'
import { Text, TouchableOpacity, View } from 'react-native'
import Avatar from '../Avatar'
import { styles } from './style'

const CustomerCard = ({ item }: any) => {
    console.log('item', item)
    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.card}>
            <View style={styles.avatar}>
                <Avatar name={item?.partyName ?? 'GU'} size='sm' backgroundColor={colors.primaryColor} />
                <View>
                    <Text style={styles.partyName}>{item?.partyName ?? 'Guest'}</Text>
                    <Text style={styles.date}>{formatDate(item?.updatedAt)}</Text>
                </View>
            </View>
            <Text style={[styles.balanceText, { color: item?.currentBalance > 0 ? colors.green : colors.primaryColor }]}>₹{item.currentBalance}</Text>
        </TouchableOpacity>
    )
}

export default CustomerCard