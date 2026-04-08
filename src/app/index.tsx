import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, FlatList, SafeAreaView, View } from 'react-native';
import { AssetListItem } from '../components/instrumentListItem';
import { SortSelector, SortOption } from '../components/sortSelector';
import { useMarket } from '../context/marketContext';
import { useRouter } from 'expo-router';
import { ThemeToggle } from '../components/themeToggle';

export default function WatchlistScreen() {
  const { instruments, watchlistIds, toggleFavorite, isFavorite, colors } = useMarket();
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const router = useRouter();

  const filteredAndSorted = useMemo(() => {
    const userItems = instruments.filter(item => watchlistIds.includes(item.id));
    
    return [...userItems].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return b.price - a.price;
      if (sortBy === 'change') return b.change - a.change;
      return 0;
    });
  }, [instruments, watchlistIds, sortBy]);

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 16 },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 40,
      marginBottom: 20,
    },
    header: { fontSize: 28, fontWeight: 'bold', color: colors.text },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { fontSize: 18, color: colors.text, fontWeight: '600' },
    emptySubText: { fontSize: 14, color: colors.subText, marginTop: 8 },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>My Watchlist</Text>
        <ThemeToggle />
      </View>

      {watchlistIds.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your watchlist is empty.</Text>
          <Text style={styles.emptySubText}>Use the Search menu to add instruments.</Text>
        </View>
      ) : (
        <>
          <SortSelector currentSort={sortBy} onSortChange={setSortBy} />
          <FlatList
            data={filteredAndSorted}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AssetListItem 
                item={item} 
                isActive={isFavorite(item.id)}
                onToggle={() => toggleFavorite(item.id)}
                onPress={(id) => router.push({ pathname: '/details', params: { id } })}
                iconType="heart"
              />
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
}
