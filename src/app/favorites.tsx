import React from 'react';
import { StyleSheet, Text, FlatList, SafeAreaView, View } from 'react-native';
import { usePriceSimulation } from '../hooks/priceSimulation';
import { AssetListItem } from '../components/instrumentListItem';
import { useMarket } from '../context/marketContext';

export default function FavoritesScreen() {
  const { instruments } = usePriceSimulation();
  const { favoriteIds, toggleFavorite, isFavorite } = useMarket();

  // Show only instruments the user has favorited from the Watchlist
  const favorites = instruments.filter(item => favoriteIds.includes(item.id));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Favorites</Text>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites yet.</Text>
          <Text style={styles.emptySubText}>Add favorites by tapping the heart in your Watchlist.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AssetListItem
              item={item}
              isActive={isFavorite(item.id)}
              onToggle={() => toggleFavorite(item.id)}
              iconType="heart"
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
  header: { fontSize: 28, fontWeight: 'bold', marginVertical: 20, marginTop: 40 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#333', fontWeight: '600' },
  emptySubText: { fontSize: 14, color: '#666', marginTop: 8, textAlign: 'center' },
});
