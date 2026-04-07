import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, FlatList, SafeAreaView, View } from 'react-native';
import { AssetListItem } from '../components/instrumentListItem';
import { SortSelector, SortOption } from '../components/sortSelector';
import { useMarket } from '../context/marketContext';
import { useRouter } from 'expo-router';

export default function WatchlistScreen() {
  const { instruments, watchlistIds, toggleFavorite, isFavorite } = useMarket();
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const router = useRouter();

  const filteredAndSorted = useMemo(() => {
    // Only show instruments the user has added to their watchlist
    const userItems = instruments.filter(item => watchlistIds.includes(item.id));
    
    return [...userItems].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return b.price - a.price;
      if (sortBy === 'change') return b.change - a.change;
      return 0;
    });
  }, [instruments, watchlistIds, sortBy]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Watchlist</Text>

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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
  header: { fontSize: 28, fontWeight: 'bold', marginVertical: 20, marginTop: 40 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#333', fontWeight: '600' },
  emptySubText: { fontSize: 14, color: '#666', marginTop: 8 },
});
