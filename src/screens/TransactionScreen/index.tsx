import transactionService from '@/api/transactionService';
import Avatar from '@/components/Avatar';
import GoBackButton from '@/components/GoBackButton';
import SafeScreen from '@/components/SafeScreen';
import TransactionCard from '@/components/TransactionCard';
import SettingButton from '@/SettingButton';
import { colors } from '@/theme/designSystem';
import { formatIndianCurrency } from '@/utils/formatIndianCurrency';
import { useQuery } from '@tanstack/react-query';
import { BanknoteArrowDown, BanknoteArrowUp, EllipsisIcon } from 'lucide-react-native';
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { styles } from './style';

const TransactionScreen = ({ partyId }: any) => {

    const buttons = [
        {
            title: 'You gave',
            icon: <BanknoteArrowUp color={colors.primaryColor} />
        },
        {
            title: 'You got',
            icon: <BanknoteArrowDown color={colors.primaryColor} />
        },
        {
            title: 'More',
            icon: <EllipsisIcon color={colors.primaryColor} />
        },
    ]

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['getAllTransactions', partyId],
        queryFn: () => transactionService.getTransaction(partyId),

    })
    console.log(data)
    return (
        <SafeScreen edges={['top', 'bottom']}>
            <View style={styles.header}>
                <View style={styles.userNameContainer}>
                    <GoBackButton />
                    <Avatar name={data?.party?.partyName || "Customer"} backgroundColor={colors.primaryColor} size='sm' />
                    <Text style={styles.userName}>{data?.party?.partyName || "Customer"}</Text>
                </View>
                <SettingButton />
            </View>

            <FlatList
                data={data?.data ?? []}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TransactionCard item={item} />
                )}
                ListHeaderComponent={
                    <>
                        <View style={styles.priceContainer}>
                            <Text style={styles.personalText}>{data?.party?.currentBalance > 0 ? "You have to Collect" : "You have to Pay"}</Text>
                            <Text numberOfLines={2} style={styles.priceText}>
                                {`${formatIndianCurrency(data?.party?.currentBalance || 0)}`}
                            </Text>
                        </View>

                        <View style={styles.button}>
                            {buttons.map((item, idx) => (
                                <View key={idx} style={styles.iconContainer}>
                                    <TouchableOpacity style={styles.icon} activeOpacity={0.7}>
                                        {item.icon}
                                    </TouchableOpacity>
                                    <Text style={styles.iconText}>{item.title}</Text>
                                </View>
                            ))}
                        </View>
                    </>
                }
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={refetch} colors={[colors.primaryColor]} />
                }
                ItemSeparatorComponent={
                    <View style={{ height: moderateScale(0.7), backgroundColor: colors.lightGray }}></View>
                }
            />
        </SafeScreen>
    )
}

export default TransactionScreen