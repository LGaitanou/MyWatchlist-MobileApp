import React, { useState } from 'react';
import { StyleSheet, Text, FlatList, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { AssetListItem } from '../components/instrumentListItem';
import { useMarket } from '../context/marketContext';
import { useRouter } from 'expo-router';
import { ThemeToggle } from '../components/themeToggle';
import { SignupForm } from '../components/signupForm';

export default function FavoritesScreen() {
  const { instruments, favoriteIds, toggleFavorite, isFavorite, colors, isLoggedIn } = useMarket();
  const [showSignup, setShowSignup] = useState(false);
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
    emptyText: { fontSize: 18, color: colors.text, fontWeight: '600', textAlign: 'center' },
    emptySubText: { fontSize: 14, color: colors.subText, marginTop: 8, textAlign: 'center' },
    loginMessageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 50,
    },
    loginButton: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 25,
      marginTop: 20,
    },
    loginButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>My Favorites</Text>
          <ThemeToggle />
        </View>

        <View style={styles.loginMessageContainer}>
          {showSignup ? (
            <SignupForm />
          ) : (
            <>
              <Text style={styles.emptyText}>Sign up to see your favorites</Text>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => setShowSignup(true)}
              >
                <Text style={styles.loginButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </SafeAreaView>
    );
  }

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
