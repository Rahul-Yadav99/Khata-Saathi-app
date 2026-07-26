import transactionService from '@/api/transactionService'
import Alert from '@/components/Alert'
import CloseButton from '@/components/CloseButton'
import GoBackButton from '@/components/GoBackButton'
import SafeScreen from '@/components/SafeScreen'
import { Button, Input, useToast } from '@/components/ui'
import { ToastOverlay } from '@/components/ui/Toast'
import { colors, spacing } from '@/theme/designSystem'
import { formatIndianCurrency } from '@/utils/formatIndianCurrency'
import { formatTransactionDate } from '@/utils/formatTransactionDate'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Calendar1, Trash2 } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { styles } from './style'
import { useRouter } from 'expo-router'

const TransactionDetailScreen = ({ transactionId }: any) => {
    const toast = useToast()
    const queryClient = useQueryClient()
    const router = useRouter()
    const [visible, setVisible] = useState(false)
    const [showDate, setShowDate] = useState(false)
    const [transactionAmount, setTransactionAmount] = useState('')
    const [description, setDescription] = useState('')
    const [transactionDate, setTransactionDate] = useState(new Date())
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)

    const { data, isLoading } = useQuery({
        queryKey: ['getTransactionById', transactionId],
        queryFn: () => transactionService.getTransactionById(transactionId)
    })

    // Pre-fill form fields when data loads or modal opens
    useEffect(() => {
        if (data?.data && visible) {
            setTransactionAmount(Math.abs(data.data.transactionAmount).toString())
            setDescription(data.data.description ?? '')
            setTransactionDate(new Date(data.data.transactionDate))
        }
    }, [data, visible])

    const { mutateAsync: updateTransaction, isPending } = useMutation({
        mutationFn: (payload: any) =>
            transactionService.updateTransaction(transactionId, payload),
        onSuccess: () => {
            toast.success('Transaction updated successfully')
            queryClient.invalidateQueries({ queryKey: ['getTransactionById', transactionId] })
            queryClient.invalidateQueries({ queryKey: ['getAllTransactions'] })
            queryClient.invalidateQueries({ queryKey: ['getAllCustomers'] })
            handleCloseModal()
        },
        onError: (error: any) => {
            toast.error(typeof error === 'string' ? error : 'Failed to update transaction')
        }
    })

    const { mutateAsync: deleteTransaction, isPending: deletePending } = useMutation({
        mutationFn: () => transactionService.deleteTransaction(transactionId),
        onSuccess: () => {
            toast.success('Transaction deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['getTransactionById', transactionId] })
            queryClient.invalidateQueries({ queryKey: ['getAllTransactions'] })
            queryClient.invalidateQueries({ queryKey: ['getAllCustomers'] })
            handleCloseDeleteModal()
            router.back()
        },
        onError: (error: any) => {
            toast.error(typeof error === 'string' ? error : 'Failed to delete transaction')
        }
    })
    const handleCloseModal = () => {
        setVisible(false)
        setShowDate(false)
    }

    const handleUpdateTransaction = () => {
        if (!transactionAmount || transactionAmount.trim() === '') {
            toast.warning('Please enter amount')
            return
        }

        const amountNumber = Number(transactionAmount)

        if (isNaN(amountNumber) || amountNumber <= 0) {
            toast.warning('Please enter a valid amount')
            return
        }

        if (description.trim() && description.trim().length <= 3) {
            toast.warning('Please enter a note of at least 4 characters')
            return
        }

        if (description.trim() && description.trim().length > 50) {
            toast.warning('Please enter a note less than 50 characters')
            return
        }

        const payload = {
            transactionAmount: amountNumber,
            transactionDate,
            description: description.trim(),
            transactionType: data?.data?.transactionType
        }

        updateTransaction(payload)
    }

    const handleDeleteTransaction = () => {
        if (!transactionId) {
            toast.error('Transaction not found')
            setDeleteModalVisible(false)
            return
        }
        deleteTransaction(transactionId)
    }
    const handleCloseDeleteModal = () => {
        setDeleteModalVisible(false)
    }
    return (
        <SafeScreen edges={['top', 'bottom']}>
            <View style={styles.header}>
                <GoBackButton />
                <Text style={styles.headerTitle}>Transaction Details</Text>
            </View>

            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={moderateScale(35)} color={colors.primaryColor} />
                </View>
            ) : (
                <>
                    <View style={styles.priceContainer}>
                        <Text style={styles.personalText}>Transaction Amount</Text>
                        <Text numberOfLines={2} style={styles.priceText}>
                            {formatIndianCurrency(Math.abs(data?.data?.transactionAmount || 0))}
                        </Text>
                    </View>
                    <View style={styles.balanceContainer}>
                        <Text style={styles.personalText}>Balance after transaction:</Text>
                        <Text style={styles.personalText}>
                            {formatIndianCurrency(Math.abs(data?.data?.balanceAfterTransaction || 0))}
                        </Text>
                    </View>
                    <View style={styles.balanceContainer}>
                        <Text style={styles.personalText}>Transaction Type:</Text>
                        <Text style={[styles.personalText, { textTransform: 'capitalize' }]}>
                            {data?.data?.transactionType === 'got' ? 'You Got' : 'You Gave'}
                        </Text>
                    </View>
                    {data?.data?.description && (
                        <View style={styles.balanceContainer}>
                            <Text style={styles.personalText}>Note:</Text>
                            <Text style={[styles.personalText, { textTransform: 'capitalize' }]}>
                                {data?.data?.description}
                            </Text>
                        </View>
                    )}
                    <View style={styles.balanceContainer}>
                        <Text style={styles.personalText}>Transaction Date:</Text>
                        <Text style={styles.personalText}>
                            {formatTransactionDate(data?.data?.transactionDate)}
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title='Edit Transaction'
                            onPress={() => setVisible(true)}
                            style={{ width: '80%' }}
                        />
                        <TouchableOpacity onPress={() => setDeleteModalVisible(true)} activeOpacity={0.7} style={styles.deleteButton}>
                            <Trash2 size={spacing.md} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                </>
            )}

            <Modal
                visible={visible}
                onRequestClose={handleCloseModal}
                statusBarTranslucent
                animationType="slide"
            >
                <SafeScreen edges={['top', 'bottom']}>
                    <View style={styles.modalheader}>
                        <Text style={styles.headerTitle}>Edit Transaction</Text>
                        <CloseButton onPress={handleCloseModal} isModal={true} />
                    </View>
                    <Input
                        label='Amount'
                        placeholder='Enter Amount'
                        value={transactionAmount}
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
                        title={transactionDate ? formatTransactionDate(transactionDate.toISOString()) : 'Select Date'}
                        variant='secondary'
                        icon={<Calendar1 color={colors.primaryColor} size={moderateScale(18)} />}
                        style={{ marginBottom: spacing.md }}
                    />

                    <Button
                        title='Update Transaction'
                        onPress={handleUpdateTransaction}
                        loading={isPending}
                    />

                    {showDate && (
                        <DateTimePicker
                            mode="date"
                            display="default"
                            value={transactionDate}
                            onChange={(event, date) => {
                                setShowDate(false)
                                if (event.type === 'dismissed' || !date) return
                                setTransactionDate(date)
                            }}
                        />
                    )}
                    <ToastOverlay />
                </SafeScreen>
            </Modal>

            <Alert
                title='Delete'
                visible={deleteModalVisible}
                message='Are you sure you want to delete this transaction?'
                onCancel={handleCloseDeleteModal}
                onConfirm={handleDeleteTransaction}
                loading={deletePending}
            />
        </SafeScreen>
    )
}

export default TransactionDetailScreen