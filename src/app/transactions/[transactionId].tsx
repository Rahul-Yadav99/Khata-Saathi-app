import TransactionDetailScreen from "@/screens/TransactionDetailScreen"
import { useLocalSearchParams } from "expo-router"

const TransactionId = () => {
    const { transactionId } = useLocalSearchParams<{ transactionId: string }>()
    return <TransactionDetailScreen transactionId={transactionId} />
}

export default TransactionId