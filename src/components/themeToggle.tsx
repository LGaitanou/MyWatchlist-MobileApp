import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMarket } from '../context/marketContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme, colors } = useMarket();

  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.container}>
      <Ionicons
        name={theme === 'light' ? 'moon' : 'sunny'}
        size={24}
        color={colors.text}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});
