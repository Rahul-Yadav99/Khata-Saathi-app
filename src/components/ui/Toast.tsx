import { colors, fontSize, spacing } from '@/theme/designSystem';
import { AlertTriangle, Check, Info, X } from 'lucide-react-native';
import React, {
    createContext,
    useCallback,
    useContext,
    useRef,
    useState,
} from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top' | 'bottom';

export interface ToastOptions {
    message: string;
    title?: string;
    variant?: ToastVariant;
    duration?: number;          // ms, 0 = persistent
    position?: ToastPosition;
    onPress?: () => void;
    showProgress?: boolean;
}

interface ToastItem extends Required<Omit<ToastOptions, 'onPress'>> {
    id: string;
    onPress?: () => void;
}

interface ToastContextValue {
    show: (options: ToastOptions) => string;
    hide: (id: string) => void;
    success: (message: string, title?: string) => string;
    error: (message: string, title?: string) => string;
    warning: (message: string, title?: string) => string;
    info: (message: string, title?: string) => string;
    toasts: ToastItem[];
}

// ─── Config ───────────────────────────────────────────────────────────────────

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const VARIANT_CONFIG: Record<
    ToastVariant,
    { bg: string; border: string; icon: React.ElementType; iconBg: string; textColor: string }
> = {
    success: {
        bg: '#F0FDF4',
        border: '#22C55E',
        icon: Check,
        iconBg: '#22C55E',
        textColor: '#166534',
    },
    error: {
        bg: '#FFF1F2',
        border: '#EF4444',
        icon: X,
        iconBg: '#EF4444',
        textColor: '#991B1B',
    },
    warning: {
        bg: '#FFFBEB',
        border: '#F59E0B',
        icon: AlertTriangle,
        iconBg: '#F59E0B',
        textColor: '#92400E',
    },
    info: {
        bg: '#EFF6FF',
        border: colors.primaryColor,
        icon: Info,
        iconBg: colors.primaryColor,
        textColor: '#1E40AF',
    },
};

// const VARIANT_CONFIG: Record<
//     ToastVariant,
//     { bg: string; border: string; icon: React.ElementType; iconBg: string; textColor: string }
// > = {
//     success: {
//         bg: colors.white,
//         border: colors.primaryColor,
//         icon: Check,
//         iconBg: colors.primaryColor,
//         textColor: colors.primaryTextColor,
//     },
//     error: {
//         bg: colors.white,
//         border: colors.primaryColor,
//         icon: X,
//         iconBg: colors.primaryColor,
//         textColor: colors.primaryTextColor,
//     },
//     warning: {
//         bg: colors.white,
//         border: colors.primaryColor,
//         icon: AlertTriangle,
//         iconBg: colors.primaryColor,
//         textColor: colors.primaryTextColor,
//     },
//     info: {
//         bg: colors.white,
//         border: colors.primaryColor,
//         icon: Info,
//         iconBg: colors.primaryColor,
//         textColor: colors.primaryTextColor,
//     },
// };

// ─── Single Toast Item ────────────────────────────────────────────────────────

interface ToastCardProps {
    toast: ToastItem;
    onDismiss: (id: string) => void;
}

const ToastCard: React.FC<ToastCardProps> = ({ toast, onDismiss }) => {
    const config = VARIANT_CONFIG[toast.variant];

    // Animations
    const translateY = useRef(new Animated.Value(toast.position === 'top' ? -120 : 120)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const progress = useRef(new Animated.Value(1)).current;
    const scale = useRef(new Animated.Value(0.92)).current;

    const dismiss = useCallback(() => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: toast.position === 'top' ? -120 : 120,
                duration: 280,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, { toValue: 0, duration: 280, useNativeDriver: true }),
            Animated.timing(scale, { toValue: 0.92, duration: 280, useNativeDriver: true }),
        ]).start(() => onDismiss(toast.id));
    }, [toast.id, toast.position, onDismiss, translateY, opacity, scale]);

    React.useEffect(() => {
        // Entrance
        Animated.parallel([
            Animated.spring(translateY, {
                toValue: 0,
                tension: 80,
                friction: 10,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, { toValue: 1, duration: 250, useNativeDriver: true }),
            Animated.spring(scale, {
                toValue: 1,
                tension: 80,
                friction: 10,
                useNativeDriver: true,
            }),
        ]).start();

        if (toast.duration > 0) {
            // Progress bar
            if (toast.showProgress) {
                Animated.timing(progress, {
                    toValue: 0,
                    duration: toast.duration,
                    useNativeDriver: false,
                }).start();
            }

            const timer = setTimeout(dismiss, toast.duration);
            return () => clearTimeout(timer);
        }
    }, []);

    const progressWidth = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <Animated.View
            style={[
                styles.card,
                {
                    backgroundColor: config.bg,
                    borderLeftColor: config.border,
                    transform: [{ translateY }, { scale }],
                    opacity,
                    shadowColor: config.border,
                },
            ]}
        >
            {/* Icon Badge */}
            <View style={[styles.iconBadge, { backgroundColor: config.iconBg }]}>
                <config.icon size={moderateScale(18)} color="#FFFFFF" strokeWidth={3} />
            </View>

            {/* Content */}
            <View style={styles.content}>
                {toast.title ? (
                    <Text style={[styles.title, { color: config.textColor }]} numberOfLines={1}>
                        {toast.title}
                    </Text>
                ) : null}
                <Text style={[styles.message, { color: config.textColor }]} numberOfLines={3}>
                    {toast.message}
                </Text>
            </View>

            {/* Dismiss Button */}
            <TouchableOpacity
                onPress={dismiss}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={styles.closeBtn}
                activeOpacity={0.6}
            >
                <X size={moderateScale(16)} color={config.textColor} strokeWidth={2.5} />
            </TouchableOpacity>

            {/* Progress Bar */}
            {toast.showProgress && toast.duration > 0 && (
                <View style={[styles.progressTrack, { backgroundColor: config.border + '33' }]}>
                    <Animated.View
                        style={[
                            styles.progressFill,
                            { backgroundColor: config.border, width: progressWidth },
                        ]}
                    />
                </View>
            )}
        </Animated.View>
    );
};

