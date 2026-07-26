import PartyProfileScreen from '@/screens/PartyProfileScreen';
import { useLocalSearchParams } from 'expo-router';

const PartyProfile = () => {
    const { partyId } = useLocalSearchParams<{ partyId: string }>();
    return <PartyProfileScreen partyId={partyId} />
}

export default PartyProfile