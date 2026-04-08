import React, { useState } from 'react';
import { StyleSheet, Text, FlatList, SafeAreaView, TextInput, View, Alert } from 'react-native';
import { AssetListItem } from '../components/instrumentListItem';
import { useMarket } from '../context/marketContext';
import { useRouter } from 'expo-router';
import { ThemeToggle } from '../components/themeToggle';

export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const { instruments, toggleWatchlist, isInWatchlist, colors } = useMarket();
  const router = useRouter();

  const handleToggle = (id: string, name: string) => {
    const isAdding = !isInWatchlist(id);
    toggleWatchlist(id);
    if (isAdding) {
      Alert.alert('Success', `${name} added to watchlist`);
    }
  };

  const filtered = instruments.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.symbol.toLowerCase().includes(search.toLowerCase())
  );

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
    searchContainer: {
      backgroundColor: colors.input,
      borderRadius: 12,
      paddingHorizontal: 12,
      marginBottom: 20,
      height: 50,
      justifyContent: 'center',
    },
    searchInput: { fontSize: 16, color: colors.text },
    emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: colors.subText },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Search</Text>
        <ThemeToggle />
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or symbol..."
          placeholderTextColor={colors.subText}
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AssetListItem 
            item={item}
            isActive={isInWatchlist(item.id)}
            onToggle={() => handleToggle(item.id, item.name)}
            onPress={(id) => router.push({ pathname: '/details', params: { id } })}
            iconType="plus"
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No instruments found matching "{search}"</Text>
        }
      />
    </SafeAreaView>
  );
}
