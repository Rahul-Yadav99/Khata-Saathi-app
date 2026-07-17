import partyService from '@/api/partyService';
import CloseButton from '@/components/CloseButton';
import CustomerCard from '@/components/CustomerCard';
import SafeScreen from '@/components/SafeScreen';
import { Button, EmptyState, ErrorState, Input, useToast } from '@/components/ui';
import { ToastOverlay } from '@/components/ui/Toast';
import { styles } from '@/styles/home.style';
import { colors, spacing } from '@/theme/designSystem';
import { typography } from '@/theme/typography';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowDown, ArrowUp, UserRoundPlus } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Modal, RefreshControl, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const index = () => {
    const toast = useToast();
    const [visible, setVisible] = useState(false);
    const [partyName, setPartyName] = useState('');
    const [partyPhone, setPartyPhone] = useState('');

    const { data: partiesData, isLoading, isError, refetch } = useQuery({
        queryKey: ['parties'],
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

    const Header = () => (
        <Text style={styles.headerText}>Total Customers : ({partiesData?.data?.length ?? 0})</Text>
    );

    const ItemSeparatorComponent = () => (
        <View style={styles.itemSeparatorComponent}></View>
    )
    return (
        <SafeScreen>
            <StatusBar backgroundColor={colors.primaryColor} barStyle="dark-content" translucent={false} />
            <View style={styles.container}>
                <View style={styles.boxContainer}>
                    <View style={styles.creditBox}>
                        <Text numberOfLines={2} style={styles.amountText}>₹ 100</Text>
                        <View style={styles.arrow}>
                            <Text style={styles.creditText}>To Collect</Text>
                            <ArrowDown color={colors.green} size={moderateScale(12)} />
                        </View>
                    </View>
                    <View style={styles.debitBox}>
                        <Text style={styles.amountText}>₹ 80</Text>
                        <View style={styles.arrow}>
                            <Text style={styles.debitText}>To Pay</Text>
                            <ArrowUp color={colors.red} size={moderateScale(12)} />
                        </View>
                    </View>
                </View>
                <FlatList
                    data={partiesData?.data ?? []}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => (
                        <CustomerCard item={item} />
                    )}
                    ListHeaderComponent={<Header />}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={refetch} colors={[colors.primaryColor]} />
                    }
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        isLoading ? (
                            <View>
                                <ActivityIndicator />
                            </View>
                        ) : isError ? (
                            <ErrorState
                                title="Unable to customers"
                                message="We couldn't fetch your customers right now."
                                onRetry={() => refetch()}
                            />
                        ) : (
                            <EmptyState
                                title="No Customers"
                                description="Add your first customer to get started"
                                onAction={() => setVisible(true)}
                                actionLabel='Add Customer'
                            />
                        )
                    }
                />
                <TouchableOpacity
                    onPress={() => setVisible(true)}
                    activeOpacity={0.7}
                    style={{
                        backgroundColor: colors.primaryColor,
                        position: 'absolute',
                        bottom: spacing.md,
                        right: spacing.md,
                        paddingVertical: spacing.sm,
                        paddingHorizontal: spacing.lg,
                        borderRadius: moderateScale(50),
                        gap: spacing.xs,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <UserRoundPlus size={moderateScale(18)} color={'white'} />
                    <Text style={{ color: 'white', fontSize: moderateScale(12), fontWeight: '500' }}>Add Customer</Text>
                </TouchableOpacity>
            </View>
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

export default index