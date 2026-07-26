import { colors } from '@/theme/designSystem'
import { formatIndianCurrency } from '@/utils/formatIndianCurrency'
import { formatTransactionDate } from '@/utils/formatTransactionDate'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './style'

const TransactionCard = ({ item }: any) => {
    const router = useRouter();

    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={() => router.push(`/transactions/${item._id}`)}>
            <View style={styles.amountContainer}>
                <Text style={[styles.transactionType, { color: item?.transactionType === 'got' ? colors.green : colors.primaryColor }]}>{item?.transactionType === 'got' ? 'You Got' : 'You Gave'}
                </Text>
                <Text style={styles.balanceAfterTransaction}>Bal. {item?.balanceAfterTransaction > 0 ? '+' : '-'}{formatIndianCurrency(Math.abs(item?.balanceAfterTransaction || 0))}</Text>

                {item?.description && (
                    <Text numberOfLines={2} style={styles.transactionDate}>Note: {item?.description}</Text>
                )}

                <Text style={styles.transactionDate}>{formatTransactionDate(item?.transactionDate)}</Text>

            </View>
            <Text style={[styles.amount, { color: item?.transactionType === 'got' ? colors.green : colors.primaryColor }]}>{item?.transactionType === 'got' ? '+' : '-'}{formatIndianCurrency(item?.transactionAmount)}</Text>
        </TouchableOpacity>
    )
}

export default TransactionCard