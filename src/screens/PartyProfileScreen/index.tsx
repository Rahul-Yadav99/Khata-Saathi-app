import partyService from '@/api/partyService'
import Alert from '@/components/Alert'
import Avatar from '@/components/Avatar'
import GoBackButton from '@/components/GoBackButton'
import SafeScreen from '@/components/SafeScreen'
import { Button, Input, useToast } from '@/components/ui'
import { colors, spacing } from '@/theme/designSystem'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { Edit, IndianRupee, PhoneCall, User2 } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { styles } from './style'

const PartyProfileScreen = ({ partyId }: { partyId: string }) => {
    const toast = useToast()
    const queryClient = useQueryClient()
    const router = useRouter()

    const [isEdit, setIsEdit] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [partyName, setPartyName] = useState('')
    const [partyPhone, setPartyPhone] = useState('')

    const { data } = useQuery({
        queryKey: ['getPartyById', partyId],
        queryFn: () => partyService.getPartyById(partyId),
        enabled: !!partyId
    })
    const userData = data?.data

    // Sync local state when data loads
    useEffect(() => {
        if (userData) {
            setPartyName(userData.partyName ?? '')
            setPartyPhone(userData.partyPhone ?? '')
        }
    }, [userData])

    // ─── Update mutation ──────────────────────────────────────────────────────
    const { mutateAsync: updateParty, isPending: updatePending } = useMutation({
        mutationFn: (payload: any) => partyService.updateParty(partyId, payload),
        onSuccess: () => {
            toast.success('Customer profile updated successfully')
            queryClient.invalidateQueries({ queryKey: ['getPartyById', partyId] })
            queryClient.invalidateQueries({ queryKey: ['getAllCustomers'] })
            setIsEdit(false)
        },
        onError: (error: any) => {
            toast.error(typeof error === 'string' ? error : 'Failed to update customer')
        }
    })

    // ─── Delete mutation ──────────────────────────────────────────────────────
    const { mutateAsync: deleteParty, isPending: deletePending } = useMutation({
        mutationFn: () => partyService.deleteParty(partyId),
        onSuccess: () => {
            toast.success('Customer deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['getAllCustomers'] })
            setShowDeleteModal(false)
            router.replace('/')
        },
        onError: (error: any) => {
            toast.error(typeof error === 'string' ? error : 'Failed to delete customer')
        }
    })

    // ─── Handlers ─────────────────────────────────────────────────────────────
    const handleUpdate = () => {
        const trimmedName = partyName.trim()
        const trimmedPhone = partyPhone.trim()

        if (!trimmedName) {
            toast.warning('Please enter customer name')
            return
        }
        if (trimmedName.length < 2) {
            toast.warning('Name must be at least 2 characters')
            return
        }
        if (!trimmedPhone) {
            toast.warning('Please enter customer phone')
            return
        }
        if (trimmedPhone.length !== 10 || !/^\d+$/.test(trimmedPhone)) {
            toast.warning('Please enter a valid 10-digit phone number')
            return
        }

        updateParty({ partyName: trimmedName, partyPhone: trimmedPhone })
    }

    const handleCancelEdit = () => {
        // Reset fields to original values on cancel
        setPartyName(userData?.partyName ?? '')
        setPartyPhone(userData?.partyPhone ?? '')
        setIsEdit(false)
    }

    return (
        <SafeScreen>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <GoBackButton />
                    <Text style={styles.HeaderTitle}>Customer Profile</Text>
                </View>

                <TouchableOpacity
                    style={styles.editbutton}
                    onPress={isEdit ? handleCancelEdit : () => setIsEdit(true)}
                    activeOpacity={0.7}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Edit size={spacing.md} color={colors.primaryColor} />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='handled'
                    contentContainerStyle={{ paddingBottom: spacing.xl }}
                >
                    <Avatar
                        name={userData?.partyName ?? 'Customer'}
                        backgroundColor={colors.primaryColor}
                        size='xxl'
                        style={{
                            alignSelf: 'center',
                            marginBottom: spacing.md
                        }}
                    />

                    <Input
                        value={partyName}
                        onChangeText={setPartyName}
                        label='Customer Name'
                        placeholder='Enter customer name'
                        leftIcon={<User2 color={colors.placeholderColor} size={moderateScale(18)} />}
                        containerStyle={{ marginBottom: spacing.md }}
                        editable={isEdit}
                    />
                    <Input
                        value={partyPhone}
                        onChangeText={setPartyPhone}
                        label='Customer Phone'
                        placeholder='Enter phone number'
                        leftIcon={<PhoneCall color={colors.placeholderColor} size={moderateScale(18)} />}
                        containerStyle={{ marginBottom: spacing.md }}
                        keyboardType='numeric'
                        editable={isEdit}
                    />
                    <Input
                        value={`${userData?.currentBalance ?? ''}`}
                        label='Current Balance'
                        leftIcon={<IndianRupee color={colors.placeholderColor} size={moderateScale(18)} />}
                        containerStyle={{ marginBottom: spacing.md }}
                        editable={false}
                    />

                    {isEdit ? (
                        <Button
                            title='Update Customer Profile'
                            onPress={handleUpdate}
                            loading={updatePending}
                        />
                    ) : (
                        <Button
                            title='Delete Customer'
                            variant='danger'
                            onPress={() => setShowDeleteModal(true)}
                        />
                    )}
                </ScrollView>
            </KeyboardAvoidingView>

            <Alert
                visible={showDeleteModal}
                title='Delete Customer'
                message='Are you sure you want to delete this customer? This action cannot be undone.'
                confirmText='Delete'
                cancelText='Cancel'
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={() => deleteParty()}
                loading={deletePending}
            />
        </SafeScreen>
    )
}

export default PartyProfileScreen