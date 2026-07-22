import partyService from '@/api/partyService'
import CloseButton from '@/components/CloseButton'
import CustomerCard from '@/components/CustomerCard'
import CustomerCardSkeletonList from '@/components/CustomerCardSkeleton'
import Header from '@/components/Header'
import SafeScreen from '@/components/SafeScreen'
import { Button, EmptyState, ErrorState, Input } from '@/components/ui'
import { ToastOverlay, useToast } from '@/components/ui/Toast'
import { colors, spacing } from '@/theme/designSystem'
import { typography } from '@/theme/typography'
import { formatIndianCurrency } from '@/utils/formatIndianCurrency'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Users2 } from 'lucide-react-native'
import { useState } from 'react'
import { FlatList, Modal, RefreshControl, Text, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { styles } from './style'

const HomeScreen = () => {

    const toast = useToast();
    const [visible, setVisible] = useState(false);
    const [partyName, setPartyName] = useState('');
    const [partyPhone, setPartyPhone] = useState('');

    const { data, refetch, isLoading, isError } = useQuery({
        queryKey: ['getAllCustomers'],
        queryFn: () => partyService.getAllParties()
    })


    const { mutateAsync: createParty, isPending: isCreatingParty } = useMutation({
        mutationFn: () => partyService.createParty({
            partyName,
            partyPhone
        }),
        onSuccess: () => {
            toast.success('Party created successfully')
            setVisible(false)
            setPartyName('')
            setPartyPhone('')
            refetch()
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Failed to create party')
        }
    })

    const handleCreateParty = () => {
        const name = partyName.trim();
        const phone = partyPhone.trim();

        if (!name) {
            toast.warning("Please enter party name");
            return;
        }

        if (!phone) {
            toast.warning("Please enter party phone number");
            return;
        }

        // Indian mobile number validation
        const phoneRegex = /^[6-9]\d{9}$/;

        if (!phoneRegex.test(phone)) {
            toast.warning("Please enter a valid 10-digit phone number");
            return;
        }

        createParty();
    };

    return (
        <SafeScreen edges={['top', 'bottom']}>
            <FlatList
                data={data?.data ?? []}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <CustomerCard item={item} />
                )}
                ListHeaderComponent={
                    <>
                        <Header onPress={() => setVisible(true)} />
                        <View style={styles.priceContainer}>
                            <Text style={styles.personalText}>You have to Collect</Text>
                            <Text numberOfLines={2} style={styles.priceText}>
                                {`${formatIndianCurrency(data?.totalCurrentBalance || 0)}`}
                            </Text>
                        </View>
                    </>
                }
                ItemSeparatorComponent={
                    <View style={{ height: moderateScale(0.7), backgroundColor: colors.lightGray }}></View>
                }
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={refetch} colors={[colors.primaryColor]} />
                }
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    isLoading ?
                        <CustomerCardSkeletonList count={8} />
                        :
                        isError ?
                            <ErrorState
                                title='Failed to fetch customers' onRetry={refetch} />
                            :
                            <EmptyState
                                title='No Customers'
                                description='Add your first customer to get started'
                                icon={<Users2 size={moderateScale(48)} color={colors.secondaryTextColor} />}
                                actionLabel='Add Customer'
                                onAction={() => setVisible(true)}
                            />
                }
            />

            <Modal
                visible={visible}
                onRequestClose={() => setVisible(false)}
                animationType='slide'
                statusBarTranslucent
            >
                <SafeScreen edges={['top', 'bottom']}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.sm, marginVertical: spacing.md }}>
                        <Text style={{ ...typography.h4 }}>Add New Customer</Text>
                        <CloseButton onPress={() => { setVisible(false), setPartyName(''), setPartyPhone('') }} />
                    </View>
                    <Input
                        label='Customer Name'
                        placeholder='Enter Customer Name'
                        value={partyName}
                        onChangeText={setPartyName}
                        containerStyle={{ marginBottom: spacing.md }}
                    />
                    <Input
                        label='Customer Phone Number'
                        placeholder='Enter Phone Number'
                        keyboardType='numeric'
                        value={partyPhone}
                        onChangeText={setPartyPhone}
                        containerStyle={{ marginBottom: spacing.md }}
                        maxLength={10}
                    />
                    <Button
                        title='Add Customer'
                        onPress={handleCreateParty}
                        disabled={isCreatingParty}
                        loading={isCreatingParty}
                    />
                    <ToastOverlay />
                </SafeScreen>
            </Modal>
        </SafeScreen>
    )
}

export default HomeScreen