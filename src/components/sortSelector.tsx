import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export type SortOption = 'name' | 'price' | 'change';

interface Props {
  currentSort: SortOption;
  onSortChange: (option: SortOption) => void;
}

export const SortSelector = ({ currentSort, onSortChange }: Props) => {
  const options: { label: string; value: SortOption }[] = [
    { label: 'Name', value: 'name' },
    { label: 'Price', value: 'price' },
    { label: '% Change', value: 'change' },
  ];

  return (
    <View style={styles.sortRow}>
      <Text style={styles.sortLabel}>Sort by:</Text>
      {options.map((opt) => (
        <TouchableOpacity key={opt.value} onPress={() => onSortChange(opt.value)}>
          <Text style={[styles.sortBtn, currentSort === opt.value && styles.activeBtn]}>
            {opt.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sortRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, gap: 10 },
  sortLabel: { fontSize: 14, color: '#888', fontWeight: '600' },
  sortBtn: { fontSize: 14, color: '#007AFF', paddingHorizontal: 8, paddingVertical: 4 },
  activeBtn: { fontWeight: 'bold', textDecorationLine: 'underline' },
});