import React, { useState } from 'react';
import { StyleSheet, Text, FlatList, SafeAreaView, TextInput, View, Alert } from 'react-native';
import { INITIAL_INSTRUMENTS } from '../constants/mockData';
import { AssetListItem } from '../components/instrumentListItem';
import { useMarket } from '../context/marketContext';
import { useRouter } from 'expo-router';

export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const { toggleWatchlist, isInWatchlist } = useMarket();
  const router = useRouter();

  const handleToggle = (id: string, name: string) => {
    const isAdding = !isInWatchlist(id);
    toggleWatchlist(id);
    if (isAdding) {
      Alert.alert('Success', `${name} added to watchlist`);
    }
  };

  const filtered = INITIAL_INSTRUMENTS.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Search</Text>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or symbol..."
          placeholderTextColor="#999"
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
  header: { fontSize: 28, fontWeight: 'bold', marginVertical: 20, marginTop: 40 },
  searchContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
    height: 50,
    justifyContent: 'center',
  },
  searchInput: { fontSize: 16, color: '#333' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#666' },
});
