import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMarket } from '../context/marketContext';
import { DetailedItem } from '../components/detailedItem';
import { Ionicons } from '@expo/vector-icons';
import { ThemeToggle } from '../components/themeToggle';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    instruments,
    toggleWatchlist,
    toggleFavorite,
    isFavorite,
    isInWatchlist,
    colors
  } = useMarket();
  const router = useRouter();

  // Now we get the instrument from the global context, so it's consistent
  const item = instruments.find((i) => i.id === id);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      marginTop: 40,
    },
    backButton: {
      padding: 8,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      fontSize: 18,
      color: colors.subText,
    },
  });

  if (!item) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Instrument not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <ThemeToggle />
      </View>

      <DetailedItem
        item={item}
        isFavorite={isFavorite(item.id)}
        isInWatchlist={isInWatchlist(item.id)}
        onToggleFavorite={() => toggleFavorite(item.id)}
        onToggleWatchlist={() => {
          toggleWatchlist(item.id);
          router.back();
        }}
      />
    </SafeAreaView>
  );
}
