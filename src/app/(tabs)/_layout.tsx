import { colors } from '@/theme/designSystem'
import { Tabs } from 'expo-router'
import { Activity, EllipsisIcon, IndianRupee, Users2 } from 'lucide-react-native'
import { moderateScale } from 'react-native-size-matters'

const Layout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primaryColor,
                tabBarInactiveTintColor: colors.secondaryTextColor,
                tabBarStyle: {
                    borderTopColor: colors.disabledColor,
                    backgroundColor: colors.backgroundColor,
                },
                tabBarLabelStyle: {
                    fontSize: moderateScale(9),
                    fontWeight: '500',
                },
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Customers',
                    tabBarIcon: ({ color }) => (
                        <Users2 size={moderateScale(18)} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name='dashboard'
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color }) => (
                        <Activity size={moderateScale(18)} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name='sales'
                options={{
                    title: 'Sales',
                    tabBarIcon: ({ color }) => (
                        <IndianRupee size={moderateScale(18)} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name='more'
                options={{
                    title: 'More',
                    tabBarIcon: ({ color }) => (
                        <EllipsisIcon size={moderateScale(18)} color={color} />
                    )
                }}
            />
        </Tabs>
    )
}

export default Layout