// ─── Toast Container ──────────────────────────────────────────────────────────

const MAX_VISIBLE = 3;

interface ToastContainerProps {
    toasts: ToastItem[];
    onDismiss: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
    const topToasts = toasts.filter((t) => t.position === 'top').slice(-MAX_VISIBLE);
    const bottomToasts = toasts.filter((t) => t.position === 'bottom').slice(-MAX_VISIBLE);

    return (
        <>
            {/* Top Toasts */}
            <View pointerEvents="box-none" style={[styles.stackContainer, styles.topContainer]}>
                {topToasts.map((toast, index) => (
                    <View
                        key={toast.id}
                        style={[
                            styles.stackItem,
                            {
                                zIndex: index,
                                transform: [{ scale: 1 - (topToasts.length - 1 - index) * 0.03 }],
                                marginTop: (topToasts.length - 1 - index) * -4,
                            },
                        ]}
                    >
                        <ToastCard toast={toast} onDismiss={onDismiss} />
                    </View>
                ))}
            </View>

            {/* Bottom Toasts */}
            <View pointerEvents="box-none" style={[styles.stackContainer, styles.bottomContainer]}>
                {bottomToasts.map((toast, index) => (
                    <View
                        key={toast.id}
                        style={[
                            styles.stackItem,
                            {
                                zIndex: index,
                                transform: [{ scale: 1 - (bottomToasts.length - 1 - index) * 0.03 }],
                                marginBottom: (bottomToasts.length - 1 - index) * -4,
                            },
                        ]}
                    >
                        <ToastCard toast={toast} onDismiss={onDismiss} />
                    </View>
                ))}
            </View>
        </>
    );
};

// ─── Context & Provider ───────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const idCounter = useRef(0);

    const show = useCallback((options: ToastOptions): string => {
        const id = `toast_${Date.now()}_${++idCounter.current}`;
        const toast: ToastItem = {
            id,
            message: options.message,
            title: options.title ?? '',
            variant: options.variant ?? 'info',
            duration: options.duration ?? 3500,
            position: options.position ?? 'top',
            onPress: options.onPress,
            showProgress: options.showProgress ?? true,
        };
        setToasts((prev) => [...prev, toast]);
        return id;
    }, []);

    const hide = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const success = useCallback(
        (message: string, title?: string) => show({ message, title, variant: 'success' }),
        [show],
    );
    const error = useCallback(
        (message: string, title?: string) => show({ message, title, variant: 'error' }),
        [show],
    );
    const warning = useCallback(
        (message: string, title?: string) => show({ message, title, variant: 'warning' }),
        [show],
    );
    const info = useCallback(
        (message: string, title?: string) => show({ message, title, variant: 'info' }),
        [show],
    );

    return (
        <ToastContext.Provider value={{ show, hide, success, error, warning, info, toasts }}>
            {children}
            <ToastContainer toasts={toasts} onDismiss={hide} />
        </ToastContext.Provider>
    );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useToast = (): ToastContextValue => {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error('useToast must be used within a <ToastProvider>.');
    }
    return ctx;
};

/**
 * Renders toast notifications inside a Modal.
 * Place this as the last child inside any <Modal> so toasts appear above modal content.
 */
export const ToastOverlay: React.FC = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) return null;
    return <ToastContainer toasts={ctx.toasts} onDismiss={ctx.hide} />;
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    stackContainer: {
        position: 'absolute',
        left: spacing.md,
        right: spacing.md,
        zIndex: 9999,
        elevation: 9999,
        pointerEvents: 'box-none' as any,
    },
    topContainer: {
        top: moderateScale(56),
    },
    bottomContainer: {
        bottom: moderateScale(90),
    },
    stackItem: {
        width: '100%',
    },
    card: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: moderateScale(14),
        borderLeftWidth: moderateScale(4),
        paddingVertical: moderateScale(12),
        paddingRight: moderateScale(12),
        paddingLeft: moderateScale(10),
        marginVertical: moderateScale(4),
        gap: moderateScale(10),
        shadowOffset: { width: 0, height: moderateScale(6) },
        shadowOpacity: 0.15,
        shadowRadius: moderateScale(12),
        elevation: 8,
        overflow: 'hidden',
    },
    iconBadge: {
        width: moderateScale(32),
        height: moderateScale(32),
        borderRadius: moderateScale(16),
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    iconText: {
        color: '#FFFFFF',
        fontSize: moderateScale(14),
        fontWeight: '700',
        lineHeight: moderateScale(18),
    },
    content: {
        flex: 1,
        gap: moderateScale(2),
    },
    title: {
        fontSize: fontSize.md,
        fontWeight: '700',
        letterSpacing: 0.1,
    },
    message: {
        fontSize: fontSize.sm,
        fontWeight: '400',
        lineHeight: moderateScale(18),
        opacity: 0.85,
    },
    closeBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: moderateScale(22),
        height: moderateScale(22),
        flexShrink: 0,
    },
    closeText: {
        fontSize: moderateScale(12),
        fontWeight: '600',
        opacity: 0.6,
    },
    progressTrack: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: moderateScale(3),
    },
    progressFill: {
        height: '100%',
        borderBottomRightRadius: moderateScale(2),
    },
});

export default ToastCard;