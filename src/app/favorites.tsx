import React from 'react';
import { StyleSheet, Text, FlatList, SafeAreaView, View } from 'react-native';
import { AssetListItem } from '../components/instrumentListItem';
import { useMarket } from '../context/marketContext';
import { useRouter } from 'expo-router';
import { ThemeToggle } from '../components/themeToggle';

export default function FavoritesScreen() {
  const { instruments, favoriteIds, toggleFavorite, isFavorite, colors } = useMarket();
  const router = useRouter();

  // Show only instruments the user has favorited from the Watchlist
  const favorites = instruments.filter(item => favoriteIds.includes(item.id));

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
    emptySubText: { fontSize: 14, color: colors.subText, marginTop: 8, textAlign: 'center' },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>My Favorites</Text>
        <ThemeToggle />
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites yet.</Text>
          <Text style={styles.emptySubText}>Add favorites by tapping the star in your Watchlist.</Text>
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
              onPress={(id) => router.push({ pathname: '/details', params: { id } })}
              iconType="star"
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
