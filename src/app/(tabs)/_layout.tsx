import { colors } from "@/theme/designSystem";
import { Tabs } from "expo-router";
import { Users } from 'lucide-react-native';
import { moderateScale } from "react-native-size-matters";

export default function RootLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primaryColor,
                tabBarInactiveTintColor: colors.disabledColor,
                tabBarStyle: {
                    borderTopColor: colors.disabledColor,
                    backgroundColor: '#fff',
                },
                tabBarLabelStyle: {
                    fontSize: moderateScale(9),
                    fontWeight: '700',
                },
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Customers',
                    tabBarIcon: ({ color }) => (
                        <Users size={moderateScale(20)} color={color} />
                    )
                }}
            />
        </Tabs>
    );
}
