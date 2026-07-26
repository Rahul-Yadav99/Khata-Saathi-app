import transactionService from '@/api/transactionService';
import Avatar from '@/components/Avatar';
import CloseButton from '@/components/CloseButton';
import CustomerCardSkeletonList from '@/components/CustomerCardSkeleton';
import GoBackButton from '@/components/GoBackButton';
import SafeScreen from '@/components/SafeScreen';
import TransactionCard from '@/components/TransactionCard';
import { Button, EmptyState, ErrorState, Input, useToast } from '@/components/ui';
import { ToastOverlay } from '@/components/ui/Toast';
import SettingButton from '@/SettingButton';
import { colors, spacing } from '@/theme/designSystem';
import { formatIndianCurrency } from '@/utils/formatIndianCurrency';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BanknoteArrowDown, BanknoteArrowUp, Calendar1, EllipsisIcon, ReceiptIndianRupeeIcon } from 'lucide-react-native';
import { useState } from 'react';
import { FlatList, Modal, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { styles } from './style';

const TransactionScreen = ({ partyId }: any) => {
    const toast = useToast();
    const queryClient = useQueryClient();
    const buttons = [
        {
            title: 'You gave',
            icon: <BanknoteArrowUp color={colors.primaryColor} />,
            onPress: () => { setVisible(true); setTransactionType('gave') }
        },
        {
            title: 'You got',
            icon: <BanknoteArrowDown color={colors.primaryColor} />,
            onPress: () => { setVisible(true); setTransactionType('got') }
        },
        {
            title: 'More',
            icon: <EllipsisIcon color={colors.primaryColor} />
        },
    ]

    const [visible, setVisible] = useState(false);
    const [transactionType, setTransactionType] = useState('');
    const [showDate, setShowDate] = useState(false);
    const [transactionAmount, setTransactionAmount] = useState('');
    const [description, setDescription] = useState('');
    const [transactionDate, setTransactionDate] = useState(new Date());

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['getAllTransactions', partyId],
        queryFn: () => transactionService.getTransaction(partyId),
    })

    const handleAddTransaction = () => {
        if (!transactionAmount || transactionAmount.trim() === '') {
            toast.warning("Please enter amount");
            return;
        }

        const amountNumber = Number(transactionAmount);

        if (isNaN(amountNumber) || amountNumber <= 0) {
            toast.warning("Please enter a valid amount");
            return;
        }

        if (!transactionDate) {
            toast.warning("Please select a transaction date");
            return;
        }

        if (description.trim() && description.trim().length <= 3) {
            toast.warning('Please enter a note atleast 4 characters')
            return;
        }

        if (description.trim() && description.trim().length > 50) {
            toast.warning('Please enter a note less than 50 characters')
            return;
        }

        let payload = {
            transactionType,
            transactionAmount: amountNumber,   // yahan number jayega
            transactionDate,
            partyId,
            description
        }

        createTransaction(payload)
    }

    const { mutateAsync: createTransaction, isPending } = useMutation({
        mutationFn: (transaction: any) => transactionService.createTransaction(transaction),
        onSuccess: () => {
            toast.success('Transaction created successfully')
            queryClient.invalidateQueries({ queryKey: ['getAllTransactions', partyId] });
            queryClient.invalidateQueries({ queryKey: ['getAllCustomers'] });
            handleCloseModal()
        },
        onError: (error: any) => {
            toast.error(error)
        }
    })

    const handleCloseModal = () => {
        setVisible(false);
        setTransactionAmount('');
        setTransactionType('');
        setDescription('');
        setTransactionDate(new Date());
        setShowDate(false);
    }

    return (
        <SafeScreen edges={['top', 'bottom']}>
            <View style={styles.header}>
                <View style={styles.userNameContainer}>
                    <GoBackButton />
                    <Avatar name={data?.party?.partyName || "Customer"} backgroundColor={colors.primaryColor} size='sm' />
                    <Text style={styles.userName}>{data?.party?.partyName || "Customer"}</Text>
                </View>
                <SettingButton partyId={partyId} />
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
                            <Text numberOfLines={2} style={styles.priceText}>{formatIndianCurrency(Math.abs(data?.party?.currentBalance || 0))}
                            </Text>
                        </View>

                        <View style={styles.button}>
                            {buttons.map((item, idx) => (
                                <View key={idx} style={styles.iconContainer}>
                                    <TouchableOpacity style={styles.icon} activeOpacity={0.7} onPress={item.onPress}>
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
                ListEmptyComponent={
                    isLoading ?
                        <CustomerCardSkeletonList count={10} />
                        :
                        isError ?
                            <ErrorState
                                title='Failed to fetch transactions' onRetry={refetch} />
                            :
                            <EmptyState
                                title='No Transactions'
                                description='Add your first transaction to get started'
                                icon={<ReceiptIndianRupeeIcon size={moderateScale(58)} color={colors.secondaryTextColor} />}
                            // actionLabel='Add Transaction'
                            // onAction={() => { setVisible(true) }}
                            />
                }
            />
            <Modal
                visible={visible}
                onRequestClose={() => setVisible(false)}
                statusBarTranslucent
                animationType="slide"
            >
                <SafeScreen edges={['top', 'bottom']}>
                    <View style={styles.header}>
                        <Text style={styles.modalTitle}>You {transactionType === 'got' ? 'got' : 'gave'} {transactionAmount ? formatIndianCurrency(Number(transactionAmount)) : "0"} {transactionType === 'got' ? 'from' : 'to'} {data?.party?.partyName || "Customer"}</Text>
                        <CloseButton onPress={handleCloseModal} isModal={true} />
                    </View>
                    <Input
                        label='Amount'
                        placeholder='Enter Amount'
                        value={transactionAmount.toString()}
                        onChangeText={setTransactionAmount}
                        containerStyle={{ marginBottom: spacing.md }}
                        keyboardType='numeric'
                        required
                    />
                    <Input
                        label='Note (optional)'
                        placeholder='Enter Note'
                        value={description}
                        onChangeText={setDescription}
                        containerStyle={{ marginBottom: spacing.md }}
                        keyboardType='default'
                    />
                    <Button
                        onPress={() => setShowDate(true)}
                        title='Select Date'
                        variant='secondary'
                        icon={<Calendar1 color={colors.primaryColor} size={moderateScale(18)} />}
                        style={{ marginBottom: spacing.md }}
                    />

                    <Button
                        title='Save Transaction'
                        onPress={handleAddTransaction}
                        loading={isPending}
                    />

                    {showDate &&
                        <DateTimePicker
                            mode="date"
                            display="default"
                            value={transactionDate}
                            onChange={(event, date) => {
                                setShowDate(false);

                                if (event.type === 'dismissed' || !date) {
                                    return; // user ne cancel kiya, purani date hi rahegi
                                }

                                setTransactionDate(date);
                            }}
                        />
                    }
                    <ToastOverlay />
                </SafeScreen>
            </Modal>
        </SafeScreen>
    )
}

export default TransactionScreen