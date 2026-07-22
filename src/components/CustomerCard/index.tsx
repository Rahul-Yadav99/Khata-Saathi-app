import { colors } from '@/theme/designSystem'
import { formatDate } from '@/utils/formatDate'
import { formatIndianCurrency } from '@/utils/formatIndianCurrency'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import Avatar from '../Avatar'
import { styles } from './style'

const CustomerCard = ({ item }: any) => {
    const router = useRouter();
    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.card} onPress={() => router.push(`/transaction/${item._id}`)}>
            <View style={styles.avatar}>
                <Avatar name={item?.partyName ?? 'GU'} size='sm' backgroundColor={colors.primaryColor} />
                <View>
                    <Text style={styles.partyName}>{item?.partyName ?? 'Guest'}</Text>
                    <Text style={styles.date}>{formatDate(item?.createdAt)}</Text>
                </View>
            </View>
            <Text
                style={[
                    styles.balanceText,
                    {
                        color: item?.currentBalance > 0 ? colors.green : colors.primaryColor,
                    },
                ]}
            >
                {item?.currentBalance > 0 ? '+' : '-'}
                {formatIndianCurrency(Math.abs(item?.currentBalance || 0))}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomerCard