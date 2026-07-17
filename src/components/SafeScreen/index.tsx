import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';

const SafeScreen = ({ children, edges }: { children: React.ReactNode, edges?: ['top', 'bottom'] | ['top'] }) => {
    return (
        <SafeAreaView
            style={styles.container}
            edges={edges || ['top']}
        >
            {children}
        </SafeAreaView>
    );
};

export default SafeScreen;