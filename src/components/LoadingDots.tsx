import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const LoadingDots = () => {
    const dot1Opacity = useRef(new Animated.Value(0)).current;
    const dot2Opacity = useRef(new Animated.Value(0)).current;
    const dot3Opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animateDots = () => {
            Animated.sequence([
                Animated.timing(dot1Opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(dot2Opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(dot3Opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                dot1Opacity.setValue(0);
                dot2Opacity.setValue(0);
                dot3Opacity.setValue(0);
                animateDots();
            });
        };

        animateDots();
    }, [dot1Opacity, dot2Opacity, dot3Opacity]);

    return (
        <View style={styles.dotsContainer}>
            <Animated.View style={[styles.dot, { opacity: dot1Opacity }]} />
            <Animated.View style={[styles.dot, { opacity: dot2Opacity }]} />
            <Animated.View style={[styles.dot, { opacity: dot3Opacity }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#007AFF',
        marginHorizontal: 4,
    },
});

export default LoadingDots;