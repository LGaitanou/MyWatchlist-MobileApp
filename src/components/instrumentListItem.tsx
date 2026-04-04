import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FinancialInstrument } from '../types/financialInstrument';

interface Props {
  item: FinancialInstrument;
}

export const AssetListItem = ({ item }: Props) => {
  const isPositive = item.change >= 0;

  return (
    <View style={styles.itemRow}>
      <View>
        <Text style={styles.symbol}>{item.symbol}</Text>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={[styles.change, { color: isPositive ? '#4CAF50' : '#F44336' }]}>
          {isPositive ? '+' : ''}{item.change.toFixed(2)}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  symbol: { fontSize: 18, fontWeight: 'bold' },
  name: { fontSize: 14, color: '#666' },
  priceContainer: { alignItems: 'flex-end' },
  price: { fontSize: 16, fontWeight: '600' },
  change: { fontSize: 14, fontWeight: '500' },
});