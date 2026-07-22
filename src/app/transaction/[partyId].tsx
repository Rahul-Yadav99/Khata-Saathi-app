import TransactionScreen from '@/screens/TransactionScreen';
import { useLocalSearchParams } from 'expo-router';

const Transaction = () => {
    const { partyId } = useLocalSearchParams<{ partyId: string }>();
    return <TransactionScreen partyId={partyId} />
}

export default Transaction