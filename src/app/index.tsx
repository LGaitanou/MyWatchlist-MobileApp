import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, FlatList, SafeAreaView } from 'react-native';
import { usePriceSimulation } from '../hooks/priceSimulation';
import { AssetListItem } from '../components/instrumentListItem';
import { SortSelector, SortOption } from '../components/sortSelector';

export default function WatchlistScreen() {
  const { instruments } = usePriceSimulation();
  const [sortBy, setSortBy] = useState<SortOption>('name');

  const sortedInstruments = useMemo(() => {
    return [...instruments].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'price') {
          return b.price - a.price; // Highest price first
      }
      if (sortBy === 'change') {
        return b.change - a.change; // Highest % change first
      }
      return 0; // Default: no sorting
    });
  }, [instruments, sortBy]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Watchlist</Text>

      <SortSelector currentSort={sortBy} onSortChange={setSortBy} />

      <FlatList
        data={sortedInstruments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AssetListItem item={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
  header: { fontSize: 28, fontWeight: 'bold', marginVertical: 20, marginTop: 40 },
});