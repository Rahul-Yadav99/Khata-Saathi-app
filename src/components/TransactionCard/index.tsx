import { colors } from '@/theme/designSystem'
import { formatIndianCurrency } from '@/utils/formatIndianCurrency'
import { formatTransactionDate } from '@/utils/formatTransactionDate'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from './style'

const TransactionCard = ({ item }: any) => {
    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.7}>
            <View style={styles.amountContainer}>
                <Text style={[styles.transactionType, { color: item?.transactionType === 'credit' ? colors.green : colors.primaryColor }]}>{item?.transactionType}</Text>

                <Text style={styles.balanceAfterTransaction}>Bal. {formatIndianCurrency(item?.balanceAfterTransaction)}</Text>

                <Text style={styles.transactionDate}>{formatTransactionDate(item?.transactionDate)}</Text>

            </View>
            <Text style={[styles.amount, { color: item?.transactionType === 'credit' ? colors.green : colors.primaryColor }]}>{item?.transactionType === 'credit' ? '+' : '-'} {formatIndianCurrency(item?.transactionAmount)}</Text>
        </TouchableOpacity>
    )
}

export default TransactionCard